// Imports
import {GraphQLInputObjectType , GraphQLString ,GraphQLInt, GraphQLBoolean, GraphQLList} from 'graphql'
import CargoType from './type'
// Cargo type
const CargoList = new GraphQLInputObjectType ({
	name: 'CargoList',
	description: '...',
	fields: () => ({
		codigo: {
			type: GraphQLInt
		},
		nombre: {
			type: GraphQLString
		},
        id:{
            type: CargoList
        }
	})
})

export default CargoList