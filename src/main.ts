import { ApolloServer } from 'apollo-server';
import { DIRECTIVES } from '@graphql-codegen/typescript-mongodb';
import environment from './environment';
import * as typeDefs from './schemas/type-defs.graphql';
import resolvers from './resolvers';
import mongoose from 'mongoose';
import { retrieveUser } from './resolvers/helpers';
import {
  DateTimeMock,
  EmailAddressMock,
  UnsignedIntMock
} from 'graphql-scalars';
import models from './models';
import DataLoader from 'dataloader';
import { batchUsers } from './resolvers/userResolver';
import { batchPosts } from './resolvers/postResolver';
import { JWTResponse } from './main.d';

const server = new ApolloServer({
  resolvers,
  typeDefs: [DIRECTIVES, typeDefs],
  introspection: environment.apollo.introspection,
  mocks: {
    DateTime: DateTimeMock,
    EmailAddress: EmailAddressMock,
    UnsignedInt: UnsignedIntMock
  }, // TODO: Remove in PROD.
  mockEntireSchema: false, // TODO: Remove in PROD.
  playground: environment.apollo.playground,
  context: ({ req }) => {
    const tokenWithBearer = req.headers.authorization || '';
    const token = tokenWithBearer.split(' ')[1];

    // try to retrieve a user with the token
    const user: null | JWTResponse = retrieveUser(token);
    // console.log('TCL: user', user);

    // add the user to the context
    return {
      user,
      models,
      loaders: {
        user: new DataLoader(keys => batchUsers(keys, models)),
        post: new DataLoader(keys => batchPosts(keys, models))
      }
    };
  }
});

mongoose
  .connect(
    `mongodb+srv://${environment.mongoUsername}:${environment.mongoPassword}@graphql-demo-wyowx.mongodb.net/${environment.mongoDatabaseName}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      autoIndex: true
    }
  )
  .then(() => {
    server
      .listen(environment.port)
      .then(({ url }: { url: string }) =>
        console.log(`Server ready at ${url}. `)
      );
  })
  .catch(err => {
    console.log(err);
  });

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.stop());
}
