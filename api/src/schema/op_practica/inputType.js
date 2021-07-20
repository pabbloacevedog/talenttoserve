// Imports
import {GraphQLInputObjectType , GraphQLString ,GraphQLInt, GraphQLBoolean, GraphQLList} from 'graphql'
import OpPracticaType from './type'
// OpPractica type
const OpPracticaList = new GraphQLInputObjectType ({
	name: 'OpPracticaList',
	description: '...',
	fields: () => ({
		codigo: {
			type: GraphQLInt
		},
		cargo: {
			type: GraphQLString
		},
		descripcion:{
			type: GraphQLString
		},
        link: {
            type: GraphQLString
        },
        hotel: {
            type: GraphQLString
        },
        fecha_creacion: {
            type: GraphQLString
        },
        fecha_actualizacion	: {
            type: GraphQLString
        },
		estado:{
			type: GraphQLBoolean
        },
        codigo:{
            type: OpPracticaList
        }
	})
})

export default OpPracticaList