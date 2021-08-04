// App Imports
import models from '../../models'
import seq from 'sequelize';
const { QueryTypes } = seq;
// Get users by ID
export async function getById(parentValue, {codigo}) {
	return await models.Proveedor.findOne({ where: { codigo } })
}

// Get all users
export async function getAll(parentValue, {}) {
    return await models.sequelize.query(
        "   SELECT   " +
        "      u.codigo,    " +
        "      u.proveedor,    " +
        "      u.direccion,    " +
        "      u.telefono,     " +
        "      u.email, " +
        "      u.web, " +
        "      pe.nombre AS nombre_categoria,   " +
        "      u.categoria, " +
        "      u.descripcion, " +
        "      u.banner, " +
        "      u.estado     " +
        "   FROM     " +
        "      proveedor u    " +
        "          left JOIN   " +
        "      categoria pe ON u.categoria = pe.codigo  " +
        "      order by u.codigo desc  " ,
        {
            type: QueryTypes.SELECT
        }
    )
}
// Delete user
export async function remove({codigo}) {
	return await models.Proveedor.destroy({where: {codigo}})
}
// Create user
export async function create(parentValue,{ proveedor,direccion, telefono, email, web, categoria, descripcion, file, estado  },{ storeUpload }) {
    var create = false
    var error = ''
    var banner = ''
    if(typeof file=== 'object'){
        banner = await storeUpload(file)
    }
    console.log('banner',banner)
    var crear = {proveedor,direccion, telefono, email, web, categoria, descripcion, banner,estado}
    console.log('crear',crear)
	await models.Proveedor.create(crear).then(proveedor => {
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
export async function edit(parentValue,{ codigo,proveedor,direccion, telefono, email, web, categoria, descripcion, file, estado },{ storeUpload }) {
    var editado = false
    var error = ''
    var banner = ''
    if(typeof file=== 'object'){
        banner = await storeUpload(file)
    }
    console.log('banner',banner)
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