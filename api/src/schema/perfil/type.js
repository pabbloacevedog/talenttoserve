// Imports
import {GraphQLObjectType, GraphQLString ,GraphQLInt, GraphQLBoolean, GraphQLList} from 'graphql'

// Perfil type
const PerfilType = new GraphQLObjectType({
	name: 'Perfil',
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
        value:{
			type: GraphQLBoolean
        },
        creado:{
			type: GraphQLBoolean
        },
        editado:{
			type: GraphQLBoolean
        },
        eliminado:{
			type: GraphQLBoolean
        },
        id:{
            type: new GraphQLList(GraphQLString)
        }
	})
})

export default PerfilType

