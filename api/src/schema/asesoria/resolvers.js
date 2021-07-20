// App Imports
import models from '../../models'
// Get users by ID
export async function getById(parentValue, {codigo}) {
	return await models.Asesoria.findOne({ where: { codigo } })
}

// Get all users
export async function getAll(parentValue, {estado}) {
    console.log('models.Asesoria', models.Asesoria)
    var status = 0
    if(estado){
        status = 1
    }
    var as = await models.Asesoria.findAll({order: [
        ['codigo', 'DESC']
    ], where : {estado: status}})
    console.log('as', as)
	return as
}

// Delete user
export async function remove({codigo}) {
	return await models.Asesoria.destroy({where: {codigo}})
}
// Create user
export async function create(parentValue,{ titulo, descripcion, estado  }) {
    var create = false
    var error = ''
    let codigo = 0
	await models.Asesoria.create({
        titulo, descripcion, estado 
	}).then(asesoria => {
		codigo = asesoria.codigo
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
		throw new Error(`Error al crear el asesoria ` + error)
	}
}
export async function edit(parentValue,{ codigo, titulo, descripcion, estado }) {
    var editado = false
    var error = ''
    var editar = {
        titulo, descripcion, estado 
    }
    await models.Asesoria.update(editar, { where: { codigo } }).then(act => {
        editado = true
    }).catch(err => {
        console.log(err)
        error = err
    })
	if(editado){
		return { editado: editado }
	}
	else{
		throw new Error(`Error al editar el asesoria ` + error)
	}
}
export async function remove_more(parentValue,{ codigo  }) {
    var eliminado = true
    var error = ''
    console.log(models.Asesoria)

    codigo.forEach(element => {
        console.log(element.codigo)
        models.Asesoria.destroy({where: {codigo : element.codigo}})
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
		throw new Error(`Error al eliminar el asesoria ` + error)
	}
}