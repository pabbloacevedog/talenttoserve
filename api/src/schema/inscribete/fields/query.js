// Imports
import {GraphQLString, GraphQLList, GraphQLBoolean} from 'graphql'

// App Imports
import InscribeteType from '../type'
import {getAll, getById} from '../resolvers'

// Users All
export const inscribetes = {
    type: new GraphQLList(InscribeteType),
    args: {
		estado: {
			name: 'estado',
			type: GraphQLBoolean
		}
	},
	resolve: getAll
}

// user By ID
export const inscribete = {
	type: new GraphQLList(InscribeteType),
	resolve: getById
}
