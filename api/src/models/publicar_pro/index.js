// User
import seq from 'sequelize';
const { Model } = seq;
const schema = {
	codigo:{
		type: seq.INTEGER,
		primaryKey: true,
        autoIncrement: true
	},
    proveedor: {
		type: seq.STRING(200)
	},
	direccion: {
		type: seq.STRING(500)
	},
    telefono: {
		type: seq.STRING(30)
	},
    email: {
		type: seq.STRING(500)
	},
    web: {
		type: seq.STRING(500)
	},
    categoria: {
		type: seq.STRING(200)
	},
    descripcion: {
		type: seq.STRING(5000)
	},
    banner: {
		type: seq.STRING(500)
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

