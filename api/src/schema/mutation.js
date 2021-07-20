// Imports
import {GraphQLObjectType} from 'graphql'

// App Imports
import * as usuario from './usuario/fields/mutations.js'
import * as asesoria from './asesoria/fields/mutations'
import * as capacitacion from './capacitacion/fields/mutations'
import * as inscribete from './inscribete/fields/mutations'
import * as perfil from './perfil/fields/mutations'
import * as networking from './networking/fields/mutations'
import * as op_practica from './op_practica/fields/mutations'
import * as op_trabajo from './op_trabajo/fields/mutations'
// Mutation
const mutation = new GraphQLObjectType({
	name: 'mutations',
	description: '...',

	fields: () => ({
		...usuario,
        ...asesoria,
        ...capacitacion,
        ...inscribete,
        ...perfil, 
        ...networking,
        ...op_practica,
        ...op_trabajo
	})
})

export default mutation
