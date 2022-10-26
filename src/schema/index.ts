import typeRefs from '../types'
import queries from '../queries'
import mutations from '../mutations'

const schema = `#graphql
${typeRefs}

${queries}

${mutations}
`

export default schema