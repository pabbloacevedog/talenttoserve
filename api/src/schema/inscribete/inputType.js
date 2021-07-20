// Imports
import {GraphQLInputObjectType , GraphQLString ,GraphQLInt, GraphQLBoolean, GraphQLList} from 'graphql'
import InscribeteType from './type'
// Inscribete type
const InscribeteList = new GraphQLInputObjectType ({
	name: 'InscribeteList',
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
        link: {
            type: GraphQLString
        },
        boton: {
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
        codigo:{
            type: InscribeteList
        }
	})
})

export default InscribeteList