// Imports
import {GraphQLBoolean, GraphQLObjectType, GraphQLString} from 'graphql'

// User Login type
const UserLoginType = new GraphQLObjectType({
	name: "UserLogin",
	description: "Autentincación de usuario",

	fields: () => ({
		token: {
			type: GraphQLString,
		},
		email: {
			type: GraphQLString,
		},
		password: {
			type: GraphQLString,
		},
		id_perfil: {
			type: GraphQLString,
		},
		nombre: {
			type: GraphQLString,
		},
		telefono: {
			type: GraphQLString,
		},
		id_pais: {
			type: GraphQLString,
		},
		// avatar: {
		// 	name: "password",
		// 	type: GraphQLString,
		// },
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
		send: {
			type: GraphQLBoolean,
		},
	}),
});

export default UserLoginType
