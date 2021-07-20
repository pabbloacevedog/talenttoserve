// Imports
import {GraphQLList} from 'graphql'

// App Imports
import routerType from '../type'
import {getAll} from '../resolvers'

// Users All
export const router = {
  type: new GraphQLList(routerType),
  resolve: getAll
}
