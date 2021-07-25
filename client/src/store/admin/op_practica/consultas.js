import gql from 'graphql-tag'


//espacio definido para las queries de graphql, las queries son consultas tipo "select"
// 			<-------------- QUERIES -------------->
export const GET_OP_PRACTICA_QUERY = gql`
    query{
        OpPracticas{
            codigo,
            cargo,
            descripcion,
            link,
            hotel,
            estado
        }
    }
`
// export const GET_OpPractica_QUERY = gql`
    // query{
    //     OpPracticas{
    // codigo,
    // titulo,
    // descripcion,
    // estado
    //     }
    // }
// `
//espacio definido para las mutaciones, las mutaciones son consultas tipo "update o delete"
// 			<-------------- MUTACIONES -------------->
export const CREAR_OP_PRACTICA_MUTATION = gql`
    mutation createOpPractica($cargo: String!, $descripcion: String!, $link: String!, $hotel: String!, $estado: Boolean!){
        createOpPractica(cargo: $cargo,descripcion: $descripcion,link: $link,hotel: $hotel,estado: $estado){
            creado
        }
    }
`
export const EDITAR_OP_PRACTICA_MUTATION = gql`
    mutation editOpPractica($codigo: Int!, $cargo: String!, $descripcion: String!, $link: String!, $hotel: String!, $estado: Boolean!){
        editOpPractica(codigo:$codigo, cargo: $cargo,descripcion: $descripcion,link: $link,hotel: $hotel,estado: $estado){
            editado
        }
    }
`
export const ELIMINAR_OP_PRACTICA_MUTATION = gql`
    mutation removeOpPractica($id: [OpPracticaList]){
        removeOpPractica(id : $id){
            eliminado
        }
    }
`