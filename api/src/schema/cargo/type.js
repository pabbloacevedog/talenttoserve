// Imports
import {GraphQLObjectType, GraphQLString ,GraphQLInt, GraphQLBoolean, GraphQLList} from 'graphql'

// Cargo type
const CargoType = new GraphQLObjectType({
	name: 'Cargo',
	description: '...',
	fields: () => ({
		codigo: {
			type: GraphQLInt
		},
		nombre: {
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
        id:{
            type: new GraphQLList(GraphQLString)
        }
	})
})

export default CargoType

