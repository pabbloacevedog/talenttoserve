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
export const GET_SELECTOR_QUERY = gql`
    query Selectores ($tipo: String) {
        Selectores(tipo:$tipo){
            value,
            label
        }
    }
`
export const GET_NUSUARIO_QUERY = gql`
    query ContarUsuarios  {
        ContarUsuarios{
            total
        }
    }
`
//espacio definido para las mutaciones, las mutaciones son consultas tipo "update o delete"
// 			<-------------- MUTACIONES -------------->
export const CREAR_USUARIO_MUTATION = gql`
    mutation CrearUsuario(
        $nombre: String!,
        $password_new: String!,
        $email: String!,
        $id_perfil: Int!,
        $telefono: String!,
        $id_pais: Int!,
        $nombre_empresa: String,
        $cargo: String,
        $producto_empresa: String,
        $universidad: String,
        $carrera: String,
        $suscrito_mail: Boolean!,
        $estado: Boolean!
        ){
        CrearUsuario(
            nombre: $nombre,
            password_new: $password_new,
            email: $email,
            id_perfil: $id_perfil,
            telefono: $telefono,
            id_pais: $id_pais,
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
    mutation ActualizarUsuario(
        $usuario_id: String!,
        $nombre: String!,
        $email: String!,
        $id_perfil: Int!,
        $telefono: String,
        $id_pais: Int!,
        $nombre_empresa: String,
        $cargo: String,
        $producto_empresa: String,
        $universidad: String,
        $carrera: String,
        $suscrito_mail: Boolean!,
        $estado: Boolean!
        ){
        ActualizarUsuario(
            usuario_id : $usuario_id,
            nombre: $nombre,
            email: $email,
            id_perfil: $id_perfil,
            telefono: $telefono,
            id_pais: $id_pais,
            nombre_empresa: $nombre_empresa,
            cargo: $cargo,
            producto_empresa: $producto_empresa,
            universidad: $universidad,
            carrera: $carrera,
            suscrito_mail: $suscrito_mail,
            estado: $estado
            ){
                actualizado
        }
    }
`
export const ELIMINAR_USUARIO_MUTATION = gql`
    mutation RemoverUsuario($id: [UsuarioList]){
        RemoverUsuario(id : $id){
            eliminado
        }
    }
`
