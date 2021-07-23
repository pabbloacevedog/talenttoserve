import gql from 'graphql-tag'


//espacio definido para las queries de graphql, las queries son consultas tipo "select"
// 			<-------------- QUERIES -------------->
export const GET_USUARIO_QUERY = gql`
    query Usuarios  {
        Usuarios{
            usuario_id,
            email,
            id_perfil,
            nombre,
            telefono,
            id_pais,
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
        $rut: String!, 
        $nombre: String!, 
        $apellido: String!, 
        $email: String!, 
        $usuario: String, 
        $id_perfil: String!, 
        $telefono: String, 
        $descripcion: String, 
        $clave : String!, 
        $estado: Boolean!
        ){
        createUsuario(
            rut: $rut, 
            nombre: $nombre,
            apellido: $apellido,
            email: $email,
            usuario: $usuario,
            id_perfil: $id_perfil,
            telefono: $telefono,
            descripcion: $descripcion,
            clave: $clave,
            estado: $estado){
            creado
        }
    }
`
export const EDITAR_USUARIO_MUTATION = gql`
    mutation editUsuario(
        $uuid_usuario: String!, 
        $rut: String!, 
        $nombre: String!, 
        $apellido: String!, 
        $email: String!, 
        $usuario: String, 
        $id_perfil: String, 
        $telefono: String, 
        $descripcion: String, 
        $estado: Boolean!
        ){
        editUsuario(
            uuid_usuario : $uuid_usuario,
            rut: $rut, 
            nombre: $nombre,
            apellido: $apellido,
            email: $email,
            usuario: $usuario,
            id_perfil: $id_perfil,
            telefono: $telefono,
            descripcion: $descripcion,
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