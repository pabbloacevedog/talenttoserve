// Imports
import {GraphQLString, GraphQLList, GraphQLBoolean} from 'graphql'

// App Imports
import PaisType from '../type'
import {getAll, getById} from '../resolvers'

// Users All
export const paiss = {
    type: new GraphQLList(PaisType),
	resolve: getAll
}

// user By ID
export const pais = {
	type: new GraphQLList(PaisType),
	resolve: getById
}
