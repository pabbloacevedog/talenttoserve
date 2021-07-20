// App Imports
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import models from '../../models/index.js'
import config from '../../config/config.json'
import CryptoJS from 'crypto-js'
import decode from 'jwt-decode'
import { QueryTypes } from 'sequelize';

export async function rutas(id_perfil) {
    console.log('id_perfil', id_perfil)
    let ruta = await models.sequelize.query(
        ' SELECT  ' +
        '     r.path, ' +
        '     r.component, ' +
        '     r.name, ' +
        '     r.carpet, ' +
        '     r.leaf, ' +
        '     r.children, ' +
        '     r.enabled, ' +
        '     r.order_menu, ' +
        '     r.icon, ' +
        '     r.addmenu, ' +
        '     r.addroute ' +
        ' FROM ' +
        '     router r ' +
        '         INNER JOIN ' +
        '     perfil_router pr ON pr.path = r.path ' +
        ' WHERE ' +
        '     pr.id_perfil = :id_perfil ' +
        ' ORDER BY r.order_menu ASC ' ,
        {
            replacements: { id_perfil },
            type: QueryTypes.SELECT
        }
    )
	return ruta
}
export async function login(parentValue, { email, password }, context) {
    console.log('context', context)
	const usuario = await models.Usuario.findOne({ attributes: { exclude: ['password','passphrase'] },where: { email } })
		if (!usuario) {
                throw new Error(`No tenemos ningún usuario registrado con el email ${ email }. Por favor regístrese.`)
		} 
        else {
            var pass = config.passphrase;
            var decrypted = CryptoJS.AES.decrypt(password, pass)
            var passDecryp = decrypted.toString(CryptoJS.enc.Utf8)
			const datosUsuarioDetalles = usuario.get()
            const router = await rutas(usuario.id_perfil)
			return await bcrypt.compare(passDecryp, datosUsuarioDetalles.password_new).then(result => {
                console.log('result',result)
                if(result){
                    var data = {
                        datosUsuario:datosUsuarioDetalles,
                        routers:router
                    }
                    return {
                        token: jwt.sign(data, config.secret)
                    }
                }
                else{
                    throw new Error(`Lo sentimos, la contraseña que ingresaste es incorrecta. Inténtalo de nuevo.`)
                }
            }).catch(err => {
                throw new Error(`${err}`)
            })
		}
}

export async function loginGoogle(parentValue, { token}) {
    const user = decode(token)
	// const usuario = await models.Usuario.findOne({ where: { email: user.email } })
    const usuario = await models.Usuario.findOne({ attributes: { exclude: ['password','passphrase'] },where: { email: user.email } })
    if (usuario) {
        const datosUsuarioDetalles = usuario.get()
        // const empresa = await models.Empresa.findOne({ where: { empresa_id: datosUsuarioDetalles.empresa_id } })
        const router = await rutas(usuario.id_perfil)
        var data = {
            datosUsuario:datosUsuarioDetalles,
            datosEmpresa: empresa,
            routers:router
        }
        return {
            token: jwt.sign(data, config.secret)
        }
        
    } else {
        console.log(user)
        var creado = false
        var crear = {
            nombre : user.name, 
            email : user.email, 
            avatar: user.picture
        }
        await models.Usuario.create(crear).then(cre => {
            creado = true
        }).catch(err => {
            console.log(err)
            error = err
        })
        if(creado){
            var nuevo_usuario = await models.Usuario.findOne({ where: { email: user.email } })
            const datosUsuarioDetalles = nuevo_usuario.get()
            const router = await rutas(usuario.id_perfil)
            var data = {
                datosUsuario:datosUsuarioDetalles,
                routers:router
            }
            return {
                token: jwt.sign(data, config.secret)
            }
        }
        else{
            throw new Error(`Error al crear el usuario ` + error)
        }

    }
}
