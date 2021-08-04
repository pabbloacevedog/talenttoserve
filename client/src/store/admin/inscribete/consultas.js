import gql from 'graphql-tag'


//espacio definido para las queries de graphql, las queries son consultas tipo "select"
// 			<-------------- QUERIES -------------->
export const GET_INSCRIBETE_QUERY = gql`
    query{
        inscribetes{
            codigo,
            titulo,
            descripcion,
            link,
            boton,
            banner,
            estado
        }
    }
`
// export const GET_INSCRIBETE_QUERY = gql`
    // query{
    //     inscribetes{
    // codigo,
    // titulo,
    // descripcion,
    // estado
    //     }
    // }
// `
//espacio definido para las mutaciones, las mutaciones son consultas tipo "update o delete"
// 			<-------------- MUTACIONES -------------->
export const CREAR_INSCRIBETE_MUTATION = gql`
    mutation createInscribete(
        $titulo: String!, 
        $descripcion: String!,
        $link: String!,
        $boton: String!,
        $file: Upload!, 
        $estado: Boolean!
        ){
        createInscribete(
            titulo: $titulo,
            descripcion: $descripcion,
            link: $link,
            boton: $boton,
            file: $file,
            estado: $estado
            ){
            creado
        }
    }
`
export const EDITAR_INSCRIBETE_MUTATION = gql`
    mutation editInscribete(
        $codigo: Int!, 
        $titulo: String!, 
        $descripcion: String!, 
        $link: String!,
        $boton: String!,
        $file: Upload!, 
        $estado: Boolean!
        ){
        editInscribete(
            codigo : $codigo, 
            titulo: $titulo,
            descripcion: $descripcion,
            link: $link,
            boton: $boton,
            file: $file,
            estado: $estado
            ){
            editado
        }
    }
`
export const ELIMINAR_INSCRIBETE_MUTATION = gql`
    mutation removeInscribete($id: [InscribeteList]){
        removeInscribete(id : $id){
            eliminado
        }
    }
`