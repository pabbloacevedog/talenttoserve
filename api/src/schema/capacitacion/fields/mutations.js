// Imports
import { GraphQLUpload } from 'apollo-server-koa'
import {
	GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLList,
    GraphQLNonNull
} from 'graphql'

// App Imports
import CapacitacionType from '../type'
import CapacitacionList from '../inputType'
import {
	create,
    remove,
    edit,
    remove_more
} from '../resolvers'
// User Register
export const createCapacitacion = {
	type: CapacitacionType,
	args: {
        titulo: {
            name: 'cargo',
			type: GraphQLString
		},
		descripcion:{
            name: 'descripcion',
			type: GraphQLString
		},
        link: {
            name: 'link',
            type: GraphQLString
        },
        file: {
            name: 'file',
            type: GraphQLNonNull(GraphQLUpload)
        },
        estado: {
			name: 'estado',
			type: GraphQLBoolean
		}
	},
	resolve: create
}
export const editCapacitacion = {
	type: CapacitacionType,
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
        link: {
            name: 'link',
            type: GraphQLString
        },
        file: {
            name: 'file',
            type:  GraphQLNonNull(GraphQLUpload)
        },
        estado: {
			name: 'estado',
			type: GraphQLBoolean
		}
	},
	resolve: edit
}
// User remove
export const CapacitacionRemove = {
	type: CapacitacionType,
	args: {
		codigo: {
			name: 'codigo',
			type: GraphQLInt
		}
	},
	resolve: remove
}
export const removeCapacitacion = {
    type: CapacitacionType,
    args: {
		id: {
            name: 'id',
			type: GraphQLList(CapacitacionList)
		}
	},
	resolve: remove_more
}