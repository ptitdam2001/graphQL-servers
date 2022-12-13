import userMutation from './user'
import invoiceMutation from './invoice'

export default `
type Mutation {
  ${userMutation}
  ${invoiceMutation}
}
`