// Imports
import {GraphQLString, GraphQLList, GraphQLBoolean} from 'graphql'

// App Imports
import CapacitacionType from '../type'
import {getAll, getById} from '../resolvers'

// Users All
export const capacitacions = {
    type: new GraphQLList(CapacitacionType),
    args: {
		estado: {
			name: 'estado',
			type: GraphQLBoolean
		}
	},
	resolve: getAll
}

// user By ID
export const capacitacion = {
	type: new GraphQLList(CapacitacionType),
	resolve: getById
}
