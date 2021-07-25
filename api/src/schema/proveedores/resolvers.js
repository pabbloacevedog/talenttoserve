// App Imports
import models from '../../models'
// Get users by ID
export async function getById(parentValue, {codigo}) {
	return await models.Proveedor.findOne({ where: { codigo } })
}

// Get all users
export async function getAll(parentValue, {}) {
    console.log('getAll', models)
	return await models.Proveedor.findAll({order: [
        ['codigo', 'DESC']
    ],})
}
// Delete user
export async function remove({codigo}) {
	return await models.Proveedor.destroy({where: {codigo}})
}
// Create user
export async function create(parentValue,{ proveedor,direccion, telefono, email, web, categoria, descripcion, banner, estado  }) {
    var create = false
    var error = ''
    let codigo = 0
	await models.Proveedor.create({
        proveedor,direccion, telefono, email, web, categoria, descripcion, banner,
	}).then(proveedor => {
		codigo = proveedor.codigo
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
		throw new Error(`Error al crear el proveedor ` + error)
	}
}
export async function edit(parentValue,{ codigo,proveedor,direccion, telefono, email, web, categoria, descripcion, banner, estado }) {
    var editado = false
    var error = ''
    var editar = {
        proveedor,direccion, telefono, email, web, categoria, descripcion, banner, estado
    }
    await models.Proveedor.update(editar, { where: { codigo } }).then(act => {
        editado = true
    }).catch(err => {
        console.log(err)
        error = err
    })
	if(editado){
		return { editado: editado }
	}
	else{
		throw new Error(`Error al editar el proveedor ` + error)
	}
}
export async function remove_more(parentValue,{ id  }) {
    var eliminado = true
    var error = ''
    console.log(models.Proveedor)

    id.forEach(element => {
        console.log(element.codigo)
        models.Proveedor.destroy({where: {codigo : element.codigo}})
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
		throw new Error(`Error al eliminar el proveedor ` + error)
	}
}