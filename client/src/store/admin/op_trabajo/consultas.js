import gql from 'graphql-tag'


//espacio definido para las queries de graphql, las queries son consultas tipo "select"
// 			<-------------- QUERIES -------------->
export const GET_OP_TRABAJO_QUERY = gql`
    query{
        OpTrabajos{
            codigo,
            cargo,
            descripcion,
            link,
            hotel,
            web,
            banner,
            estado
        }
    }
`
// export const GET_OpTrabajo_QUERY = gql`
    // query{
    //     OpTrabajos{
    // codigo,
    // titulo,
    // descripcion,
    // estado
    //     }
    // }
// `
//espacio definido para las mutaciones, las mutaciones son consultas tipo "update o delete"
// 			<-------------- MUTACIONES -------------->
export const CREAR_OP_TRABAJO_MUTATION = gql`
    mutation createOpTrabajo(
        $cargo: String!, 
        $descripcion: String!, 
        $link: String!, 
        $hotel: String!, 
        $web: String!,
        $file: Upload!, 
        $estado: Boolean!
        ){
        createOpTrabajo(
            cargo: $cargo,
            descripcion: $descripcion,
            link: $link,
            hotel: $hotel,
            web: $web,
            file: $file,
            estado: $estado
            ){
            creado
        }
    }
`
export const EDITAR_OP_TRABAJO_MUTATION = gql`
    mutation editOpTrabajo($codigo: Int!, $cargo: String!, $descripcion: String!, $link: String!, $hotel: String!,$web: String!,$file: Upload!,  $estado: Boolean!){
        editOpTrabajo(codigo:$codigo, cargo: $cargo,descripcion: $descripcion,link: $link,hotel: $hotel,web: $web,file: $file,estado: $estado){
            editado
        }
    }
`
export const ELIMINAR_OP_TRABAJO_MUTATION = gql`
    mutation removeOpTrabajo($id: [OpTrabajoList]){
        removeOpTrabajo(id : $id){
            eliminado
        }
    }
`