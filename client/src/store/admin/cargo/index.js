import {
	GET_CARGO_QUERY,
	GET_PROVEEDORES_QUERY,
	CREAR_CARGO_MUTATION,
	EDITAR_CARGO_MUTATION,
	ELIMINAR_CARGO_MUTATION
} from "./consultas";

const state = {
	error: null,
	pending: false,
	isFetching: false,
	alerta: false,
	dataGS: {},
	dataFP:{},
	creado: "",
	editado: "",
	eliminado: ""
};

const actions = {
	async cargarCargo({ commit }) {
		commit("CARGAR");
		await this.$apollo.defaultClient.resetStore();
		await this.$apollo.defaultClient
			.query({
				query: GET_CARGO_QUERY
			})
			.then(response => {
				const datos = response.data.cargos;

				commit("CARGAR_SUCCESS", datos);
			})
			.catch(response => {
				commit("CARGAR_ERROR", response);
			});
	},
	async cargarFiltroProveedores({ commit }) {
		commit("CARGAR_FILTRO");
		await this.$apollo.defaultClient.resetStore();
		await this.$apollo.defaultClient
			.query({
				query: GET_PROVEEDORES_QUERY
			})
			.then(response => {
				const datos = response.data.filtros_proveedores;

				commit("CARGAR_FILTRO_SUCCESS", datos);
			})
			.catch(response => {
				commit("CARGAR_FILTRO_ERROR", response);
			});
	},
	async crearCargo({ commit }, credenciales) {
		commit("CREAR");
		const { titulo, descripcion, estado } = credenciales;
		await this.$apollo.defaultClient
			.mutate({
				mutation: CREAR_CARGO_MUTATION,
				variables: { titulo, descripcion, estado }
			})
			.then(response => {
				const datos = response.data.createCargo.creado;
				commit("CREAR_SUCCESS", datos);
			})
			.catch(response => {
				console.log("response", response);
				commit("CREAR_ERROR", response);
			});
	},
	async editarCargo({ commit }, credenciales) {
		commit("EDITAR");
		const { codigo, titulo, descripcion, estado } = credenciales;
		await this.$apollo.defaultClient
			.mutate({
				mutation: EDITAR_CARGO_MUTATION,
				variables: { codigo, titulo, descripcion, estado }
			})
			.then(response => {
				const datos = response.data.editCargo.editado;
				commit("EDITAR_SUCCESS", datos);
			})
			.catch(response => {
				console.log("response", response);
				commit("EDITAR_ERROR", response);
			});
	},
	async eliminarCargo({ commit }, credenciales) {
		commit("ELIMINAR");
		const { id } = credenciales;
		await this.$apollo.defaultClient
			.mutate({
				mutation: ELIMINAR_CARGO_MUTATION,
				variables: { id }
			})
			.then(response => {
				const datos = response.data.removeCargo.eliminado;
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
	CARGAR_FILTRO: state => {
		state.pending = true;
	},
	CARGAR_FILTRO_SUCCESS: (state, data) => {
		state.pending = false;
		state.error = null;
		state.dataFP = data;
	},

	CARGAR_FILTRO_ERROR: (state, err) => {
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
	getDataFiltros: state => {
		return state.dataFP;
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
