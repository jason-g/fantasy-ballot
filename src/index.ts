import { FantasyBallotApplication } from './application';
import { ApplicationConfig } from '@loopback/core';

const OASGraph = require('oasgraph');
const express = require('express');
const graphqlHTTP = require('express-graphql');

export { FantasyBallotApplication };

export async function main(options: ApplicationConfig = {}) {
  const app = new FantasyBallotApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  try {
    const { schema } = await
      OASGraph.createGraphQlSchema(
        app.restServer.getApiSpec(),
        {
          strict: false,
          viewer: true,
          addSubOpperations: true,
          sendOAuthTokeninQuery: false,
        },
      );

    //set u express server for graphQL
    const myExpress = express();
    myExpress.use('/graphql', graphqlHTTP(
      {
        schema: schema,
        graphiql: true,
      }
    ));
    myExpress.listen(3001, () => {
      console.log('GraphQL up at http://localhost:3001/graphql');
    });
  } catch (err) {
    console.log('Error starting graphQL:', err.message);
  }
  //const { createGraphQlSchema } = require('oasgraph')
  // load or construct OAS (const oas = ...)
  //const { schema, report } = await createGraphQlSchema('http://127.0.0.1:3000/openapi.json');
  return app;
}
