import { userQueries } from "./user"

export default `
type Query {
${userQueries}
}
`