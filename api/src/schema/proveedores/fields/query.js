// Imports
import {GraphQLString, GraphQLList, GraphQLBoolean} from 'graphql'

// App Imports
import ProveedorType from '../type'
import {getAll, getById} from '../resolvers'

// Users All
export const proveedores = {
    type: new GraphQLList(ProveedorType),
	resolve: getAll
}

// user By ID
export const proveedor = {
	type: new GraphQLList(ProveedorType),
	resolve: getById
}
