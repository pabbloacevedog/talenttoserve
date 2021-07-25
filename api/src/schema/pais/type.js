// Imports
import {GraphQLObjectType, GraphQLString ,GraphQLInt, GraphQLBoolean, GraphQLList} from 'graphql'

// Pais type
const PaisType = new GraphQLObjectType({
	name: 'Pais',
	description: '...',
	fields: () => ({
		id: {
			type: GraphQLInt
		},
		iso: {
			type: GraphQLString
		},
		nombre:{
			type: GraphQLString
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
        codigo:{
            type: new GraphQLList(GraphQLString)
        }
	})
})

export default PaisType

