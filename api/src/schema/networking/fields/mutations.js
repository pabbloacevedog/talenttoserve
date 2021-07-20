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
import NetworkingType from '../type'
import NetworkingList from '../inputType'
import {
	create,
    remove,
    edit,
    remove_more
} from '../resolvers'
// User Register
export const createNetworking = {
	type: NetworkingType,
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
export const editNetworking = {
	type: NetworkingType,
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
export const NetworkingRemove = {
	type: NetworkingType,
	args: {
		codigo: {
			name: 'codigo',
			type: GraphQLInt
		}
	},
	resolve: remove
}
export const removeNetworking = {
    type: NetworkingType,
    args: {
		codigo: {
            name: 'codigo',
			type: GraphQLList(NetworkingList)
		}
	},
	resolve: remove_more
}