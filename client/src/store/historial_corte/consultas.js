import gql from 'graphql-tag'


//espacio definido para las queries de graphql, las queries son consultas tipo "select"
// 			<-------------- QUERIES -------------->
export const GET_HISTORIAL_CORTE_QUERY = gql`
    query historialcortes ($estado: Boolean!) {
        historialcortes(estado:$estado){
            id_historial_corte,
            material_corte,
            grosor_sierra,
            unidad_medida,
            alto_plancha,
            ancho_plancha,
            area_plancha,
            area_plancha_utilizada,
            area_plancha_restante,
            total_cortes,
            parametros,
        }
    }
`
export const GET_CORTES_ALL_QUERY = gql`
    query{
        cortes_all{
            total_cortes
        }
    }
`
export const GET_CORTES_GRAFICO_QUERY = gql`
    query {
        cortes_grafico{
            mes,
            total_mes
        }
    }
`
export const GET_PLANCHAS_GRAFICO_QUERY = gql`
    query {
        planchas_grafico{
            mes,
            total_mes
        }
    }
`
export const GET_TOTAL_PLANCHAS_QUERY = gql`
    query {
        total_planchas {
            total_planchas
        }
    }
`
export const GET_MATERIAL_MAS_USADO_QUERY = gql`
    query {
        material_mas_usado {
            material_corte,
          	veces_usado
        }
    }
`
// export const GET_HISTORIAL_CORTE_QUERY = gql`
//     query{
//         grosorsierras{
//             id_historial_corte,
//             grosor,
//             nombre,
//             descripcion,
//             estado
//         }
//     }
// `
//espacio definido para las mutaciones, las mutaciones son consultas tipo "update o delete"
// 			<-------------- MUTACIONES -------------->
export const ELIMINAR_HISTORIAL_CORTE_MUTATION = gql`
    mutation removeHistorialCorte($id: [HistorialCorteList]){
        removeHistorialCorte(id : $id){
            eliminado
        }
    }
`