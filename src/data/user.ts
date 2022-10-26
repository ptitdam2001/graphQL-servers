import { DataSource } from 'apollo-datasource'

export const data = [
  {
    firstname: 'Damien',
    lastname: 'Suhard',
    email: 'ptitdam2001@gmail.com'
  },
  {
    firstname: 'Julie',
    lastname: 'Suhard',
    email: 'julie@gmail.com'
  },
]


export class UserData extends DataSource {
  data: any[]

  constructor() {
    super()
    this.data = data
  }

  add(elt: any): void {
    this.data.push(elt)
  }
}

