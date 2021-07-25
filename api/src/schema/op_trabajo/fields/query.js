// Imports
import {GraphQLString, GraphQLList, GraphQLBoolean} from 'graphql'

// App Imports
import OpTrabajoType from '../type'
import {getAll, getById} from '../resolvers'

// Users All
export const OpTrabajos = {
    type: new GraphQLList(OpTrabajoType),
	resolve: getAll
}

// user By ID
export const OpTrabajo = {
	type: new GraphQLList(OpTrabajoType),
	resolve: getById
}
