// Imports
import {GraphQLInputObjectType , GraphQLString ,GraphQLInt, GraphQLBoolean, GraphQLList} from 'graphql'
import NetworkingType from './type'
// Networking type
const NetworkingList = new GraphQLInputObjectType ({
	name: 'NetworkingList',
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
        id:{
            type: NetworkingList
        }
	})
})

export default NetworkingList