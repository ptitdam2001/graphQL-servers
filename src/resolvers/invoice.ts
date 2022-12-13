import { ServerContext } from '../server'

export const invoiceResolvers = {
  getAllInvoices: async (_: any, __: any, context: ServerContext) => await context.invoices.getAll(),
  getOneInvoice: async (_: any, { id }, context: ServerContext) => await context.invoices.getOne(id),
}

export const invoiceMutationResolvers = {
  addInvoice: async (_: any, {reference, invoiceDate} : CreateInvoice, context: ServerContext) => {
    const result = await context.invoices.create({ reference, invoiceDate })
    return result
  },
}