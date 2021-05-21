const express = require('express');
const config = require('config')
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('./core/SqliteSchemaBuilder');
const SQLiteConnector = require('./core/SqliteConnector')
const SQLiteEntity = require('./core/SqliteEntity')

const serverPort = config.get('server.port');
const tables = config.get('database.tables');
const dbFile = config.get('database.dbFile')

const app = express();

const database = new SQLiteConnector(dbFile, tables);
database.run();

tables.forEach(table => {
  const fields = [{ name: 'id', type: 'id' }, ...table.fields]
  const model = SQLiteEntity.get(table.name, fields);
  const schema = buildSchema(database.database, model);
  app.use(table.route, graphqlHTTP({ schema, graphiql: true }));
});

app.listen(serverPort, () => {
  console.log(`Running a GraphQL API server at http://localhost:${serverPort}/`);
});