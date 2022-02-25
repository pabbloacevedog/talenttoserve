// User
import seq from "sequelize";
const { Model } = seq;
const schema = {
	codigo: {
		type: seq.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	nombre: {
		type: seq.STRING(5000),
	},
};
const index = {
	indexes: [
		{
			unique: false,
			fields: ["codigo", "nombre"],
		},
	],
};
export default (sequelize) => {
	class FiltroProveedores extends Model {
		static associate() {}
	}
	FiltroProveedores.init(
		schema,
		{
			tableName: "filtro_proveedores",
			sequelize,
		},
		index
	);
	return FiltroProveedores;
};
