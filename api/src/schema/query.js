// Imports
import {GraphQLObjectType} from 'graphql'

// App Imports
import * as usuario from './usuario/fields/query.js'
import * as login from './login/fields/query.js'
import * as asesoria from './asesoria/fields/query'
import * as capacitacion from './capacitacion/fields/query'
import * as proveedor from './proveedores/fields/query'
import * as inscribete from './inscribete/fields/query'
import * as perfil from './perfil/fields/query'
import * as networking from './networking/fields/query'
import * as OpPractica from './op_practica/fields/query'
import * as OpPrabajo from './op_trabajo/fields/query'
console.info(`INFO  - Cargando querys.`)
// Querys
const query = new GraphQLObjectType({
	name: 'query',
	description: '...',

	fields: () => ({
		...usuario,
		...login,
        ...asesoria,
        ...capacitacion,
        ...proveedor,
        ...inscribete,
        ...perfil, 
        ...networking,
        ...OpPractica,
        ...OpPrabajo
	})
})

export default query
