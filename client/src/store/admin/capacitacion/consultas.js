import gql from 'graphql-tag'


//espacio definido para las queries de graphql, las queries son consultas tipo "select"
// 			<-------------- QUERIES -------------->
export const GET_CAPACITACION_QUERY = gql`
    query{
        capacitacions{
            codigo,
            titulo,
            descripcion,
            link,
            banner,
            estado
        }
    }
`
// export const GET_CAPACITACION_QUERY = gql`
    // query{
    //     capacitacions{
    // codigo,
    // titulo,
    // descripcion,
    // estado
    //     }
    // }
// `
//espacio definido para las mutaciones, las mutaciones son consultas tipo "update o delete"
// 			<-------------- MUTACIONES -------------->
export const CREAR_CAPACITACION_MUTATION = gql`
    mutation createCapacitacion(
        $titulo: String!, 
        $descripcion: String!,
        $link: String!,
        $file: Upload!, 
        $estado: Boolean!
        ){
        createCapacitacion(
            titulo: $titulo,
            descripcion: $descripcion,
            link: $link,
            file: $file,
            estado: $estado
            ){
            creado
        }
    }
`
export const EDITAR_CAPACITACION_MUTATION = gql`
    mutation editCapacitacion(
        $codigo: Int!, 
        $titulo: String!, 
        $descripcion: String!, 
        $link: String!,
        $file: Upload!, 
        $estado: Boolean!
        ){
        editCapacitacion(
            codigo : $codigo, 
            titulo: $titulo,
            descripcion: $descripcion,
            link: $link,
            file: $file,
            estado: $estado
            ){
            editado
        }
    }
`
export const ELIMINAR_CAPACITACION_MUTATION = gql`
    mutation removeCapacitacion($id: [CapacitacionList]){
        removeCapacitacion(id : $id){
            eliminado
        }
    }
`