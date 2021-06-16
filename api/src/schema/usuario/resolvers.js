// App Imports
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
// import { QueryTypes } from 'sequelize';
import seq from 'sequelize';
const { QueryTypes } = seq;
import CryptoJS from 'crypto-js'
import config from '../../config/config.json'

// Get usuarios by ID
export async function buscar_por_usuario(parent, {usuario},{models}) {
	return await models.Usuario.findOne({ where: { usuario } })
}
export async function buscar_por_email(parent, {email},{models}) {
	return await models.Usuario.findOne({where: {email}})
}
export async function buscar_usuario(parent, {usuario, word}, ) {
    let u = '%' + word + '%'
    var usuarios = await models.sequelize.query(
        "   SELECT "  +
        "       us.rut_usuario, "  +
        "       us.usuario,"  +
        "       us.nombre, "  +
        "       us.avatar, "  +
        "       us.ruta_avatar "  +
        "   FROM "  +
        "       shot_usuario us "  +
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
        "       shot_usuario us    " +
        "        " +
        "   LEFT JOIN shot_empresa lo ON us.empresa_id = lo.empresa_id     " +
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
	return await models.Usuario.findAll()
}

export async function existe_usuario(parent, {usuario}, {models}) {
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
export async function crear_usuario(parent,{ nombre, email, password  },{models}) {
	// Usuarios exists with same email check
    var creado = false
	var usuario = await models.Usuario.findOne({ where: { email } })
	if (!usuario) {
		// Usuario no existe
        var pass = config.passphrase;
		var decrypted = CryptoJS.AES.decrypt(password, pass)
		var passDecryp = decrypted.toString(CryptoJS.enc.Utf8)
		const passwordHashed = await bcrypt.hash(passDecryp, config.saltRounds)
        var crear = {
            nombre, email, password: passwordHashed 
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
export async function actualizar_usuario(parent,{ usuario_id, rut_usuario, nombre, usuario, password, email, telefono, avatar, ruta_avatar, verificado, facebook, whatsapp, fecha_creacion, fecha_actualizacion, estado }, { models, pubsub }) {
    var actualizado = false
    var error = ''
    var editar = {
        usuario_id, rut_usuario, nombre, usuario, password, email, telefono, avatar, ruta_avatar, verificado, facebook, whatsapp, fecha_creacion, fecha_actualizacion, estado
    }
    await models.Usuario.update(editar, { where: { uuid_usuario } }).then(act => {
        actualizado = true
    }).catch(err => {
        console.log(err)
        error = err
    })
	if(actualizado){
		return { editado: actualizado }
	}
	else{
		throw new Error(`Error al actualizar usuario ` + error)
	}
}