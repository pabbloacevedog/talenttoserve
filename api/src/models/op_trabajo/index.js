// User
import seq from 'sequelize';
const { Model } = seq;
const schema = {
	codigo:{
		type: seq.INTEGER,
		primaryKey: true,
        autoIncrement: true
	},
    cargo: {
		type: seq.STRING(500)
	},
	descripcion: {
		type: seq.STRING(5000)
	},
    link: {
		type: seq.STRING(45)
	},
    hotel: {
		type: seq.STRING(45)
	},
    web: {
		type: seq.STRING(1000)
	},
    banner: {
		type: seq.STRING(1000)
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
            fields:['codigo']
        }
    ]
}
export default (sequelize) => {
	class OpTrabajo extends Model {
		static associate() {

		}
	}
	OpTrabajo.init(schema, {
        timestamps: true,
        createdAt: 'fecha_creacion',
        updatedAt: 'fecha_actualizacion',
        tableName: 'op_trabajo',
        sequelize,
	}, index);
	return OpTrabajo;
};