// Imports
import {GraphQLString, GraphQLList, GraphQLBoolean} from 'graphql'

// App Imports
import PerfilType from '../type'
import routerType from '../../router/type'
import {getAll, getById, rutasAll,rutasPerfil} from '../resolvers'

// Users All
export const perfils = {
    type: new GraphQLList(PerfilType),
    args: {
		estado: {
			name: 'estado',
			type: GraphQLBoolean
		}
	},
	resolve: getAll
}
export const rutas_all = {
    type: new GraphQLList(routerType),
	resolve: rutasAll
}
export const rutas_perfil = {
    type: new GraphQLList(routerType),
    args: {
        id_perfil: {
			name: 'id_perfil',
			type: GraphQLString
        },
    },
	resolve: rutasPerfil
}
// user By ID
export const perfil = {
	type: new GraphQLList(PerfilType),
	resolve: getById
}
