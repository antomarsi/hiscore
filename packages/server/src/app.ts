import 'reflect-metadata'

import { resolve } from 'path'
import { ApolloServer } from 'apollo-server'

import { buildSchema } from 'graphql'
import { ConnectionOptions, createConnection } from 'typeorm'
import { Container } from 'typedi'

import resolvers from './resolvers';

export const connectToDatabase = (
  config: ConnectionOptions = require('../ormconfig.js')
) => {
  return createConnection(config)
}


export const createServer = async () => {
  const schema = await buildSchema({
    resolvers,
    emitSchemaFile: resolve(__dirname, 'schema.gql'),
    container: Container,
    validate: false,
  })
  return new ApolloServer({
    schema, playground: true,
    introspection: true,
  })
}

export const bootstrap = async () => {
  await connectToDatabase()
  const instance = await createServer()

  await instance.listen(process.env.PORT)
  console.log(`Up and running at port ${process.env.PORT}!`)
}
