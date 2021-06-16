// User
import seq from 'sequelize';
const { Model } = seq;
const schema = {
	codigo:{
		type: seq.INTEGER,
		primaryKey: true,
        autoIncrement: true
	},
    titulo: {
		type: seq.STRING(500)
	},
	descripcion: {
		type: seq.STRING(5000)
	},
	fecha_creacion: {
		type: seq.DATE,
        defaultValue: seq.NOW
	},
	fecha_actualizacion	: {
		type: seq.DATE
	},
    estado: {
		type: seq.INTEGER(1)
	},
};
const  index =  {
    indexes:[
        {
            unique: false,
            fields:['codigo','titulo']
        }
    ]
}
export default (sequelize) => {
	class Asesoria extends Model {
		static associate() {

		}
	}
	Asesoria.init(schema, {
        timestamps: true,
        createdAt: 'fecha_creacion',
        updatedAt: 'fecha_actualizacion',
        tableName: 'asesoria',
        sequelize,
	}, index);
	return Asesoria;
};

