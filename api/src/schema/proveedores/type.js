// Imports
import {GraphQLObjectType, GraphQLString ,GraphQLInt, GraphQLBoolean, GraphQLList} from 'graphql'

// Proveedor type
const ProveedorType = new GraphQLObjectType({
	name: 'Proveedor',
	description: '...',
	fields: () => ({
		codigo: {
			type: GraphQLInt
		},
        proveedor: {
            type: GraphQLString
        },
        direccion: {
            type: GraphQLString
        },
        telefono: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        web: {
            type: GraphQLString
        },
        categoria: {
            type: GraphQLString
        },
        descripcion: {
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

export default ProveedorType

