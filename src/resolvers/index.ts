import { invoiceMutationResolvers, invoiceResolvers } from "./invoice"
import { userMutationResolvers, userResolvers } from "./user"

const resolvers = {
  Query: {
    ...userResolvers,
    ...invoiceResolvers
  },
  Mutation: {
    ...userMutationResolvers,
    ...invoiceMutationResolvers
  }
}

export default resolvers