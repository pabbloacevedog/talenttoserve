// Imports
import Sequelize from 'sequelize'

// App Imports
import connection from '../setup/databaseConnection.js'
import Asesoria       from './asesoria/index.js'
import Capacitacion       from './capacitacion/index.js'
import Inscribete       from './inscribete/index.js'
import Networking       from './networking/index.js'
import OpPractica       from './op_practica/index.js'
import OpTrabajo      from './op_trabajo/index.js'
import Pais       from './pais/index.js'
import Cargo       from './cargo/index.js'
import FiltroProveedores from "./filtro_proveedores/index.js";
import Categoria       from './categoria/index.js'
import Proveedores       from './proveedores/index.js'
import Registro_publicidad       from './registro_publicidad/index.js'
import PerfilRouter       from './perfil_router/index.js'
import Perfil       from './perfil/index.js'
import Router       from './router/index.js'
import Usuario       from './usuario/index.js'

const models = {
	PerfilRouter: PerfilRouter(connection),
	Perfil: Perfil(connection),
	Router: Router(connection),
	Asesoria: Asesoria(connection),
	Capacitacion: Capacitacion(connection),
	Inscribete: Inscribete(connection),
	Networking: Networking(connection),
	OpPractica: OpPractica(connection),
	OpTrabajo: OpTrabajo(connection),
	Proveedores: Proveedores(connection),
	Pais: Pais(connection),
	Cargo: Cargo(connection),
	FiltroProveedores: FiltroProveedores(connection),
	Categoria: Categoria(connection),
	Registro_publicidad: Registro_publicidad(connection),
	Usuario: Usuario(connection),
};

Object.keys(models).forEach((modelName) => {
	if ('associate' in models[modelName]) {
		models[modelName].associate(models)
	}
})

models.sequelize = connection
models.Sequelize = Sequelize

export default models
