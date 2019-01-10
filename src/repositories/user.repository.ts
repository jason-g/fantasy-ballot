import { DefaultCrudRepository, DataObject, Options, juggler } from '@loopback/repository';
import { User } from '../models';
import { DbDataSource } from '../datasources';
import { inject } from '@loopback/core';
import { hash, hashSync, genSaltSync } from 'bcrypt';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id
  > {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(User, dataSource);
  }

  create(entity: DataObject<User>, options?: Options): Promise<User> {
    const salt = genSaltSync();
    const hashed = hashSync(entity.password, salt);
    entity.password = hashed;
    return super.create(entity, options);
  }

  /*
  TBD
  update(entity: T, options?: Options): Promise<void> {

  }
  */
}
