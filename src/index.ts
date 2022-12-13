import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import typeDefs from './schema'
import resolvers from './resolvers'
import { UserData } from './data/user';
import { ServerContext } from './server';
import { InvoiceData } from './data/invoice';

// Init dotenv
dotenv.config();

function buildContext(sequelizeInstance: Sequelize): ServerContext {
  return {
    users: new UserData(sequelizeInstance),
    invoices: new InvoiceData(sequelizeInstance)
  }
}

async function startServer() {
  // The ApolloServer constructor requires two parameters: your schema
  // definition and your set of resolvers.
  const apolloServer = new ApolloServer<ServerContext>({
    typeDefs,
    resolvers,
  })

  const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      dialect: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
    }
  );

  try {
    await sequelize.authenticate();
    console.log(`🚀  Database connection has been established successfully`);

    // Prepare Context for GraphQl
    const bddContext = buildContext(sequelize);
  
    // Synchronize Postgresql with models
    await sequelize.sync(
      { force: false } // Reset db every time
    );

    const { url } = await startStandaloneServer(apolloServer, {
      listen: { port: 4000 },
      context: async () => bddContext
    })
  
    console.log(`🚀  Server ready at: ${url}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();