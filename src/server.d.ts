import { InvoiceData } from "./data/invoice"
import { UserData } from "./data/user"

export type ServerContext = {
  users: UserData
  invoices: InvoiceData
}