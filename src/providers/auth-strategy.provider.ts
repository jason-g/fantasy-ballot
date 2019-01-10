import { Provider, inject, ValueOrPromise } from '@loopback/context';
import { Strategy } from 'passport';
import {
  AuthenticationBindings,
  AuthenticationMetadata,
  UserProfile,
} from '@loopback/authentication';
import { BasicStrategy } from 'passport-http';
import { User, Category } from '../models';
import { UserRepository } from '../repositories';
import { repository } from '@loopback/repository';
import { compareSync } from 'bcrypt';

export class MyAuthStrategyProvider implements Provider<Strategy | undefined> {
  constructor(
    @inject(AuthenticationBindings.METADATA)
    private metadata: AuthenticationMetadata,
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  value(): ValueOrPromise<Strategy | undefined> {
    // The function was not decorated, so we shouldn't attempt authentication
    if (!this.metadata || !this.metadata.strategy) {
      return undefined;
    }

    const name = this.metadata.strategy;
    if (name === 'BasicStrategy') {
      return new BasicStrategy(this.verify.bind(this));
    } else {
      return Promise.reject(`The strategy ${name} is not available.`);
    }
  }

  verify(
    username: string,
    password: string,
    cb: (err: Error | null, user?: User | false) => void,
  ) {
    this.userRepository.findOne({ where: { name: username } })
      .then(user => {
        console.log('User Exists, now to validate' + user);
        if (!user) {
          console.log('FAIL: NOUSER');
          cb(null, false);
        }
        else if (user && user.password) {
          if (compareSync(password, user.password)) {
            console.log('PASS: USER FOUND');
            cb(null, user);
          }
          else {
            console.log('FAIL: BADPASS');
            cb(null, false)
          }
        }
        else {
          console.log('FAIL: NOPASS');
          cb(null, false)
        }
      })
      .catch(err => {
        console.log('Error Authenticating: ' + err);
      });
  }
}
