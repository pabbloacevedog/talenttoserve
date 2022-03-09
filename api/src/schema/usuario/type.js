// Imports
import {GraphQLObjectType, GraphQLString ,GraphQLInt,GraphQLBoolean,GraphQLList} from 'graphql'

// UsuarioType
const UsuarioType = new GraphQLObjectType({
	name: "usuario",
	description: "...",
	fields: () => ({
		usuario_id: {
			type: GraphQLString,
		},
		email: {
			type: GraphQLString,
		},
		password: {
			type: GraphQLString,
		},
		// password_new: {
		//     type: GraphQLString
		// },
		path_default: {
			type: GraphQLString,
		},
		// avatar: {
		// 	type: GraphQLString,
		// },
		id_perfil: {
			type: GraphQLInt,
		},
		perfil: {
			type: GraphQLString,
		},
		nombre: {
			type: GraphQLString,
		},
		telefono: {
			type: GraphQLString,
		},
		id_pais: {
			type: GraphQLInt,
		},
		pais: {
			type: GraphQLString,
		},
		nombre_empresa: {
			type: GraphQLString,
		},
		cargo: {
			type: GraphQLString,
		},
		producto_empresa: {
			type: GraphQLString,
		},
		universidad: {
			type: GraphQLString,
		},
		carrera: {
			type: GraphQLString,
		},
		suscrito_mail: {
			type: GraphQLBoolean,
		},

		fecha_creacion: {
			type: GraphQLString,
		},
		fecha_actualizacion: {
			type: GraphQLString,
		},
		estado: {
			type: GraphQLBoolean,
		},
		creado: {
			type: GraphQLBoolean,
		},
		actualizado: {
			type: GraphQLBoolean,
		},
		eliminado: {
			type: GraphQLBoolean,
		},
		total: {
			type: GraphQLString,
		},
		codigo: {
			type: new GraphQLList(GraphQLString),
		},
	}),
});

export default UsuarioType

