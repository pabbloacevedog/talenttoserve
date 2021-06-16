// User
import seq from 'sequelize';
const { Model } = seq;
const schema = {
	id_registro:{
		type: seq.INTEGER,
		primaryKey: true,
        autoIncrement: true
	},
	usuario_id:{
        type: seq.UUID,
        defaultValue: seq.UUIDV4
	},
	ip: {
		type: seq.STRING(500)
	},
    link: {
		type: seq.STRING(500)
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
	class Usuario extends Model {
		static associate() {

		}
	}
	Usuario.init(schema, {
        timestamps: true,
        createdAt: 'fecha_creacion',
        updatedAt: 'fecha_actualizacion',
        tableName: 'usuario',
        sequelize,
	}, index);
	return Usuario;
};

