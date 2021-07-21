import gql from 'graphql-tag'

export const CREATE_USER_MUTATION = gql`
	mutation userSignup (
		$nombre: String!,
		$apellido: String!,
		$usuario: String!,
		$email: String!,
        $rut: String!,
        $id_perfil: String!,
		$telefono: String!,
		$password:String!,
		) {
			userSignup(
				nombre: $nombre,
				apellido: $apellido,
				usuario:$usuario,
				email: $email,
                rut:$rut,
                id_perfil:$id_perfil,
				telefono: $telefono,
				password:$password
			) {
				token
			}
		}
`
