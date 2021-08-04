// App Imports
import models from '../../models'
// Get users by ID
export async function getById(parentValue, {codigo}) {
	return await models.Capacitacion.findOne({ where: { codigo } })
}

// Get all users
export async function getAll(parentValue, {estado}) {
    console.log('getAll', estado)
	return await models.Capacitacion.findAll({order: [
        ['codigo', 'DESC']
    ],})
}

// Delete user
export async function remove({codigo}) {
	return await models.Capacitacion.destroy({where: {codigo}})
}
// Create user
export async function create(parentValue,{ titulo, descripcion, link, file, estado  },{ storeUpload }) {
    var create = false
    var error = ''
        var banner = ''
    if(typeof file=== 'object'){
        banner = await storeUpload(file)
    }
    console.log('banner',banner)
	await models.Capacitacion.create({
        titulo, descripcion, link, banner, estado
	}).then(capacitacion => {
        create = true
	}).catch(err => {
		console.log(err)
		error = err
	})
	console.log('fin')
	if(create){
		return { creado: create }
	}
	else{
		throw new Error(`Error al crear el capacitacion ` + error)
	}
}
export async function edit(parentValue,{ codigo,titulo, descripcion, link, file, estado },{ storeUpload }) {
    var editado = false
    var error = ''
    var banner = file
    if(typeof file=== 'object'){
        banner = await storeUpload(file)
    }
    console.log('banner',banner)
    var editar = {
        titulo, descripcion, link, banner, estado
    }
    await models.Capacitacion.update(editar, { where: { codigo } }).then(act => {
        editado = true
    }).catch(err => {
        console.log(err)
        error = err
    })
	if(editado){
		return { editado: editado }
	}
	else{
		throw new Error(`Error al editar el capacitacion ` + error)
	}
}
export async function remove_more(parentValue,{ id  }) {
    var eliminado = true
    var error = ''
    id.forEach(element => {
        console.log(element.codigo)
        models.Capacitacion.destroy({where: {codigo : element.codigo}})
        // .then(act => {
        //     eliminado = true
        // }).catch(err => {
        //     console.log(err)
        //     error = err
        // })
    });
	if(eliminado){
		return { eliminado: eliminado }
	}
	else{
		throw new Error(`Error al eliminar el capacitacion ` + error)
	}
}