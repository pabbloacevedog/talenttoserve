import gql from 'graphql-tag'


//espacio definido para las queries de graphql, las queries son consultas tipo "select"
// 			<-------------- QUERIES -------------->
export const GET_CARGO_QUERY = gql`
    query{
        cargos{
            label,
            value
        }
    }
`
export const GET_PROVEEDORES_QUERY = gql`
    query{
        filtros_proveedores{
            label,
            value
        }
    }
`
// export const GET_CARGO_QUERY = gql`
    // query{
    //     cargos{
    // codigo,
    // titulo,
    // descripcion,
    // estado
    //     }
    // }
// `
//espacio definido para las mutaciones, las mutaciones son consultas tipo "update o delete"
// 			<-------------- MUTACIONES -------------->
export const CREAR_CARGO_MUTATION = gql`
			mutation createCargo($nombre: String!) {
				createCargo(
					nombre: $nombre
				) {
					creado
				}
			}
		`;
export const EDITAR_CARGO_MUTATION = gql`
			mutation editCargo($nombre: String!) {
				editCargo(nombre: $nombre) {
					editado
				}
			}
		`;
export const ELIMINAR_CARGO_MUTATION = gql`
    mutation removeCargo($id: [CargoList]){
        removeCargo(id : $id){
            eliminado
        }
    }
`
