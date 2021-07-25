import gql from 'graphql-tag'


//espacio definido para las queries de graphql, las queries son consultas tipo "select"
// 			<-------------- QUERIES -------------->
export const GET_USUARIO_QUERY = gql`
    query Usuarios  {
        Usuarios{
            usuario_id,
            email,
            id_perfil,
            perfil,
            nombre,
            telefono,
            id_pais,
            pais,
            nombre_empresa,
            cargo,
            producto_empresa,
            universidad,
            carrera,
            suscrito_mail,
            estado
        }
    }
`
//espacio definido para las mutaciones, las mutaciones son consultas tipo "update o delete"
// 			<-------------- MUTACIONES -------------->
export const CREAR_USUARIO_MUTATION = gql`
    mutation createUsuario(
        $nombre: String!,
        $email: String!,
        $id_perfil: String!,
        $perfil: Int!,
        $telefono: String!,
        $id_pais: Int!,
        $pais: String!,
        $nombre_empresa: String!,
        $cargo: String!,
        $producto_empresa: String!,
        $universidad: String!,
        $carrera: String!,
        $suscrito_mail: Boolean!,
        $estado: Boolean!
        ){
        createUsuario(
            nombre: $nombre,
            email: $email,
            id_perfil: $id_perfil,
            perfil: $perfil,
            telefono: $telefono,
            id_pais: $id_pais,
            pais: $pais,
            nombre_empresa: $nombre_empresa,
            cargo: $cargo,
            producto_empresa: $producto_empresa,
            universidad: $universidad,
            carrera: $carrera,
            suscrito_mail: $suscrito_mail,
            estado: $estado
            ){
            creado
        }
    }
`
export const EDITAR_USUARIO_MUTATION = gql`
    mutation editUsuario(
        $usuario_id: String!, 
        $email: String!,
        $id_perfil: String!,
        $perfil: Int!,
        $telefono: String!,
        $id_pais: Int!,
        $pais: String!,
        $nombre_empresa: String!,
        $cargo: String!,
        $producto_empresa: String!,
        $universidad: String!,
        $carrera: String!,
        $suscrito_mail: Boolean!,
        $estado: Boolean!
        ){
        editUsuario(
            usuario_id : $usuario_id,
            nombre: $nombre,
            email: $email,
            id_perfil: $id_perfil,
            perfil: $perfil,
            telefono: $telefono,
            id_pais: $id_pais,
            pais: $pais,
            nombre_empresa: $nombre_empresa,
            cargo: $cargo,
            producto_empresa: $producto_empresa,
            universidad: $universidad,
            carrera: $carrera,
            suscrito_mail: $suscrito_mail,
            estado: $estado
            ){
            editado
        }
    }
`
export const ELIMINAR_USUARIO_MUTATION = gql`
    mutation removeUsuario($id: [UsuarioList]){
        removeUsuario(id : $id){
            eliminado
        }
    }
`