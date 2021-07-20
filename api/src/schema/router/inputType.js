// Imports
import {GraphQLInputObjectType , GraphQLString ,GraphQLInt, GraphQLBoolean, GraphQLList} from 'graphql'
import RouterType from './type'
// UnidadMedida type
const RouterList = new GraphQLInputObjectType ({
	name: 'RouterList',
	description: '...',
	fields: () => ({
        path: { 
            type: GraphQLString 
        },
        component: { 
            type: GraphQLString 
        },
        name: { 
            type: GraphQLString 
        },
        value:{
            type: GraphQLBoolean
        },
        estado:{
            type: GraphQLInt
        },
        carpet: { 
            type: GraphQLString 
        },
        leaf: { 
            type: GraphQLBoolean 
        },
        children: { 
            type: GraphQLString 
        },
        enabled: { 
            type: GraphQLBoolean 
        },
        order_menu: { 
            type: GraphQLInt 
        },
        icon: { 
            type: GraphQLString 
        },
        id_perfil:{
            type: GraphQLInt
        },
        rutas:{
            type: RouterList
        }
	})
})

export default RouterList