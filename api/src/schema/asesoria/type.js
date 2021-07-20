// Imports
import {GraphQLObjectType, GraphQLString ,GraphQLInt, GraphQLBoolean, GraphQLList} from 'graphql'

// Asesoria type
const AsesoriaType = new GraphQLObjectType({
	name: 'Asesoria',
	description: '...',
	fields: () => ({
		codigo: {
			type: GraphQLInt
		},
		titulo: {
			type: GraphQLString
		},
		descripcion:{
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

export default AsesoriaType

