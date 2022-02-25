import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
// import { apollo }  from '../boot/apollo'

import Auth from './auth'
import Registry from './registry'
import Menu from './menu'
import Asesoria from './admin/asesoria'
import Cargo from "./admin/cargo";
import Capacitacion from './admin/capacitacion'
import Inscribete from './admin/inscribete'
import Networking from './admin/networking'
import OpTrabajo from './admin/op_trabajo'
import OpPractica from './admin/op_practica'
import Proveedor from './admin/proveedor'
import Usuario from './admin/usuario'
import Perfil from './admin/perfiles'
import Pais from "./admin/pais";

Vue.use(Vuex)
const vuexLocalStorage = new VuexPersist({
	key: 'session', // The key to store the state on in the storage provider.
	storage: window.sessionStorage, // or window.sessionStorage or localForage
	// Function that passes the state and returns the state with only the objects you want to store.
	reducer: state => ({
		session: localStorage.getItem("token")
	  // getRidOfThisModule: state.getRidOfThisModule (No one likes it.)
	}),
	// Function that passes a mutation and lets you decide if it should update the state in localStorage.
	// filter: mutation => (mutation.type == 'FETCH_MENU_SUCCESS' )
  })
export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
		plugins: [vuexLocalStorage.plugin],
		modules: {
			Auth: Auth,
			Registry: Registry,
			Menu: Menu,
			Asesoria,
			Cargo,
			Capacitacion,
			Inscribete,
			Networking,
			OpPractica,
			OpTrabajo,
			Proveedor,
			Usuario,
			Perfil,
			Pais
		},
		state: {},
		mutations: {
			// agregarElemento (state, obj) {
			// 	state.postulantesConfirmados.push(obj)
			// },
			// eliminarElemento (state, obj) {
			// 	var index = state.postulantesConfirmados.indexOf(obj)
			// 	state.postulantesConfirmados.splice(index, 1)
			// },
			// vaciarLista (state){
			// 	state.postulantesConfirmados = []
			// }
		},
		actions: {
			// confirmarPostulante ({ commit }, obj) {
			// 	commit('agregarElemento', obj)
			// },
			// eliminarPostulanteConfirmado ({ commit }, obj){
			// 	commit('eliminarElemento', obj)
			// },
			// vaciarListaPostulantes ({ commit }){
			// 	commit('vaciarLista')
			// }
		},
		strict: false
  });

  return Store
}
