// Imports
import { GraphQLSchema } from 'graphql'

// App Imports
import query from './query.js'
import mutation from './mutation.js'
// import subscription from './subscription.js's
// Schema
const schema = new GraphQLSchema({
    query,
    mutation,
    // subscription
})

export default schema
