import gql from 'graphql-tag'


//espacio definido para las queries de graphql, las queries son consultas tipo "select"
// 			<-------------- QUERIES -------------->
export const GET_MATERIAL_CORTE_QUERY = gql`
    query materialcortes ($estado: Boolean!) {
        materialcortes(estado:$estado){
            id_material,
            nombre,
            descripcion,
            estado
        }
    }
`
//espacio definido para las mutaciones, las mutaciones son consultas tipo "update o delete"
// 			<-------------- MUTACIONES -------------->
export const CREAR_MATERIAL_CORTE_MUTATION = gql`
    mutation createMaterialCorte( $nombre: String!, $descripcion: String!, $estado: Boolean!){
        createMaterialCorte(nombre: $nombre,descripcion: $descripcion,estado: $estado){
            creado
        }
    }
`
export const EDITAR_MATERIAL_CORTE_MUTATION = gql`
    mutation editMaterialCorte($id_material: Int!, $nombre: String!, $descripcion: String!, $estado: Boolean!){
        editMaterialCorte(id_material : $id_material, nombre: $nombre,descripcion: $descripcion,estado: $estado){
            editado
        }
    }
`
export const ELIMINAR_MATERIAL_CORTE_MUTATION = gql`
    mutation removeMaterialCorte($id: [MaterialCorteList]){
        removeMaterialCorte(id : $id){
            eliminado
        }
    }
`