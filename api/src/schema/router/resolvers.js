import models from '../../models'

// Get all Routers with enable true
export async function getAll() {
	
	const routers = await models.Router.findAll({ where: { enabled: 1 },order: [
        ['order_menu', 'ASC'],
    ], })
	console.log(routers)
	return routers
}