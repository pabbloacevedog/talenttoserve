// Imports
import {GraphQLInputObjectType , GraphQLString ,GraphQLInt, GraphQLBoolean, GraphQLList} from 'graphql'
import ProveedorType from './type'
// Proveedor type
const ProveedorList = new GraphQLInputObjectType ({
	name: 'ProveedorList',
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
        nombre_categoria: {
            type: GraphQLString
        },
        categoria: {
            type: GraphQLInt
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
        id:{
            type: ProveedorList
        }
	})
})

export default ProveedorList