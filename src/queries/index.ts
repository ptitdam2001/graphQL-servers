import { userQueries } from "./user"
import { invoiceQueries } from "./invoice"

export default `
type Query {
${userQueries}
${invoiceQueries}
}
`