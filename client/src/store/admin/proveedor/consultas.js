import gql from 'graphql-tag'


//espacio definido para las queries de graphql, las queries son consultas tipo "select"
// 			<-------------- QUERIES -------------->
export const GET_PROVEEDOR_QUERY = gql`
    query{
        proveedores{
            codigo,
            proveedor,
            direccion,
            telefono,
            email,
            web,
            categoria,
            nombre_categoria,
            descripcion,
            banner,
            estado
        }
    }
`
// export const GET_PROVEEDOR_QUERY = gql`
    // query{
    //     proveedor{
    // codigo,
    // titulo,
    // descripcion,
    // estado
    //     }
    // }
// `
//espacio definido para las mutaciones, las mutaciones son consultas tipo "update o delete"
// 			<-------------- MUTACIONES -------------->
export const CREAR_PROVEEDOR_MUTATION = gql`
    mutation createProveedor($proveedor: String!,$direccion: String!, $telefono: String!, $email: String!,  $web: String!,$categoria: Int!, $descripcion: String!, $file: Upload!, $estado: Boolean!){
        createProveedor(proveedor: $proveedor,direccion: $direccion,telefono: $telefono,email: $email,web: $web,categoria: $categoria,descripcion: $descripcion,file: $file,estado: $estado){
            creado
        }
    }
`
export const EDITAR_PROVEEDOR_MUTATION = gql`
    mutation editProveedor($codigo: Int!,$proveedor: String!,$direccion: String!, $telefono: String!, $email: String!,  $web: String!,$categoria: Int!, $descripcion: String!, $file: Upload!, $estado: Boolean!){
        editProveedor(codigo : $codigo, proveedor: $proveedor,direccion: $direccion,telefono: $telefono,email: $email,web: $web,categoria: $categoria,descripcion: $descripcion,file: $file,estado: $estado){
            editado
        }
    }
`
export const ELIMINAR_PROVEEDOR_MUTATION = gql`
    mutation removeProveedor($id: [ProveedorList]){
        removeProveedor(id : $id){
            eliminado
        }
    }
`