import {
	GET_CAPACITACION_QUERY,
	CREAR_CAPACITACION_MUTATION,
	EDITAR_CAPACITACION_MUTATION,
	ELIMINAR_CAPACITACION_MUTATION
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
	async cargarCapacitacion({ commit }) {
		commit("CARGAR");
		await this.$apollo.defaultClient.resetStore();
		await this.$apollo.defaultClient
			.query({
				query: GET_CAPACITACION_QUERY
			})
			.then(response => {
				const datos = response.data.capacitacions;

				commit("CARGAR_SUCCESS", datos);
			})
			.catch(response => {
				commit("CARGAR_ERROR", response);
			});
	},
	async crearCapacitacion({ commit }, credenciales) {
		commit("CREAR");
		debugger;
		const { titulo, descripcion, link, file, estado } = credenciales;
		await this.$apollo.defaultClient
			.mutate({
				mutation: CREAR_CAPACITACION_MUTATION,
				variables: { titulo, descripcion, link, file, estado }
			})
			.then(response => {
				const datos = response.data.createCapacitacion.creado;
				commit("CREAR_SUCCESS", datos);
			})
			.catch(response => {
				console.log("response", response);
				commit("CREAR_ERROR", response);
			});
	},
	async editarCapacitacion({ commit }, credenciales) {
		commit("EDITAR");
		const {
			codigo,
			titulo,
			descripcion,
			link,
			file,
			estado
		} = credenciales;
		await this.$apollo.defaultClient
			.mutate({
				mutation: EDITAR_CAPACITACION_MUTATION,
				variables: { codigo, titulo, descripcion, link, file, estado }
			})
			.then(response => {
				const datos = response.data.editCapacitacion.editado;
				commit("EDITAR_SUCCESS", datos);
			})
			.catch(response => {
				console.log("response", response);
				commit("EDITAR_ERROR", response);
			});
	},
	async eliminarCapacitacion({ commit }, credenciales) {
		commit("ELIMINAR");
		const { id } = credenciales;
		await this.$apollo.defaultClient
			.mutate({
				mutation: ELIMINAR_CAPACITACION_MUTATION,
				variables: { id }
			})
			.then(response => {
				const datos = response.data.removeCapacitacion.eliminado;
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
