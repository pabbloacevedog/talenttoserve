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
export async function create(parentValue,{ titulo, descripcion, link, banner, estado  }) {
    var create = false
    var error = ''
    let codigo = 0
	await models.Capacitacion.create({
        titulo, descripcion, link, banner, estado
	}).then(capacitacion => {
		codigo = capacitacion.codigo
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
export async function edit(parentValue,{ codigo,titulo, descripcion, link, banner, estado }) {
    var editado = false
    var error = ''
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
export async function remove_more(parentValue,{ codigo  }) {
    var eliminado = true
    var error = ''
    console.log(models.Capacitacion)

    codigo.forEach(element => {
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