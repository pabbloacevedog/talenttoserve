// Imports
import Sequelize from 'sequelize'

// App Imports
import connection from '../setup/databaseConnection.js'
import Asesoria       from './asesoria/index.js'
import Capacitacion       from './capacitacion/index.js'
import Inscribete       from './inscribete/index.js'
import Networking       from './networking/index.js'
import Op_practica       from './op_practica/index.js'
import Op_trabajo      from './op_trabajo/index.js'
import Pais       from './pais/index.js'
import Publicar_pro       from './publicar_pro/index.js'
import Registro_publicidad       from './registro_publicidad/index.js'

import Usuario       from './usuario/index.js'

const models = {
    Asesoria         :   Asesoria(connection),
    Capacitacion     :   Capacitacion(connection), 
    Inscribete       :   Inscribete(connection),    
    Networking       :   Networking(connection),
    Op_practica      :   Op_practica(connection),       
    Op_trabajo       :   Op_trabajo(connection),          
    Publicar_pro     :   Publicar_pro(connection),    
    Pais             :   Pais(connection),          
    Registro_publicidad :   Registro_publicidad(connection),        
	Usuario          :   Usuario(connection),     
}

Object.keys(models).forEach((modelName) => {
	if ('associate' in models[modelName]) {
		models[modelName].associate(models)
	}
})

models.sequelize = connection
models.Sequelize = Sequelize

export default models
