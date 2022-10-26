import { userMutationResolvers, userResolvers } from "./user"

const resolvers = {
  Query: {
    ...userResolvers
  },
  Mutation: {
    ...userMutationResolvers
  }
}

export default resolvers