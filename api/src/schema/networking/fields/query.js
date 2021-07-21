// Imports
import {GraphQLString, GraphQLList, GraphQLBoolean} from 'graphql'

// App Imports
import NetworkingType from '../type'
import {getAll, getById} from '../resolvers'

// Users All
export const networkings = {
    type: new GraphQLList(NetworkingType),
	resolve: getAll
}

// user By ID
export const networking = {
	type: new GraphQLList(NetworkingType),
	resolve: getById
}
