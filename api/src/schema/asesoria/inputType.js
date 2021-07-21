// Imports
import {GraphQLInputObjectType , GraphQLString ,GraphQLInt, GraphQLBoolean, GraphQLList} from 'graphql'
import AsesoriaType from './type'
// Asesoria type
const AsesoriaList = new GraphQLInputObjectType ({
	name: 'AsesoriaList',
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
            type: AsesoriaList
        }
	})
})

export default AsesoriaList