import { ServerContext } from '../server'

export const userResolvers = {
  getAllUser: async (_: any, __: any, context: ServerContext) => await context.users.getAll(),
  getOneUser: async (_: any, { id }, context: ServerContext) => await context.users.getOne(id),
}

export const userMutationResolvers = {
  addUser: async (_: any, {firstname, lastname, email} : CreateUser, context: ServerContext) => {
    const result = await context.users.create({ lastname, firstname, email })
    return result
  },
}