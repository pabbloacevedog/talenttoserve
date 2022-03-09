import gql from 'graphql-tag'

export const CREATE_USER_MUTATION = gql`
	mutation userSignup(
		$nombre: String!
		$email: String!
		$id_perfil: String!
		$telefono: String!
		$id_pais: String!
		$nombre_empresa: String
		$cargo: String
		$producto_empresa: String
		$universidad: String
		$carrera: String
		$password: String!
	) {
		userSignup(
			nombre: $nombre
			email: $email
			id_perfil: $id_perfil
			telefono: $telefono
			id_pais: $id_pais
			nombre_empresa: $nombre_empresa
			cargo: $cargo
			producto_empresa: $producto_empresa
			universidad: $universidad
			carrera: $carrera
			password: $password
		) {
			token
		}
	}
`;
