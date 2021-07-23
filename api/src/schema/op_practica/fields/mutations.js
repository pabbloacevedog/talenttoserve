// Imports
import {
	GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLList
} from 'graphql'

// App Imports
import OpPracticaType from '../type'
import OpPracticaList from '../inputType'
import {
	create,
    remove,
    edit,
    remove_more
} from '../resolvers'
// User Register
export const createOpPractica = {
	type: OpPracticaType,
	args: {
        cargo: {
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
        hotel: {
            name: 'hotel',
            type: GraphQLString
        },
        estado: {
			name: 'estado',
			type: GraphQLBoolean
		}
	},
	resolve: create
}
export const editOpPractica = {
	type: OpPracticaType,
	args: {
        codigo: {
			name: 'codigo',
			type: GraphQLInt
		},
        cargo: {
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
        hotel: {
            name: 'hotel',
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
export const OpPracticaRemove = {
	type: OpPracticaType,
	args: {
		codigo: {
			name: 'codigo',
			type: GraphQLInt
		}
	},
	resolve: remove
}
export const removeOpPractica = {
    type: OpPracticaType,
    args: {
		id: {
            name: 'id',
			type: GraphQLList(OpPracticaList)
		}
	},
	resolve: remove_more
}