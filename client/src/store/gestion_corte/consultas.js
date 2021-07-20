import gql from 'graphql-tag'


//espacio definido para las queries de graphql, las queries son consultas tipo "select"
// 			<-------------- QUERIES -------------->
//espacio definido para las mutaciones, las mutaciones son consultas tipo "update o delete"
// 			<-------------- MUTACIONES -------------->
export const GUARDAR_CORTE_MUTATION = gql`
    mutation guardarCorte($material_corte: String!, $grosor_sierra: Int!, $unidad_medida: String!, $alto_plancha: Int!, $ancho_plancha: Int!, $area_plancha: Int!, $area_plancha_utilizada: Int!, $area_plancha_restante: Int!, $total_cortes: Int!, $parametros: String!){
        guardarCorte(material_corte: $material_corte, grosor_sierra: $grosor_sierra,unidad_medida: $unidad_medida,alto_plancha: $alto_plancha,ancho_plancha: $ancho_plancha,area_plancha: $area_plancha,area_plancha_utilizada: $area_plancha_utilizada,area_plancha_restante: $area_plancha_restante,total_cortes: $total_cortes,parametros: $parametros){
            creado
        }
    }
`