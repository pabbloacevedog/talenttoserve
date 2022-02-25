// Imports
import {GraphQLString, GraphQLList, GraphQLBoolean} from 'graphql'

// App Imports
import CargoType from '../type'
import { getAll, getById, getAllFiltros } from "../resolvers";

// Users All
export const cargos = {
    type: new GraphQLList(CargoType),
	resolve: getAll
}
export const filtros_proveedores = {
	type: new GraphQLList(CargoType),
	resolve: getAllFiltros,
};
// user By ID
export const cargo = {
	type: new GraphQLList(CargoType),
	resolve: getById
}
