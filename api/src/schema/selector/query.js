// Imports
import {GraphQLString, GraphQLList} from 'graphql'

// App Imports
import SelectorType from './type.js'
import {getSelect} from './resolvers.js'

// Selectors All
export const Selectores = {
    type: new GraphQLList(SelectorType),
    args: {
		tipo: {
            name: 'tipo',
			type: GraphQLString
		}
	},
    resolve: getSelect
}