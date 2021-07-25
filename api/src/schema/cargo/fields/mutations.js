// Imports
import {
	GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLList,
} from 'graphql'

// App Imports
import CargoType from '../type'
import CargoList from '../inputType'
import {
	create,
    remove,
    edit,
    remove_more
} from '../resolvers'
// User Register
export const createCargo = {
	type: CargoType,
	args: {
        codigo: {
            name: 'codigo',
			type: GraphQLString
		},
		nombre:{
            name: 'nombre',
			type: GraphQLString
		}
	},
	resolve: create
}
export const editCargo = {
	type: CargoType,
	args: {
        codigo: {
			name: 'codigo',
			type: GraphQLInt
		},
		nombre:{
            name: 'nombre',
			type: GraphQLString
		},
	},
	resolve: edit
}
// User remove
export const CargoRemove = {
	type: CargoType,
	args: {
		codigo: {
			name: 'codigo',
			type: GraphQLInt
		}
	},
	resolve: remove
}
export const removeCargo = {
    type: CargoType,
    args: {
		id: {
            name: 'id',
			type: GraphQLList(CargoList)
		}
	},
	resolve: remove_more
}