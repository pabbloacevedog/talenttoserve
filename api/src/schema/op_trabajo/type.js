// Imports
import {GraphQLObjectType, GraphQLString ,GraphQLInt, GraphQLBoolean, GraphQLList} from 'graphql'

// OpTrabajo type
const OpTrabajoType = new GraphQLObjectType({
	name: 'OpTrabajo',
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
        creado:{
			type: GraphQLBoolean
        },
        editado:{
			type: GraphQLBoolean
        },
        eliminado:{
			type: GraphQLBoolean
        },
        id:{
            type: new GraphQLList(GraphQLString)
        }
	})
})

export default OpTrabajoType

