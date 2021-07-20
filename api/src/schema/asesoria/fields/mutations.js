// Imports
import { GraphQLUpload } from 'apollo-server-koa'
import {
	GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLList,
    GraphQLObjectType
} from 'graphql'

// App Imports
import AsesoriaType from '../type'
import AsesoriaList from '../inputType'
import {
	create,
    remove,
    edit,
    remove_more
} from '../resolvers'
// User Register
export const createAsesoria = {
	type: AsesoriaType,
	args: {
        titulo: {
            name: 'cargo',
			type: GraphQLString
		},
		descripcion:{
            name: 'descripcion',
			type: GraphQLString
		},
        estado: {
			name: 'estado',
			type: GraphQLBoolean
		}
	},
	resolve: create
}
export const editAsesoria = {
	type: AsesoriaType,
	args: {
        codigo: {
			name: 'codigo',
			type: GraphQLInt
		},
        titulo: {
            name: 'cargo',
			type: GraphQLString
		},
		descripcion:{
            name: 'descripcion',
			type: GraphQLString
		},
        estado: {
			name: 'estado',
			type: GraphQLBoolean
		}
	},
	resolve: edit
}
// User remove
export const AsesoriaRemove = {
	type: AsesoriaType,
	args: {
		codigo: {
			name: 'codigo',
			type: GraphQLInt
		}
	},
	resolve: remove
}
export const removeAsesoria = {
    type: AsesoriaType,
    args: {
		codigo: {
            name: 'codigo',
			type: GraphQLList(AsesoriaList)
		}
	},
	resolve: remove_more
}