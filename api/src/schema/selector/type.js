// Imports
import {GraphQLObjectType, GraphQLString} from 'graphql'

// SelectorType
const SelectorType = new GraphQLObjectType({
	name: 'selector',
	description: '...',
	fields: () => ({
        value:{
            type: GraphQLString
        },
        label: {
            type: GraphQLString
        }
	})
})

export default SelectorType