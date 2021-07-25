// App Imports
import models from '../../models'
// Get users by ID
export async function getById(parentValue, {codigo}) {
	return await models.Cargo.findOne({ where: { codigo } })
}

// Get all users
export async function getAll(parentValue, {}) {
    var as = await models.Cargo.findAll({order: [
        ['codigo', 'DESC']
    ]})
	return as
}

// Delete user
export async function remove({codigo}) {
	return await models.Cargo.destroy({where: {codigo}})
}
// Create user
export async function create(parentValue,{ nombre  }) {
    var create = false
    var error = ''
    let codigo = 0
	await models.Cargo.create({
        nombre
	}).then(cargo => {
		codigo = cargo.codigo
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
		throw new Error(`Error al crear el cargo ` + error)
	}
}
export async function edit(parentValue,{ codigo, nombre }) {
    var editado = false
    var error = ''
    var editar = {
        nombre
    }
    await models.Cargo.update(editar, { where: { codigo } }).then(act => {
        editado = true
    }).catch(err => {
        console.log(err)
        error = err
    })
	if(editado){
		return { editado: editado }
	}
	else{
		throw new Error(`Error al editar el cargo ` + error)
	}
}
export async function remove_more(parentValue,{ id  }) {
    var eliminado = true
    var error = ''
    console.log(models.Cargo)

    id.forEach(element => {
        console.log(element.codigo)
        models.Cargo.destroy({where: {codigo : element.codigo}})
    });
	if(eliminado){
		return { eliminado: eliminado }
	}
	else{
		throw new Error(`Error al eliminar el cargo ` + error)
	}
}