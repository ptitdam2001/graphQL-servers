import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import typeDefs from './schema'
import resolvers from './resolvers'
import { UserData } from './data/user';
import { ServerContext } from './server';

function buildContext(): ServerContext {
  return {
    users: new UserData()
  }
}

async function startServer() {
  // The ApolloServer constructor requires two parameters: your schema
  // definition and your set of resolvers.
  const apolloServer = new ApolloServer<ServerContext>({
    typeDefs,
    resolvers,
  })

  const { url } = await startStandaloneServer(apolloServer, {
    listen: { port: 4000 },
    context: async () => buildContext()
  })

  console.log(`🚀  Server ready at: ${url}`);
}

startServer();