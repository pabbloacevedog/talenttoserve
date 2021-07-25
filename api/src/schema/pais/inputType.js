// Imports
import {GraphQLInputObjectType , GraphQLString ,GraphQLInt, GraphQLBoolean, GraphQLList} from 'graphql'
import PaisType from './type'
// Pais type
const PaisList = new GraphQLInputObjectType ({
	name: 'PaisList',
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
        codigo:{
            type: PaisList
        }
	})
})

export default PaisList