// Imports
import {GraphQLInputObjectType , GraphQLString ,GraphQLInt, GraphQLBoolean, GraphQLList} from 'graphql'
import OpTrabajoType from './type'
// OpTrabajo type
const OpTrabajoList = new GraphQLInputObjectType ({
	name: 'OpTrabajoList',
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
        web: {
            type: GraphQLString
        },
        banner: {
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
        id:{
            type: OpTrabajoList
        }
	})
})

export default OpTrabajoList