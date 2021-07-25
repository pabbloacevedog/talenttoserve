// App Imports
import models from '../../models'
// Get users by ID
export async function getById(parentValue, {codigo}) {
	return await models.OpTrabajo.findOne({ where: { codigo } })
}

// Get all users
export async function getAll(parentValue, {}) {
	return await models.OpTrabajo.findAll({order: [
        ['codigo', 'DESC']
    ],})
}

// Delete user
export async function remove({codigo}) {
	return await models.OpTrabajo.destroy({where: {codigo}})
}
// Create user
export async function create(parentValue,{ cargo, descripcion, link, hotel,web,banner, estado  }) {
    var create = false
    var error = ''
    let codigo = 0
	await models.OpTrabajo.create({
        cargo, descripcion, link, hotel, web,banner,estado
	}).then(optrabajo => {
		codigo = optrabajo.codigo
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
		throw new Error(`Error al crear el optrabajo ` + error)
	}
}
export async function edit(parentValue,{codigo, cargo, descripcion, link, hotel, web,banner,estado }) {
    var editado = false
    var error = ''
    var editar = {
        cargo, descripcion, link, hotel, web,banner,estado
    }
    await models.OpTrabajo.update(editar, { where: { codigo } }).then(act => {
        editado = true
    }).catch(err => {
        console.log(err)
        error = err
    })
	if(editado){
		return { editado: editado }
	}
	else{
		throw new Error(`Error al editar el optrabajo ` + error)
	}
}
export async function remove_more(parentValue,{ id  }) {
    var eliminado = true
    var error = ''
    console.log(models.OpTrabajo)

    id.forEach(element => {
        console.log(element.codigo)
        models.OpTrabajo.destroy({where: {codigo : element.codigo}})
    });
	if(eliminado){
		return { eliminado: eliminado }
	}
	else{
		throw new Error(`Error al eliminar el optrabajo ` + error)
	}
}