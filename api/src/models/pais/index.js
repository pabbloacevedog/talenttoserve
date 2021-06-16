// User
import seq from 'sequelize';
const { Model } = seq;
const schema = {
	id:{
		type: seq.INTEGER,
		primaryKey: true,
        autoIncrement: true
	},
    iso: {
		type: seq.STRING(2)
	},
	nombre: {
		type: seq.STRING(5000)
	}
};
const  index =  {
    indexes:[
        {
            unique: false,
            fields:['id','nombre']
        }
    ]
}
export default (sequelize) => {
	class Pais extends Model {
		static associate() {

		}
	}
	Pais.init(schema, {
        tableName: 'pais',
        sequelize,
	}, index);
	return Pais;
};

