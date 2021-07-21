import gql from 'graphql-tag'


//espacio definido para las queries de graphql, las queries son consultas tipo "select"
// 			<-------------- QUERIES -------------->
export const GET_NETWORKING_QUERY = gql`
    query{
        networkings{
            codigo,
            titulo,
            descripcion,
            estado
        }
    }
`
// export const GET_NETWORKING_QUERY = gql`
    // query{
    //     networkings{
    // codigo,
    // titulo,
    // descripcion,
    // estado
    //     }
    // }
// `
//espacio definido para las mutaciones, las mutaciones son consultas tipo "update o delete"
// 			<-------------- MUTACIONES -------------->
export const CREAR_NETWORKING_MUTATION = gql`
    mutation createNetworking($titulo: String!, $descripcion: String!, $estado: Boolean!){
        createNetworking(titulo: $titulo,descripcion: $descripcion,estado: $estado){
            creado
        }
    }
`
export const EDITAR_NETWORKING_MUTATION = gql`
    mutation editNetworking($codigo: Int!, $titulo: String!, $descripcion: String!, $estado: Boolean!){
        editNetworking(codigo : $codigo, titulo: $titulo,descripcion: $descripcion,estado: $estado){
            editado
        }
    }
`
export const ELIMINAR_NETWORKING_MUTATION = gql`
    mutation removeNetworking($id: [NetworkingList]){
        removeNetworking(id : $id){
            eliminado
        }
    }
`