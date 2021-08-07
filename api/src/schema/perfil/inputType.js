// Imports
import {GraphQLInputObjectType , GraphQLString ,GraphQLInt, GraphQLBoolean, GraphQLList} from 'graphql'
import PerfilType from './type'
// Perfil type
const PerfilList = new GraphQLInputObjectType ({
	name: 'PerfilList',
	description: '...',
	fields: () => ({
		id_perfil: {
			type: GraphQLInt
		},
		nombre:{
			type: GraphQLString
		},
		descripcion:{
			type: GraphQLString
		},
        path_default: {
            type: GraphQLString
        },
		estado:{
			type: GraphQLBoolean
        },
        id:{
            type: PerfilList
        }
	})
})

export default PerfilList