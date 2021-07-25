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
		type: seq.STRING(5000)
	}
};
const  index =  {
    indexes:[
        {
            unique: false,
            fields:['codigo','nombre']
        }
    ]
}
export default (sequelize) => {
	class Cargo extends Model {
		static associate() {

		}
	}
	Cargo.init(schema, {
        tableName: 'cargo',
        sequelize,
	}, index);
	return Cargo;
};

