import gql from 'graphql-tag'


//espacio definido para las queries de graphql, las queries son consultas tipo "select"
// 			<-------------- QUERIES -------------->
export const GET_UNIDAD_MEDIDA_QUERY = gql`
    query unidadmedidas ($estado: Boolean!) {
        unidadmedidas(estado:$estado){
            id_unidad_medida,
            unidad_base,
            unidad_conversion,
            nombre,
            descripcion,
            acronimo,
            estado
        }
    }
`
export const GET_UNIDAD_BASE_QUERY = gql`
    query unidadbases ($estado: Boolean!) {
        unidadbases(estado:$estado){
            nombre,
            acronimo,
            unidad,
            base
        }
    }
`
//espacio definido para las mutaciones, las mutaciones son consultas tipo "update o delete"
// 			<-------------- MUTACIONES -------------->
export const CREAR_UNIDAD_MEDIDA_MUTATION = gql`
    mutation createUnidadMedida($unidad_base: Int!, $unidad_conversion: Int!, $nombre: String!, $descripcion: String!, $acronimo: String!, $estado: Boolean!){
        createUnidadMedida(unidad_base: $unidad_base, unidad_conversion: $unidad_conversion, nombre: $nombre,descripcion: $descripcion, acronimo: $acronimo, estado: $estado){
            creado
        }
    }
`
export const EDITAR_UNIDAD_MEDIDA_MUTATION = gql`
    mutation editUnidadMedida($id_unidad_medida: Int!, $unidad_base: Int!, $unidad_conversion: Int!, $nombre: String!, $descripcion: String!,$acronimo: String!, $estado: Boolean!){
        editUnidadMedida(id_unidad_medida : $id_unidad_medida,unidad_base: $unidad_base,unidad_conversion: $unidad_conversion, nombre: $nombre,descripcion: $descripcion,acronimo: $acronimo,estado: $estado){
            editado
        }
    }
`
export const ELIMINAR_UNIDAD_MEDIDA_MUTATION = gql`
    mutation removeUnidadMedida($id: [UnidadMedidaList]){
        removeUnidadMedida(id : $id){
            eliminado
        }
    }
`
export const GUARDAR_UNIDAD_BASE_MUTATION = gql`
    mutation guardarUnidadBase($id: [UnidadBaseList]){
        guardarUnidadBase(id : $id){
            guardado
        }
    }
`