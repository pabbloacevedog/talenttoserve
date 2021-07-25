// Imports
import {GraphQLString, GraphQLList, GraphQLBoolean} from 'graphql'

// App Imports
import CargoType from '../type'
import {getAll, getById} from '../resolvers'

// Users All
export const cargos = {
    type: new GraphQLList(CargoType),
	resolve: getAll
}

// user By ID
export const cargo = {
	type: new GraphQLList(CargoType),
	resolve: getById
}
