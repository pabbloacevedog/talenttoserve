// Imports
import {GraphQLInputObjectType , GraphQLString ,GraphQLInt, GraphQLBoolean, GraphQLList} from 'graphql'
import CapacitacionType from './type'
// Capacitacion type
const CapacitacionList = new GraphQLInputObjectType ({
	name: 'CapacitacionList',
	description: '...',
	fields: () => ({
		codigo: {
			type: GraphQLInt
		},
        titulo: {
            type: GraphQLString
        },
        descripcion: {
            type: GraphQLString
        },
        link: {
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
            type: CapacitacionList
        }
	})
})

export default CapacitacionList