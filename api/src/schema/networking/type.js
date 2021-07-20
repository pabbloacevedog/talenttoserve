// Imports
import {GraphQLObjectType, GraphQLString ,GraphQLInt, GraphQLBoolean, GraphQLList} from 'graphql'

// Networking type
const NetworkingType = new GraphQLObjectType({
	name: 'Networking',
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

export default NetworkingType

