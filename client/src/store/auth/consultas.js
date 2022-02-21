import gql from "graphql-tag";

//espacio definido para las queries de graphql, las queries son consultas tipo "select"
// <-------------- QUERIES -------------->
export const GET_USER_QUERY = gql`
	query {
		users {
			id_user
			name
			email
		}
	}
`;
// export const GET_ALL_PASS_USERS = gql`
// 	query{
// 		Usuarios{
//             usuario_id,
//             nombre,
//             email,
//             password,
//             password_new
// 		}
// 	}
// `
export const LOGIN_QUERY = gql`
	query userLogin($email: String!, $password: String!) {
		userLogin(email: $email, password: $password) {
			token: token
		}
	}
`;
export const FORGET_QUERY = gql`
	query forget($email: String!) {
		forget(email: $email) {
			send: send
		}
	}
`;
export const CATEGORIAS_QUERY = gql`
	query {
		categorias {
			id_categoria
			nombre
		}
	}
`;
//espacio definido para las mutaciones, las mutaciones son consultas tipo "update o delete"
// <-------------- MUTACIONES -------------->

export const CREATE_USER_MUTATION = gql`
	mutation userSignup(
		$username: String!
		$email: String!
		$password: String!
		$categoria: Int!
	) {
		userSignup(
			usuario: $username
			email: $email
			password: $password
			id_categoria: $categoria
		) {
			token
		}
	}
`;
export const UPDATE_PASSWORD_USER_MUTATION = gql`
	mutation updateUsers($users: [UsuarioList]) {
		updateUsers(users: $users) {
			editado
		}
	}
`;
