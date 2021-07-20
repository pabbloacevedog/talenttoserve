// User
import seq from 'sequelize';
const { Model } = seq;
const schema = {
	usuario_id:{
        type: seq.UUID,
        defaultValue: seq.UUIDV4,
        allowNull: false,
        primaryKey: true
	},
    email: {
		type: seq.STRING(500)
	},
	password: {
		type: seq.STRING(500)
	},
    password_new: {
		type: seq.STRING(500)
	},
    passphrase: {
		type: seq.STRING(500)
	},
    id_perfil: {
		type: seq.INTEGER(1)
	},
	nombre: {
		type: seq.STRING(200)
	},
    telefono: {
		type: seq.STRING(20)
	},
    id_pais: {
		type: seq.INTEGER(3)
	},
    avatar: {
		type: seq.STRING(1000)
    },
    // route_img: {
	// 	type: seq.STRING(1000)
	// },
	// images: {
	// 	type: seq.TEXT
	// },
	nombre_empresa: {
		type: seq.STRING(1000)
    },
    cargo: {
		type: seq.STRING(200)
	},
    producto_empresa: {
		type: seq.STRING(500)
    },
    universidad: {
		type: seq.STRING(200)
    },
    carrera: {
		type: seq.STRING(300)
    },
	suscrito_mail: {
		type: seq.INTEGER(1)
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
            fields:['usuario_id','email']
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

