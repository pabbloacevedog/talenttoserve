// App Imports
import models from '../../models'
import { QueryTypes } from 'sequelize';
const PERFIL_CREATED = 'PERFIL_CREATED';
// Get users by ID
export async function getById(parentValue, {id_perfil}) {
	return await models.Perfil.findOne({ where: { id_perfil } })
}

// Get all users
export async function getAll(parentValue, {estado}) {
    console.log('getAll', estado)
	return await models.Perfil.findAll({order: [
        ['id_perfil', 'DESC']
    ],})
}

// Delete user
export async function remove({id_perfil}) {
	return await models.Perfil.destroy({where: {id_perfil}})
}
export async function publishPerfil(id_perfil) {
    let perfil = await models.sequelize.query(
		' SELECT  ' +
        '   gs.id_perfil,  ' +
        '   gs.nombre,  ' +
        '   gs.descripcion,  ' +
        '   gs.estado ' +
		' FROM ' +
		'     perfil gs ' +
        ' WHERE  ' +
        '     gs.id_perfil = :id_perfil  ' +
        ' group by gs.id_perfil ' +
        ' LIMIT 1 ',
        {
            replacements: { id_perfil },
            type: QueryTypes.SELECT
        }
    )
	return perfil
}
export async function rutasAll() {
    let ruta = await models.sequelize.query(
        ' SELECT  ' +
        '     r.path, ' +
        '     r.name, ' +
        '     0 as estado, ' +
        '     false as value ' +
        ' FROM ' +
        '     router r ' ,
        {
            type: QueryTypes.SELECT
        }
    )
	return ruta
}
export async function rutasPerfil(parentValue,{id_perfil}) {
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
        '     pr.id_perfil = :id_perfil ' ,
        {
            replacements: { id_perfil },
            type: QueryTypes.SELECT
        }
    )
	return ruta
}
// Create user
export async function create(parentValue,{nombre, descripcion, estado,path_default, rutas  }, { pubsub }) {
    var create = false
    var error = ''
    let id_perfil = 0
	await models.Perfil.create({
        nombre, descripcion, path_default,estado
	}).then(perfil => {
		id_perfil = perfil.id_perfil
        console.log('perfil',perfil)
        create = true
        
	}).catch(err => {
		console.log(err)
		error = err
	})
    rutas.forEach(element => {
        // console.log(element)
        if(element.value){
            // console.log('insertar', element.path)
            models.PerfilRouter.create({id_perfil :id_perfil, path: element.path}).then(perfil => {
            }).catch(err => {
                console.log(err)
                error = err
            })
        }
    });
	if(create){
        let po = await publishPerfil(id_perfil)
        console.log(po[0])
        pubsub.publish(PERFIL_CREATED, { perfilCreated: po[0] });
		return { creado: create }
	}
	else{
		throw new Error(`Error al crear el perfil ` + error)
	}
}
export async function edit(parentValue,{  nombre, descripcion, estado, path_default,id_perfil, rutas  }, { pubsub }) {
    var editado = false
    var error = ''
    var editar = {
        nombre, descripcion, path_default, estado
    }
    await models.Perfil.update(editar, { where: { id_perfil } }).then(act => {
        editado = true
    }).catch(err => {
        console.log(err)
        error = err
    })
    models.PerfilRouter.destroy({where: {id_perfil : id_perfil}})
    rutas.forEach(element => {
        // console.log(element)
        if(element.value){
            // console.log('insertar', element.path)
            models.PerfilRouter.create({id_perfil :element.id_perfil, path: element.path}).then(perfil => {
            }).catch(err => {
                console.log(err)
                error = err
            })
        }
    });
	if(editado){
		return { editado: editado }
	}
	else{
		throw new Error(`Error al crear el perfil ` + error)
	}
}
export async function remove_more(parentValue,{ id  }, { pubsub }) {
    var eliminado = true
    var error = ''
    console.log(models.Perfil)

    id.forEach(element => {
        models.Perfil.destroy({where: {id_perfil : element.id_perfil}})
    });
	if(eliminado){
		return { eliminado: eliminado }
	}
	else{
		throw new Error(`Error al crear el perfil ` + error)
	}
}