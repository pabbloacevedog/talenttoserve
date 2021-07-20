// Imports
import {GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLInt} from 'graphql'
// User Login type
const routerType = new GraphQLObjectType({
  name: 'router',
  description: 'rutas de la aplicacion',

  fields: () => ({
    path: { type: GraphQLString },
    component: { type: GraphQLString },
    name: { type: GraphQLString },
    value:{
        type: GraphQLBoolean
    },
    estado:{
        type: GraphQLInt
    },
    carpet: { type: GraphQLString },
    leaf: { type: GraphQLBoolean },
    children: { type: GraphQLString },
	enabled: { type: GraphQLBoolean },
	order_menu: { type: GraphQLInt },
	icon: { type: GraphQLString }
  })
})

export default routerType
