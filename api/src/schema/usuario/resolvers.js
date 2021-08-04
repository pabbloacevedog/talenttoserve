// App Imports
import bcrypt from 'bcrypt'
// import { QueryTypes } from 'sequelize';
import seq from 'sequelize';
const { QueryTypes } = seq;
import CryptoJS from 'crypto-js'
import config from '../../config/config.json'
import models from '../../models/index.js'
// Get usuarios by ID
export async function buscar_por_usuario(parent, {usuario}) {
	return await models.Usuario.findOne({ where: { usuario } })
}
export async function buscar_por_email(parent, {email}) {
	return await models.Usuario.findOne({where: {email}})
}
export async function buscar_usuario(parent, {usuario, word}, ) {
    let u = '%' + word + '%'
    var usuarios = await models.sequelize.query(
        "   SELECT "  +
        "       us.rut_usuario, "  +
        "       us.usuario, "  +
        "       us.nombre, "  +
        "       us.avatar, "  +
        "       us.ruta_avatar "  +
        "   FROM "  +
        "       TTS_usuario us "  +
        "   WHERE "  +
        "       us.nombre LIKE :u || us.usuario LIKE :u LIKE :u "  ,
        {
            replacements: { u },
            type: QueryTypes.SELECT
        }
    )
    console.log(usuarios)
	return usuarios
}
export async function datos_usuario(parent, {usuario_id}, {models, usuario}, info) {
    // console.log('usuario', usuario)
    // console.log('usuario_id', usuario_id)
    if(usuario_id != usuario.datosUsuario.usuario_id)return null
    var usuario = await models.sequelize.query(
        "   SELECT    " +
        "       us.nombre,    " +
        "       us.rut_usuario, " +
        "       us.email, " +
        "       us.telefono, " +
        "       us.verificado, " +
        "       us.facebook, " +
        "       us.whatsapp, " +
        "       us.fecha_creacion, " +
        "       us.avatar,    " +
        "       us.ruta_avatar, " +
        "       lo.nombre as nombre_empresa, " +
        "       lo.empresa_id, " +
        "       lo.logo_empresa, " +
        "       lo.ruta_logo  as ruta_logo_empresa, " +
        "       lo.descripcion_empresa " +
        "   FROM    " +
        "       TTS_usuario us    " +
        "        " +
        "   LEFT JOIN TTS_empresa lo ON us.empresa_id = lo.empresa_id     " +
        "   WHERE    " +
        "       us.usuario_id = :usuario_id   " ,
        {
            replacements: { usuario_id },
            type: QueryTypes.SELECT
        }
    )
	return usuario[0]
}
// Get all usuarios
export async function traer_todos() {
    var usuarios = await models.sequelize.query(
        "   SELECT  " +
        "       u.usuario_id,   " +
        "       u.nombre,   " +
        "       u.email,    " +
        "       pe.nombre AS perfil,    " +
        "       u.id_perfil,    " +
        "       u.telefono, " +
        "       pa.nombre AS pais,  " +
        "       u.id_pais,  " +
        "       u.nombre_empresa,   " +
        "       u.cargo,   " +
        "       u.producto_empresa, " +
        "       u.universidad,  " +
        "       u.carrera,  " +
        "       u.suscrito_mail,    " +
        "       u.estado    " +
        "   FROM    " +
        "       usuario u   " +
        "           INNER JOIN  " +
        "       perfil pe ON u.id_perfil = pe.id_perfil " +
        "           INNER JOIN  " +
        "       pais pa ON u.id_pais = pa.id    " ,
        {
            type: QueryTypes.SELECT
        }
    )
    // console.log(usuarios)
	return usuarios
}
export async function getAll(parentValue,{}) {
	return await models.Usuario.findAll({attributes: {exclude: ['password']}, order: [
        ['usuario_id', 'DESC']
    ],})
}
export async function existe_usuario(parent, {usuario}) {
	var exists = false
	var usuario = await models.Usuario.findOne({ where: { usuario } })
	if (usuario) {
		exists = true
	}
	return await {exists}
}
// Delete usuario
export async function remover_usuario(parent, {usuario_id}) {
	return await models.Usuario.destroy({where: {usuario_id}})
}

// Create usuario
export async function crear_usuario(parent,{ password_new,email,id_perfil,nombre,telefono,id_pais,nombre_empresa,cargo,producto_empresa,universidad,carrera,suscrito_mail,estado  }) {
	// Usuarios exists with same email check
    var creado = false
	var usuario = await models.Usuario.findOne({ where: { email } })
	if (!usuario) {
		// Usuario no existe
        var pass = config.passphrase;
		var decrypted = CryptoJS.AES.decrypt(password_new, pass)
		var passDecryp = decrypted.toString(CryptoJS.enc.Utf8)
		const passwordHashed = await bcrypt.hash(passDecryp, config.saltRounds)
        var crear = {
            email,id_perfil,nombre,telefono,id_pais,nombre_empresa,cargo,producto_empresa,universidad,carrera,suscrito_mail,estado, password_new: passwordHashed 
        }
        await models.Usuario.create(crear).then(cre => {
            creado = true
        }).catch(err => {
            console.log(err)
            error = err
        })
        if(creado){
            return { creado: creado }
        }
        else{
            throw new Error(`Error al crear el usuario ` + error)
        }
	}
	else {
		// Usuario existe
		throw new Error(`El email ${ email } ya esta registrado. Intenta iniciar sesión.`)
	}
}
export async function actualizar_usuario(parent,{ usuario_id, email,id_perfil,nombre,telefono,id_pais,nombre_empresa,cargo,producto_empresa,universidad,carrera,suscrito_mail,estado }) {
    var actualizado = false
    var error = ''
    var editar = {
        usuario_id, email,id_perfil,nombre,telefono,id_pais,nombre_empresa,cargo,producto_empresa,universidad,carrera,suscrito_mail,estado
    }
    await models.Usuario.update(editar, { where: { usuario_id } }).then(act => {
        actualizado = true
    }).catch(err => {
        console.log(err)
        error = err
    })
	if(actualizado){
		return { actualizado}
	}
	else{
		throw new Error(`Error al actualizar usuario ` + error)
	}
}
// export async function remove_more(parentValue,{ codigo  }) {
//     var eliminado = true
//     var error = ''

//     codigo.forEach(element => {
//         console.log(element.codigo)
//         models.Usuario.destroy({where: {usuario_id : element.codigo}})
//         // .then(act => {
//         //     eliminado = true
//         // }).catch(err => {
//         //     console.log(err)
//         //     error = err
//         // })
//     });
// 	if(eliminado){
// 		return { eliminado: eliminado }
// 	}
// 	else{
// 		throw new Error(`Error al eliminar el Usuario ` + error)
// 	}
// }



// export async function update_users(parentValue,{ users  }) {
//     var update = true
//     var error = ''

//     for (const element of users) {
//         var usuario_id = element.usuario_id
//         var passphrase =  element.password
//         var password_new =  element.password_new
        
//         var pass = config.passphrase;

//         console.log('passphrase', passphrase)

//         const passwordHashed = await bcrypt.hash(password_new, config.saltRounds)
//         // console.log('passwordHashed', passwordHashed)
//         password_new = passwordHashed
//         var editar = {
//             passphrase, password_new
//         }
//         console.log('editar', editar)
//         await models.Usuario.update(editar, { where: { usuario_id } }).then(act => {
//             update = true
//         }).catch(err => {
//             console.log(err)
//             error = err
//         })
//         console.log('actualizado ', editar)

//     }
// 	if(update){
// 		return { editado: update }
// 	}
// 	else{
// 		throw new Error(`Error al eliminar el Usuario ` + error)
// 	}
// }