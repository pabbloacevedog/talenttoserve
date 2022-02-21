import {
	GET_INSCRIBETE_QUERY,
	CREAR_INSCRIBETE_MUTATION,
	EDITAR_INSCRIBETE_MUTATION,
	ELIMINAR_INSCRIBETE_MUTATION
} from "./consultas";

const state = {
	error: null,
	pending: false,
	isFetching: false,
	alerta: false,
	dataGS: {},
	creado: "",
	editado: "",
	eliminado: ""
};

const actions = {
	async cargarInscribete({ commit }) {
		commit("CARGAR");
		await this.$apollo.defaultClient.resetStore();
		await this.$apollo.defaultClient
			.query({
				query: GET_INSCRIBETE_QUERY
			})
			.then(response => {
				const datos = response.data.inscribetes;

				commit("CARGAR_SUCCESS", datos);
			})
			.catch(response => {
				commit("CARGAR_ERROR", response);
			});
	},
	async crearInscribete({ commit }, credenciales) {
		commit("CREAR");

		const { titulo, descripcion, link, boton, file, estado } = credenciales;
		// debugger
		await this.$apollo.defaultClient
			.mutate({
				mutation: CREAR_INSCRIBETE_MUTATION,
				variables: { titulo, descripcion, link, boton, file, estado }
			})
			.then(response => {
				// debugger
				const datos = response.data.createInscribete.creado;
				commit("CREAR_SUCCESS", datos);
			})
			.catch(response => {
				console.log("response", response);
				commit("CREAR_ERROR", response);
			});
	},
	async editarInscribete({ commit }, credenciales) {
		commit("EDITAR");
		const {
			codigo,
			titulo,
			descripcion,
			link,
			boton,
			file,
			estado
		} = credenciales;
		await this.$apollo.defaultClient
			.mutate({
				mutation: EDITAR_INSCRIBETE_MUTATION,
				variables: {
					codigo,
					titulo,
					descripcion,
					link,
					boton,
					file,
					estado
				}
			})
			.then(response => {
				const datos = response.data.editInscribete.editado;
				commit("EDITAR_SUCCESS", datos);
			})
			.catch(response => {
				console.log("response", response);
				commit("EDITAR_ERROR", response);
			});
	},
	async eliminarInscribete({ commit }, credenciales) {
		commit("ELIMINAR");
		const { id } = credenciales;
		await this.$apollo.defaultClient
			.mutate({
				mutation: ELIMINAR_INSCRIBETE_MUTATION,
				variables: { id }
			})
			.then(response => {
				const datos = response.data.removeInscribete.eliminado;
				commit("ELIMINAR_SUCCESS", datos);
			})
			.catch(response => {
				console.log("response", response);
				commit("ELIMINAR_ERROR", response);
			});
	}
};

const mutations = {
	CARGAR: state => {
		state.pending = true;
	},
	CARGAR_SUCCESS: (state, data) => {
		state.pending = false;
		state.error = null;
		state.dataGS = data;
	},

	CARGAR_ERROR: (state, err) => {
		state.error = err;
	},
	CREAR: state => {
		state.pending = true;
	},
	CREAR_SUCCESS: (state, data) => {
		state.pending = false;
		state.error = null;
		state.creado = data;
	},
	CREAR_ERROR: (state, err) => {
		state.error = err;
	},
	EDITAR: state => {
		state.pending = true;
	},
	EDITAR_SUCCESS: (state, data) => {
		state.pending = false;
		state.error = null;
		state.editado = data;
	},
	EDITAR_ERROR: (state, err) => {
		state.error = err;
	},
	ELIMINAR: state => {
		state.pending = true;
	},
	ELIMINAR_SUCCESS: (state, data) => {
		state.pending = false;
		state.error = null;
		state.eliminado = data;
	},
	ELIMINAR_ERROR: (state, err) => {
		state.error = err;
	}
};

const getters = {
	getData: state => {
		return state.dataGS;
	},
	getCreado: state => {
		return state.creado;
	},
	getEditado: state => {
		return state.editado;
	},
	getEliminado: state => {
		return state.eliminado;
	},
	error: state => {
		return state.error;
	}
};

export default {
	namespaced: true,
	state,
	actions,
	mutations,
	getters
};
