import gql from 'graphql-tag'


//espacio definido para las queries de graphql, las queries son consultas tipo "select"
// 			<-------------- QUERIES -------------->
export const GET_PAIS_QUERY = gql`
    query{
        paises{
            label,
            value
        }
    }
`
//espacio definido para las mutaciones, las mutaciones son consultas tipo "update o delete"
// 			<-------------- MUTACIONES -------------->
export const CREAR_PAIS_MUTATION = gql`
    mutation createPais($iso: String!, $nombre: String!){
        createPais(iso: $iso,nombre: $nombre){
            creado
        }
    }
`
export const EDITAR_PAIS_MUTATION = gql`
    mutation editPais($id: Int!, $iso: String!, $nombre: String!){
        editPais(id : $id, iso: $iso,nombre: $nombre){
            editado
        }
    }
`
export const ELIMINAR_PAIS_MUTATION = gql`
    mutation removePais($codigo: [PaisList]){
        removePais(codigo : $codigo){
            eliminado
        }
    }
`
