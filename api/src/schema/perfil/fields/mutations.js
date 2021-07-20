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
import PerfilType from '../type'
import PerfilList from '../inputType'
import RouterlList from '../../router/inputType'
import {
	create,
    remove,
    edit,
    remove_more
} from '../resolvers'
// User Register
export const createPerfil = {
	type: PerfilType,
	args: {
		nombre: {
			name: 'nombre',
			type: GraphQLString
		},
		descripcion: {
			name: 'descripcion',
			type: GraphQLString
        },
        estado: {
			name: 'estado',
			type: GraphQLBoolean
		},
        rutas: {
            name: 'rutas',
			type: GraphQLList(RouterlList)
		}
	},
	resolve: create
}
export const editPerfil = {
	type: PerfilType,
	args: {
        id_perfil: {
			name: 'id_perfil',
			type: GraphQLInt
		},
		nombre: {
			name: 'nombre',
			type: GraphQLString
		},
		descripcion: {
			name: 'descripcion',
			type: GraphQLString
        },
        estado: {
			name: 'estado',
			type: GraphQLBoolean
        },
        rutas: {
            name: 'rutas',
			type: GraphQLList(RouterlList)
		}
	},
	resolve: edit
}
// User remove
export const PerfilRemove = {
	type: PerfilType,
	args: {
		id_perfil: {
			name: 'id_perfil',
			type: GraphQLInt
		}
	},
	resolve: remove
}
export const removePerfil = {
    type: PerfilType,
    args: {
		id: {
            name: 'id',
			type: GraphQLList(PerfilList)
		}
	},
	resolve: remove_more
}