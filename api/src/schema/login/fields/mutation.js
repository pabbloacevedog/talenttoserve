// Imports
import { GraphQLString, GraphQLInt } from "graphql";

// App Imports
import UserType from "../type";
import { create } from "../resolvers";

// User Auth
export const userSignup = {
	type: UserType,
	args: {
		email: {
			name: "email",
			type: GraphQLString,
		},

		password: {
			name: "password",
			type: GraphQLString,
		},

		id_perfil: {
			name: "id_perfil",
			type: GraphQLString,
		},
		nombre: {
			name: "nombre",
			type: GraphQLString,
		},
		telefono: {
			name: "telefono",
			type: GraphQLString,
		},
		id_pais: {
			name: "id_pais",
			type: GraphQLString,
		},
		// avatar: {
		// 	name: "password",
		// 	type: GraphQLString,
		// },
		nombre_empresa: {
			name: "nombre_empresa",
			type: GraphQLString,
		},
		cargo: {
			name: "cargo",
			type: GraphQLString,
		},
		producto_empresa: {
			name: "producto_empresa",
			type: GraphQLString,
		},
		universidad: {
			name: "universidad",
			type: GraphQLString,
		},
		carrera: {
			name: "carrera",
			type: GraphQLString,
		},
	},
	resolve: create,
};
