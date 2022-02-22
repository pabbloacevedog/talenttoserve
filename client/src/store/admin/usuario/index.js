import {
	GET_USUARIO_QUERY,
	GET_NUSUARIO_QUERY,
	GET_SELECTOR_QUERY,
	CREAR_USUARIO_MUTATION,
	EDITAR_USUARIO_MUTATION,
	ELIMINAR_USUARIO_MUTATION
} from "./consultas";

const state = {
	error: null,
	pending: false,
	isFetching: false,
	alerta: false,
	dataGS: {},
	dataSelector: [],
	creado: "",
	editado: "",
	eliminado: "",
	n_usuarios: ""
};

const actions = {
	async cargarUsuario({ commit }) {
		commit("CARGAR");
		await this.$apollo.defaultClient.resetStore();
		await this.$apollo.defaultClient
			.query({
				query: GET_USUARIO_QUERY
			})
			.then(response => {
				const datos = response.data.Usuarios;

				commit("CARGAR_SUCCESS", datos);
			})
			.catch(response => {
				commit("CARGAR_ERROR", response);
			});
	},
	async contarUsuarios({ commit }) {
		commit("CONTAR");
		await this.$apollo.defaultClient.resetStore();
		await this.$apollo.defaultClient
			.query({
				query: GET_NUSUARIO_QUERY
			})
			.then(response => {
				const datos = response.data.ContarUsuarios;
				commit("CONTAR_SUCCESS", datos);
			})
			.catch(response => {
				commit("CONTAR_ERROR", response);
			});
	},
	async cargarSelector({ commit }, cred) {
		const { tipo } = cred;
		commit("SELECTOR");
		await this.$apollo.defaultClient.resetStore();
		await this.$apollo.defaultClient
			.query({
				query: GET_SELECTOR_QUERY,
				variables: {
					tipo
				}
			})
			.then(response => {
				const datos = response.data.Selectores;

				commit("SELECTOR_SUCCESS", datos);
			})
			.catch(response => {
				commit("SELECTOR_ERROR", response);
			});
	},
	async crearUsuario({ commit }, credenciales) {
		commit("CREAR");
		const {
			email,
			id_perfil,
			nombre,
			password,
			telefono,
			id_pais,
			nombre_empresa,
			cargo,
			producto_empresa,
			universidad,
			carrera,
			suscrito_mail,
			estado
		} = credenciales;
		await this.$apollo.defaultClient
			.mutate({
				mutation: CREAR_USUARIO_MUTATION,
				variables: {
					email,
					id_perfil,
					nombre,
					password_new: password,
					telefono,
					id_pais,
					nombre_empresa,
					cargo,
					producto_empresa,
					universidad,
					carrera,
					suscrito_mail,
					estado
				}
			})
			.then(response => {
				const datos = response.data.CrearUsuario.creado;
				commit("CREAR_SUCCESS", datos);
			})
			.catch(response => {
				console.log("response", response);
				commit("CREAR_ERROR", response);
			});
	},
	async editarUsuario({ commit }, credenciales) {
		commit("EDITAR");
		const {
			usuario_id,
			email,
			id_perfil,
			nombre,
			telefono,
			id_pais,
			nombre_empresa,
			cargo,
			producto_empresa,
			universidad,
			carrera,
			suscrito_mail,
			estado
		} = credenciales;
		await this.$apollo.defaultClient
			.mutate({
				mutation: EDITAR_USUARIO_MUTATION,
				variables: {
					usuario_id,
					email,
					id_perfil,
					nombre,
					telefono,
					id_pais,
					nombre_empresa,
					cargo,
					producto_empresa,
					universidad,
					carrera,
					suscrito_mail,
					estado
				}
			})
			.then(response => {
				const datos = response.data.ActualizarUsuario.actualizado;
				commit("EDITAR_SUCCESS", datos);
			})
			.catch(response => {
				console.log("response", response);
				commit("EDITAR_ERROR", response);
			});
	},
	async eliminarUsuario({ commit }, credenciales) {
		commit("ELIMINAR");
		const { id } = credenciales;
		await this.$apollo.defaultClient
			.mutate({
				mutation: ELIMINAR_USUARIO_MUTATION,
				variables: { id }
			})
			.then(response => {
				const datos = response.data.removeUsuario.eliminado;
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
	CONTAR: state => {
		state.pending = true;
	},
	CONTAR_SUCCESS: (state, data) => {
		state.pending = false;
		state.error = null;
		state.n_usuarios = data;
	},

	CONTAR_ERROR: (state, err) => {
		state.error = err;
	},
	SELECTOR: state => {
		state.pending = true;
	},
	SELECTOR_SUCCESS: (state, data) => {
		state.pending = false;
		state.error = null;
		state.dataSelector = data;
	},

	SELECTOR_ERROR: (state, err) => {
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
	getNUsuarios: state => {
		return state.n_usuarios;
	},
	getSelector: state => {
		return state.dataSelector;
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
