// Imports
import {GraphQLObjectType, GraphQLString ,GraphQLInt, GraphQLBoolean, GraphQLList} from 'graphql'

// Capacitacion type
const CapacitacionType = new GraphQLObjectType({
	name: 'Capacitacion',
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

export default CapacitacionType

