import { ApolloServer } from 'apollo-server'
import environment from './environment'
import resolvers from './resolvers/resolvers'
import typeDefs from './schemas/type-defs'

const server = new ApolloServer({
  resolvers,
  typeDefs,
  introspection: environment.apollo.introspection,
  playground: environment.apollo.playground
})

server.listen(environment.port)
  .then(({ url }) => console.log(`Server ready at ${url}. `))

if (module.hot) {
  module.hot.accept()
  module.hot.dispose(() => server.stop())
}
