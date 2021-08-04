// Imports
import {GraphQLInputObjectType , GraphQLString ,GraphQLInt, GraphQLBoolean, GraphQLList} from 'graphql'
// UsuarioList type
const UsuarioList = new GraphQLInputObjectType ({
	name: 'UsuarioList',
	description: '...',
	fields: () => ({
        usuario_id:{
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        // password: {
        //     type: GraphQLString
        // },
        // password_new: {
        //     type: GraphQLString
        // },
        // passphrase: {
        //     type: GraphQLString
        // },
        avatar: {
			type: GraphQLString
		},
        id_perfil: {
            type: GraphQLInt
        },
        nombre: {
            type: GraphQLString
        },
        telefono: {
            type: GraphQLString
        },
        id_pais: {
            type: GraphQLInt
        },
        nombre_empresa: {
            type: GraphQLString
        },
        cargo: {
            type: GraphQLString
        },
        producto_empresa: {
            type: GraphQLString
        },
        universidad: {
            type: GraphQLString
        },
        carrera: {
            type: GraphQLString
        },
        suscrito_mail: {
            type: GraphQLBoolean
        },
        fecha_creacion: {
            type: GraphQLString
        },
        fecha_actualizacion	: {
            type: GraphQLString
        },
        estado: {
            type: GraphQLBoolean
        },        
        codigo:{
            type: UsuarioList
        },
        actualizado:{
			type: GraphQLBoolean
        },
        users:{
            type: UsuarioList
        }
	})
})

export default UsuarioList