// User
import seq from 'sequelize';
const { Model } = seq;
const schema = {
	id_perfil:{
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
    path_default:{ 
        type:seq.STRING(500)
    },
    estado: {
		type: seq.INTEGER(1)
	},
};
const  index =  {
    indexes:[
        {
            unique: false,
            fields:['id_perfil']
        }
    ]
}
export default (sequelize) => {
	class Perfil extends Model {
		static associate() {

		}
	}
	Perfil.init(schema, {
        tableName: 'perfil',
        sequelize,
	}, index);
	return Perfil;
};

