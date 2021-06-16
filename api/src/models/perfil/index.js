// User
import seq from 'sequelize';
const { Model } = seq;
const schema = {
	codigo:{
		type: seq.INTEGER,
		primaryKey: true,
        autoIncrement: true
	},
    nombre: {
		type: seq.STRING(200)
	},
    descripcion: {
		type: seq.STRING(5000)
	},
    admin: {
		type: seq.INTEGER(1)
	},
};
const  index =  {
    indexes:[
        {
            unique: false,
            fields:['codigo']
        }
    ]
}
export default (sequelize) => {
	class Publicar_pro extends Model {
		static associate() {

		}
	}
	Publicar_pro.init(schema, {
        tableName: 'publicar_pro',
        sequelize,
	}, index);
	return Publicar_pro;
};

