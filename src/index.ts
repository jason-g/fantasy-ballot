import { FantasyBallotApplication } from './application';
import { ApplicationConfig } from '@loopback/core';
//import * as cors from "cors";

/*
const OASGraph = require('oasgraph');
const express = require('express');
const graphqlHTTP = require('express-graphql');
*/
export { FantasyBallotApplication };

export async function main(options: ApplicationConfig = {}) {
  const app = new FantasyBallotApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  // Remove GraphQL support until it is more stable
  /*
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
    //options for cors midddleware
    const API_URL = "http://lvh.me:3006";
    const options: cors.CorsOptions = {
      allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
      credentials: true,
      methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
      origin: API_URL,
      preflightContinue: false
    };
    myExpress.use(cors(options));

    myExpress.use('/graphql', graphqlHTTP(
      {
        schema: schema,
        graphiql: true
      }
    ));

    // cors preflight
    myExpress.options("*", cors(options));
    myExpress.listen(3001, () => {
      console.log('GraphQL up at http://localhost:3001/graphql');
    });
  } catch (err) {
    console.log('Error starting graphQL:', err.message);
  }
  */
  return app;
}
