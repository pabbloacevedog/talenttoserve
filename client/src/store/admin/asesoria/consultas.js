import gql from 'graphql-tag'


//espacio definido para las queries de graphql, las queries son consultas tipo "select"
// 			<-------------- QUERIES -------------->
export const GET_ASESORIA_QUERY = gql`
    query{
        asesorias{
            codigo,
            titulo,
            descripcion,
            estado
        }
    }
`
// export const GET_ASESORIA_QUERY = gql`
    // query{
    //     asesorias{
    // codigo,
    // titulo,
    // descripcion,
    // estado
    //     }
    // }
// `
//espacio definido para las mutaciones, las mutaciones son consultas tipo "update o delete"
// 			<-------------- MUTACIONES -------------->
export const CREAR_ASESORIA_MUTATION = gql`
    mutation createAsesoria($titulo: String!, $descripcion: String!, $estado: Boolean!){
        createAsesoria(titulo: $titulo,descripcion: $descripcion,estado: $estado){
            creado
        }
    }
`
export const EDITAR_ASESORIA_MUTATION = gql`
    mutation editAsesoria($codigo: Int!, $titulo: String!, $descripcion: String!, $estado: Boolean!){
        editAsesoria(codigo : $codigo, titulo: $titulo,descripcion: $descripcion,estado: $estado){
            editado
        }
    }
`
export const ELIMINAR_ASESORIA_MUTATION = gql`
    mutation removeAsesoria($id: [AsesoriaList]){
        removeAsesoria(id : $id){
            eliminado
        }
    }
`