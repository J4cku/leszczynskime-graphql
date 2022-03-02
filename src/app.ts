import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import * as firebase from 'firebase/app';
import typeDefs from './typeDefinitions';
import resolvers from './resolver';
import configuration from './configuration';

dotenv.config();
const app = express();

firebase.initializeApp({
    apiKey: configuration.firebase.apiKey,
    authDomain: configuration.firebase.authDomain,
    databaseURL: configuration.firebase.databaseURL,
    projectId: configuration.firebase.projectId,
});

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
        headers: req.headers,
    }),
});

const serverStart = async () => {
    app.listen({ port: 4000 }, () => {
        console.log('Server has started 🚀 http://localhost:4000/graphql');
    });

    await server.start();
    server.applyMiddleware({ app });
};
serverStart();
