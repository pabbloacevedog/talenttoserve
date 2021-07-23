// Imports
import {GraphQLString, GraphQLList, GraphQLBoolean} from 'graphql'

// App Imports
import OpPracticaType from '../type'
import {getAll, getById} from '../resolvers'

// Users All
export const oppracticas = {
    type: new GraphQLList(OpPracticaType),
	resolve: getAll
}

// user By ID
export const oppractica = {
	type: new GraphQLList(OpPracticaType),
	resolve: getById
}
