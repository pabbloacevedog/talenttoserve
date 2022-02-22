// App Imports
import models from '../../models'
import seq from "sequelize";
const { QueryTypes } = seq;
// Get users by ID
export async function getById(parentValue, {codigo}) {
	return await models.Pais.findOne({ where: { codigo } })
}

// Get all users
export async function getAll(parentValue, {}) {
		var as = await models.sequelize.query(
		"   SELECT  " +
			"       u.id as value,   " +
			"       u.nombre as label    " +
			"   FROM    " +
			"       pais u   " ,
		{
			type: QueryTypes.SELECT,
		}
	);
	console.log(as);
	return as;
}

// Delete user
export async function remove({codigo}) {
	return await models.Pais.destroy({where: {codigo}})
}
// Create user
export async function create(parentValue,{iso, nombre }) {
    var create = false
    var error = ''
    let codigo = 0
	await models.Pais.create({
        iso, nombre
	}).then(pais => {
		codigo = pais.id
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
		throw new Error(`Error al crear el pais ` + error)
	}
}
export async function edit(parentValue,{ id, iso, nombre }) {
    var editado = false
    var error = ''
    var editar = {
        iso, nombre
    }
    await models.Pais.update(editar, { where: { id } }).then(act => {
        editado = true
    }).catch(err => {
        console.log(err)
        error = err
    })
	if(editado){
		return { editado: editado }
	}
	else{
		throw new Error(`Error al editar el pais ` + error)
	}
}
export async function remove_more(parentValue,{ codigo  }) {
    var eliminado = true
    var error = ''
    console.log(models.Pais)

    codigo.forEach(element => {
        console.log(element.id)
        models.Pais.destroy({where: {id : element.id}})
    });
	if(eliminado){
		return { eliminado: eliminado }
	}
	else{
		throw new Error(`Error al eliminar el pais ` + error)
	}
}
