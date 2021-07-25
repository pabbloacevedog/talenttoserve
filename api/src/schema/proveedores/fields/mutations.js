// Imports
import {
	GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLList,
} from 'graphql'

// App Imports
import ProveedorType from '../type'
import ProveedorList from '../inputType'
import {
	create,
    remove,
    edit,
    remove_more
} from '../resolvers'
// User Register
export const createProveedor = {
	type: ProveedorType,
	args: {
        proveedor: {
            name: 'proveedor',
			type: GraphQLString
		},
        direccion: {
            name: 'direccion',
            type: GraphQLString
        },
        telefono: {
            name: 'telefono',
            type: GraphQLString
        },
        email: {
            name: 'email',
            type: GraphQLString
        },
        web: {
            name: 'web',
            type: GraphQLString
        },
        categoria: {
            name: 'categoria',
            type: GraphQLInt
        },
		descripcion:{
            name: 'descripcion',
			type: GraphQLString
		},
        banner: {
            name: 'banner',
            type: GraphQLString
        },
        estado: {
			name: 'estado',
			type: GraphQLBoolean
		}
	},
	resolve: create
}
export const editProveedor = {
	type: ProveedorType,
	args: {
        codigo: {
			name: 'codigo',
			type: GraphQLInt
		},
        proveedor: {
            name: 'proveedor',
			type: GraphQLString
		},
        direccion: {
            name: 'direccion',
            type: GraphQLString
        },
        telefono: {
            name: 'telefono',
            type: GraphQLString
        },
        email: {
            name: 'email',
            type: GraphQLString
        },
        web: {
            name: 'web',
            type: GraphQLString
        },
        categoria: {
            name: 'categoria',
            type: GraphQLInt
        },
		descripcion:{
            name: 'descripcion',
			type: GraphQLString
		},
        banner: {
            name: 'banner',
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
export const ProveedorRemove = {
	type: ProveedorType,
	args: {
		codigo: {
			name: 'codigo',
			type: GraphQLInt
		}
	},
	resolve: remove
}
export const removeProveedor = {
    type: ProveedorType,
    args: {
		id: {
            name: 'id',
			type: GraphQLList(ProveedorList)
		}
	},
	resolve: remove_more
}