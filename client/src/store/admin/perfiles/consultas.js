import gql from 'graphql-tag'


//espacio definido para las queries de graphql, las queries son consultas tipo "select"
// 			<-------------- QUERIES -------------->
export const GET_PERFIL_QUERY = gql`
    query perfils ($estado: Boolean!) {
        perfils(estado:$estado){
            id_perfil,
            nombre,
            descripcion,
            path_default,
            estado
        }
    }
`
export const GET_RUTAS_ALL_QUERY = gql`
    query rutas_all {
        rutas_all{
            path,
            name,
            value,
            estado
        }
    }
`
export const GET_RUTAS_PERFIL_QUERY = gql`
    query rutas_perfil ($id_perfil: String!){
        rutas_perfil (id_perfil:$id_perfil){
            path,
            name
        }
    }
`
//espacio definido para las mutaciones, las mutaciones son consultas tipo "update o delete"
// 			<-------------- MUTACIONES -------------->
export const CREAR_PERFIL_MUTATION = gql`
    mutation createPerfil($nombre: String!, $descripcion: String!, $path_default:String!, $estado: Boolean!, $rutas: [RouterList]){
        createPerfil(nombre: $nombre,descripcion: $descripcion,path_default: $path_default, estado: $estado, rutas: $rutas){
            creado
        }
    }
`
export const EDITAR_PERFIL_MUTATION = gql`
    mutation editPerfil($id_perfil: Int!,  $nombre: String!, $descripcion: String!, $path_default:String!, $estado: Boolean!, $rutas: [RouterList]){
        editPerfil(id_perfil : $id_perfil, nombre: $nombre,descripcion: $descripcion,path_default: $path_default, estado: $estado, rutas: $rutas){
            editado
        }
    }
`
export const ELIMINAR_PERFIL_MUTATION = gql`
    mutation removePerfil($id: [PerfilList]){
        removePerfil(id : $id){
            eliminado
        }
    }
`