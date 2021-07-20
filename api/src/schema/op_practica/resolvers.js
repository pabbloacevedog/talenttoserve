// App Imports
import models from '../../models'
// Get users by ID
export async function getById(parentValue, {codigo}) {
	return await models.OpPractica.findOne({ where: { codigo } })
}

// Get all users
export async function getAll(parentValue, {estado}) {
    console.log('getAll', estado)
	return await models.OpPractica.findAll({order: [
        ['codigo', 'DESC']
    ],})
}

// Delete user
export async function remove({codigo}) {
	return await models.OpPractica.destroy({where: {codigo}})
}
// Create user
export async function create(parentValue,{ cargo, descripcion, link, hotel, estado  }) {
    var create = false
    var error = ''
    let codigo = 0
	await models.OpPractica.create({
        cargo, descripcion, link, hotel, estado
	}).then(oppractica => {
		codigo = oppractica.codigo
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
		throw new Error(`Error al crear el oppractica ` + error)
	}
}
export async function edit(parentValue,{codigo, cargo, descripcion, link, hotel, estado }) {
    var editado = false
    var error = ''
    var editar = {
        cargo, descripcion, link, hotel, estado
    }
    await models.OpPractica.update(editar, { where: { codigo } }).then(act => {
        editado = true
    }).catch(err => {
        console.log(err)
        error = err
    })
	if(editado){
		return { editado: editado }
	}
	else{
		throw new Error(`Error al editar el oppractica ` + error)
	}
}
export async function remove_more(parentValue,{ codigo  }) {
    var eliminado = true
    var error = ''
    console.log(models.OpPractica)

    codigo.forEach(element => {
        console.log(element.codigo)
        models.OpPractica.destroy({where: {codigo : element.codigo}})
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
		throw new Error(`Error al eliminar el oppractica ` + error)
	}
}