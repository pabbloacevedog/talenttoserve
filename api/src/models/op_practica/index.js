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
	class Op_practica extends Model {
		static associate() {

		}
	}
	Op_practica.init(schema, {
        timestamps: true,
        createdAt: 'fecha_creacion',
        updatedAt: 'fecha_actualizacion',
        tableName: 'op_practica',
        sequelize,
	}, index);
	return Op_practica;
};

