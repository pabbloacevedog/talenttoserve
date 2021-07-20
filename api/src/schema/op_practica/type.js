// Imports
import {GraphQLObjectType, GraphQLString ,GraphQLInt, GraphQLBoolean, GraphQLList} from 'graphql'

// OpPractica type
const OpPracticaType = new GraphQLObjectType({
	name: 'OpPractica',
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

export default OpPracticaType

