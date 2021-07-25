// Imports
import {
	GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLList,
} from 'graphql'

// App Imports
import PaisType from '../type'
import PaisList from '../inputType'
import {
	create,
    remove,
    edit,
    remove_more
} from '../resolvers'
// User Register
export const createPais = {
	type: PaisType,
	args: {
        iso: {
            name: 'iso',
			type: GraphQLString
		},
		nombre:{
            name: 'nombre',
			type: GraphQLString
		}
	},
	resolve: create
}
export const editPais = {
	type: PaisType,
	args: {
        id: {
            name: 'id',
			type: GraphQLString
		},
        iso: {
			name: 'iso',
			type: GraphQLInt
		},
		nombre:{
            name: 'nombre',
			type: GraphQLString
		}
	},
	resolve: edit
}
// User remove
export const PaisRemove = {
	type: PaisType,
	args: {
		id: {
			name: 'id',
			type: GraphQLInt
		}
	},
	resolve: remove
}
export const removePais = {
    type: PaisType,
    args: {
		codigo: {
            name: 'codigo',
			type: GraphQLList(PaisList)
		}
	},
	resolve: remove_more
}