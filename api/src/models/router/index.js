// Router dinamicos del usuario
import Sequelize, { Model } from 'Sequelize';


const schema = {
	path: {
		type: Sequelize.STRING(100),
		primaryKey: true,
		autoIncrement: false
	},
	component: {
		type: Sequelize.STRING(500)
	},
	name: {
		type: Sequelize.STRING(500)
	},
	carpet: {
		type: Sequelize.STRING(500)
	},
	leaf: {
		type: Sequelize.BOOLEAN
	},
	children: {
		type: Sequelize.STRING(500)
	},
	enabled: {
		type: Sequelize.BOOLEAN
	},
	order_menu: {
		type: Sequelize.INTEGER(3)
	},
	icon: {
		type: Sequelize.STRING(200)
	},
	addmenu: {
		type: Sequelize.BOOLEAN
	},
	addroute: {
		type: Sequelize.BOOLEAN
	}
};

export default (sequelize) => {
	class Router extends Model {
        static associate(models) {
            // const { Perfil, PerfilRouter } = models
            // Router.belongsToMany(Perfil, { 
            //     as: 'perfiles_router',
			// 	through: PerfilRouter , 
			// 	// foreignKey: 'path' 
            // }); 
            // Router.belongsToMany(Perfil, { through: PerfilRouter });
            // this.belongsToMany(sequelize.models.Perfil, { through: 'perfil_router'});
		}
    }
	Router.init(schema, {
		sequelize,
		tableName: 'router'
	});
	return Router;
};
