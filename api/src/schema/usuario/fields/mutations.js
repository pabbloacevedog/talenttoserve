// Imports
import {
	GraphQLString,
	GraphQLInt,
    GraphQLBoolean,
    GraphQLList
} from 'graphql'

// App Imports
import UsuarioType from '../../usuario/type.js'
import UsuarioLoginType from '../type.js'
import UsuarioList from '../inputType'
import {
    crear_usuario,
    remover_usuario,
    actualizar_usuario,
    update_users
} from '../resolvers.js'
// Usuario Register
export const CrearUsuario = {
	type: UsuarioLoginType,
	args: {
        email: {
            name: 'email',
            type: GraphQLString
        },
        id_perfil: {
            name: 'id_perfil',
            type: GraphQLInt
        },
        nombre: {
            name: 'nombre',
            type: GraphQLString
        },
        password_new: {
			name: 'password_new',
			type: GraphQLString
		},
        telefono: {
            name: 'telefono',
            type: GraphQLString
        },
        id_pais: {
            name: 'id_pais',
            type: GraphQLInt
        },
        nombre_empresa: {
            name: 'nombre_empresa',
            type: GraphQLString
        },
        cargo: {
            name: 'cargo',
            type: GraphQLString
        },
        producto_empresa: {
            name: 'producto_empresa',
            type: GraphQLString
        },
        universidad: {
            name: 'universidad',
            type: GraphQLString
        },
        carrera: {
            name: 'carrera',
            type: GraphQLString
        },
        suscrito_mail: {
            name: 'suscrito_mail',
            type: GraphQLBoolean
        },
        estado: {
			name: 'estado',
			type: GraphQLString
		}
	},
	resolve: crear_usuario
}
//actualizar usuario
export const ActulizarUsuario = {
	type: UsuarioType,
	args: {
        usuario_id:{
            name: 'usuario_id',
            type: GraphQLString
        },
        email: {
            name: 'email',
            type: GraphQLString
        },
        id_perfil: {
            name: 'id_perfil',
            type: GraphQLInt
        },
        nombre: {
            name: 'nombre',
            type: GraphQLString
        },
        telefono: {
            name: 'telefono',
            type: GraphQLString
        },
        id_pais: {
            name: 'id_pais',
            type: GraphQLInt
        },
        nombre_empresa: {
            name: 'nombre_empresa',
            type: GraphQLString
        },
        cargo: {
            name: 'cargo',
            type: GraphQLString
        },
        producto_empresa: {
            name: 'producto_empresa',
            type: GraphQLString
        },
        universidad: {
            name: 'universidad',
            type: GraphQLString
        },
        carrera: {
            name: 'carrera',
            type: GraphQLString
        },
        suscrito_mail: {
            name: 'suscrito_mail',
            type: GraphQLBoolean
        },
        estado: {
			name: 'estado',
			type: GraphQLString
		}
	},
	resolve: actualizar_usuario
}
// Usuario remove
export const RemoverUsuario = {
	type: UsuarioType,
	args: {
		usuario_id: {
			name: 'usuario_id',
			type: GraphQLInt
		}
	},
	resolve: remover_usuario
}
// export const removeUsuarios = {
//     type: UsuarioType,
//     args: {
// 		codigo: {
//             name: 'codigo',
// 			type: GraphQLList(UsuarioList)
// 		}
// 	},
// 	resolve: remove_more
// }


//mutation for update password and generate new hash for user
// export const updateUsers = {
//     type: UsuarioType,
//     args: {
// 		users: {
//             name: 'users',
// 			type: GraphQLList(UsuarioList)
// 		}
// 	},
// 	resolve: update_users
// }