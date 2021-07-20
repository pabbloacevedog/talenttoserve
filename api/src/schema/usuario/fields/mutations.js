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
		nombre: {
			name: 'nombre',
			type: GraphQLString
		},
		correo: {
			name: 'correo',
			type: GraphQLString
		},
		password: {
			name: 'password',
			type: GraphQLString
		}
	},
	resolve: crear_usuario
}
//actualizar usuario
export const ActulizarUsuario = {
	type: UsuarioType,
	args: {
        usuario_id: {
			name: 'uuid_usuario',
			type: GraphQLString
		},
        rut_usuario: {
			name: 'rut_usuario',
			type: GraphQLString
		},
		nombre: {
			name: 'nombre',
			type: GraphQLString
		},
		usuario: {
			name: 'usuario',
			type: GraphQLString
		},
		password: {
			name: 'password',
			type: GraphQLString
        },
        correo: {
			name: 'correo',
			type: GraphQLString
		},
		telefono: {
			name: 'telefono',
			type: GraphQLString
        },
        avatar: {
			name: 'avatar',
			type: GraphQLString
		},
		ruta_avatar: {
			name: 'ruta_avatar',
			type: GraphQLString
        },
        verificado: {
			name: 'verificado',
			type: GraphQLBoolean
		},
        facebook: {
			name: 'facebook',
			type: GraphQLString
		},
        whatsapp: {
			name: 'whatsapp',
			type: GraphQLString
		},
        fecha_creacion: {
			name: 'fecha_creacion',
			type: GraphQLString
		},
        fecha_actualizacion: {
			name: 'fecha_actualizacion',
			type: GraphQLString
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
export const updateUsers = {
    type: UsuarioType,
    args: {
		users: {
            name: 'users',
			type: GraphQLList(UsuarioList)
		}
	},
	resolve: update_users
}