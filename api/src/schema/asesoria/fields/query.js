// Imports
import {GraphQLString, GraphQLList, GraphQLBoolean} from 'graphql'

// App Imports
import AsesoriaType from '../type'
import {getAll, getById} from '../resolvers'

// Users All
export const asesorias = {
    type: new GraphQLList(AsesoriaType),
	resolve: getAll
}

// user By ID
export const asesoria = {
	type: new GraphQLList(AsesoriaType),
	resolve: getById
}
