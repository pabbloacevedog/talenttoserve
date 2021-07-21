// Imports
import {
	GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLList,
} from 'graphql'

// App Imports
import InscribeteType from '../type'
import InscribeteList from '../inputType'
import {
	create,
    remove,
    edit,
    remove_more
} from '../resolvers'
// User Register
export const createInscribete = {
	type: InscribeteType,
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
        boton: {
            name: 'boton',
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
export const editInscribete = {
	type: InscribeteType,
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
        boton: {
            name: 'boton',
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
export const InscribeteRemove = {
	type: InscribeteType,
	args: {
		codigo: {
			name: 'codigo',
			type: GraphQLInt
		}
	},
	resolve: remove
}
export const removeInscribete = {
    type: InscribeteType,
    args: {
		id: {
            name: 'id',
			type: GraphQLList(InscribeteList)
		}
	},
	resolve: remove_more
}