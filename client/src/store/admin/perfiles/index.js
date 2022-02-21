import {
	GET_PERFIL_QUERY,
	CREAR_PERFIL_MUTATION,
	GET_RUTAS_PERFIL_QUERY,
	GET_RUTAS_ALL_QUERY,
	EDITAR_PERFIL_MUTATION,
	ELIMINAR_PERFIL_MUTATION
} from "./consultas";

const state = {
	error: null,
	pending: false,
	isFetching: false,
	alerta: false,
	dataGS: {},
	rutas_all: [],
	rutas_perfil: [],
	creado: "",
	editado: "",
	eliminado: ""
};

const actions = {
	async cargarPerfil({ commit }) {
		commit("CARGAR");
		await this.$apollo.defaultClient.resetStore();
		await this.$apollo.defaultClient
			.query({
				query: GET_PERFIL_QUERY,
				variables: { estado: true }
			})
			.then(response => {
				const datos = response.data.perfils;

				commit("CARGAR_SUCCESS", datos);
			})
			.catch(response => {
				commit("CARGAR_ERROR", response);
			});
	},
	async cargarRutasPerfil({ commit }, perfil) {
		commit("CARGAR_RUTAS");
		const { id_perfil } = perfil;
		await this.$apollo.defaultClient.resetStore();
		await this.$apollo.defaultClient
			.query({
				query: GET_RUTAS_PERFIL_QUERY,
				variables: { id_perfil }
			})
			.then(response => {
				const datos = response.data.rutas_perfil;

				commit("CARGAR_RUTAS_SUCCESS", datos);
			})
			.catch(response => {
				commit("CARGAR_RUTAS_ERROR", response);
			});
	},
	async cargarRutasAll({ commit }) {
		commit("CARGAR_RUTAS_ALL");
		await this.$apollo.defaultClient.resetStore();
		await this.$apollo.defaultClient
			.query({
				query: GET_RUTAS_ALL_QUERY
			})
			.then(response => {
				const datos = response.data.rutas_all;
				commit("CARGAR_RUTAS_ALL_SUCCESS", datos);
			})
			.catch(response => {
				commit("CARGAR_RUTAS_ALL_ERROR", response);
			});
	},
	async crearPerfil({ commit }, credenciales) {
		commit("CREAR");
		const {
			nombre,
			descripcion,
			path_default,
			estado,
			rutas
		} = credenciales;
		await this.$apollo.defaultClient
			.mutate({
				mutation: CREAR_PERFIL_MUTATION,
				variables: { nombre, descripcion, path_default, estado, rutas }
			})
			.then(response => {
				const datos = response.data.createPerfil.creado;
				commit("CREAR_SUCCESS", datos);
			})
			.catch(response => {
				console.log("response", response);
				commit("CREAR_ERROR", response);
			});
	},
	async editarPerfil({ commit }, credenciales) {
		commit("EDITAR");
		const {
			id_perfil,
			nombre,
			descripcion,
			path_default,
			estado,
			rutas
		} = credenciales;
		await this.$apollo.defaultClient
			.mutate({
				mutation: EDITAR_PERFIL_MUTATION,
				variables: {
					id_perfil,
					nombre,
					descripcion,
					path_default,
					estado,
					rutas
				}
			})
			.then(response => {
				const datos = response.data.editPerfil.editado;
				commit("EDITAR_SUCCESS", datos);
			})
			.catch(response => {
				console.log("response", response);
				commit("EDITAR_ERROR", response);
			});
	},
	async eliminarPerfil({ commit }, credenciales) {
		commit("ELIMINAR");
		const { id } = credenciales;
		await this.$apollo.defaultClient
			.mutate({
				mutation: ELIMINAR_PERFIL_MUTATION,
				variables: { id }
			})
			.then(response => {
				const datos = response.data.removePerfil.eliminado;
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
	CARGAR_RUTAS: state => {
		state.pending = true;
	},
	CARGAR_RUTAS_SUCCESS: (state, data) => {
		state.pending = false;
		state.error = null;
		state.rutas_perfil = data;
	},

	CARGAR_RUTAS_ERROR: (state, err) => {
		state.error = err;
	},
	CARGAR_RUTAS_ALL: state => {
		state.pending = true;
	},
	CARGAR_RUTAS_ALL_SUCCESS: (state, data) => {
		state.pending = false;
		state.error = null;
		state.rutas_all = data;
	},

	CARGAR_RUTAS_ALL_ERROR: (state, err) => {
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
	getRutasPerfil: state => {
		return state.rutas_perfil;
	},
	getRutasAll: state => {
		return state.rutas_all;
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
