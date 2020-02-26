import { ApolloServer } from 'apollo-server';
import { DIRECTIVES } from '@graphql-codegen/typescript-mongodb';
import environment from './environment';
import * as typeDefs from './schemas/type-defs.graphql';
import resolvers from './resolvers';
import mongoose from 'mongoose';
import {
  DateTimeMock,
  EmailAddressMock,
  UnsignedIntMock
} from 'graphql-scalars';

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
  playground: environment.apollo.playground
});

mongoose
  .connect(
    `mongodb+srv://${environment.mongoUsername}:${environment.mongoPassword}@graphql-demo-wyowx.mongodb.net/${environment.mongoDatabaseName}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    server
      .listen(environment.port)
      .then(({ url }: {url: string}) => console.log(`Server ready at ${url}. `));
  })
  .catch(err => {
    console.log(err);
  });

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.stop());
}
