import { ServerContext } from '../server'

export const userResolvers = {
  getAllUser: (_: any, __: any, context: ServerContext) => context.users.data,
}

export const userMutationResolvers = {
  addUser: (_: any, {firstname, lastname, email} : CreateUser, context: ServerContext) => {
    context.users.add({ lastname, firstname, email })
    return context.users.data
  },
}