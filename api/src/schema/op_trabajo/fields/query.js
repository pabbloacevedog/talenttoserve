// Imports
import {GraphQLString, GraphQLList, GraphQLBoolean} from 'graphql'

// App Imports
import OpTrabajoType from '../type'
import {getAll, getById} from '../resolvers'

// Users All
export const optrabajos = {
    type: new GraphQLList(OpTrabajoType),
	resolve: getAll
}

// user By ID
export const optrabajo = {
	type: new GraphQLList(OpTrabajoType),
	resolve: getById
}
