import {FantasyBallotApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {FantasyBallotApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new FantasyBallotApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
