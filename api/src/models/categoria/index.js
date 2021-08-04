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
	class Categoria extends Model {
		static associate() {

		}
	}
	Categoria.init(schema, {
        tableName: 'categoria',
        sequelize,
	}, index);
	return Categoria;
};
