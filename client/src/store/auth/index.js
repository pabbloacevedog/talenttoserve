import {
	LOGIN_QUERY,
	FORGET_QUERY
	// GET_ALL_PASS_USERS,UPDATE_PASSWORD_USER_MUTATION
} from "./consultas";
import {getUserFromToken} from '@utils/authService'
import {crearRouter, crearRutas} from '@utils/crearRouter'
import CryptoJS from 'crypto-js'
var routers = []
var rutes= []
// var pass = process.env.PASSPHRASE;
var isadmin = localStorage.getItem("perm")
var isdm = isadmin ? CryptoJS.AES.decrypt(isadmin, process.env.PASSPHRASE) : false
const state = {
    isLogin: !!localStorage.getItem("token"),
    isAdmin: isdm,
    error: null,
    pending: false,
    editado:false,
    isFetching: false,
	alerta : false,
	sendForget:false,
	datosUsuario:{},
    allPass:{},
	avatar:''
}
const actions = {
	async login({ commit }, credenciales) {
		commit("LOGIN");
		var email = credenciales.email;
		var password = credenciales.password;
		var pass = process.env.PASSPHRASE;
		await this.$apollo.defaultClient
			.query({
				query: LOGIN_QUERY,
				variables: {
					email,
					password
				}
			})
			.then(response => {
				const token = response.data.userLogin.token;
				console.log("token", token);
				const data = getUserFromToken(token);
				console.log("user store", data);
				const user = data.datosUsuario;
				console.log("user store", user);
				this.datosUsuario = user;
				const rutas = data.routers;
				rutes = crearRutas(rutas);
				if (user.id_perfil == 1) {
					// var enc_perm = CryptoJS.AES.encrypt(true, pass);
					localStorage.setItem("perm", true);
				}

				var enc_path_default = CryptoJS.AES.encrypt(
					user.path_default,
					pass
				);
				localStorage.setItem("path_default", enc_path_default);
				localStorage.removeItem("token");
				// localStorage.removeItem("rutas")
				var rutes_js = JSON.stringify(rutes);
				var enc_rutes = CryptoJS.AES.encrypt(rutes_js, pass);
				localStorage.setItem("rutas", enc_rutes);
				var enc_rutas = CryptoJS.AES.encrypt(
					JSON.stringify(rutas),
					pass
				);
				localStorage.setItem("menu", enc_rutas);
				routers = crearRouter(rutas);
				this.$router.addRoutes(routers);
				// localStorage.setItem('ss_u', user.usuario_id)
				localStorage.setItem("username", user.nombre);
				localStorage.setItem("token", token);
				commit("LOGIN_SUCCESS", user);
			})
			.catch(response => {
				commit("LOGIN_ERROR", response);
			});
	},
	async forget({ commit }, credenciales) {
		commit("FORGET");
		var email = credenciales.email;
		await this.$apollo.defaultClient
			.query({
				query: FORGET_QUERY,
				variables: {
					email
				}
			})
			.then(response => {
				const data = response.data.forget;
				commit("FORGET_SUCCESS", data);
			})
			.catch(response => {
				commit("FORGET_ERROR", response);
			});
	},
	// async SetNewPass({commit}, credenciales) {
	// 	commit('UPDATEPASS')
	// 	var users = credenciales.users
	// 	await this.$apollo.defaultClient.mutate({
	// 		mutation: UPDATE_PASSWORD_USER_MUTATION,
	// 		variables: {users }
	// 	}).then(response => {
	// 		const datos = response.data.updateUsers.editado
	// 		commit('UPDATEPASS_SUCCESS', datos)
	// 	}).catch(response => {
	// 		console.log('response', response)
	// 		commit('UPDATEPASS_ERROR', response)
	// 	})
	// },
	// async getPassUsers({commit}){
	//     commit('GETPASS')
	// 	await this.$apollo.defaultClient.query({query: GET_ALL_PASS_USERS}).then(response => {
	// 		const allpass = response.data.Usuarios
	// 		commit('GETPASS_SUCCESS', allpass)
	// 	}).catch(response => {
	// 		commit('GETPASS_ERROR', response)
	// 	})
	// },
	logout({ commit }) {
		localStorage.removeItem("token");
		localStorage.removeItem("path_default");
		localStorage.removeItem("rutas");
		localStorage.removeItem("isLoadNodes");
		localStorage.removeItem("menu");
		localStorage.removeItem("src_avatar");
		localStorage.removeItem("username");
		localStorage.removeItem("ss_u");
		localStorage.removeItem("perm");
		commit("LOGOUT");
		location.reload();
	}
};

const mutations = {
	LOGIN: state => {
		state.pending = true;
	},

	LOGIN_SUCCESS: (state, data) => {
		state.isLogin = true;
		state.pending = false;
		state.error = null;
		state.datosUsuario = data;
	},
	FORGET: state => {
		state.pending = true;
	},

	FORGET_SUCCESS: (state, data) => {
		state.sendForget = true;
	},

	LOGOUT: state => {
		state.isLogin = false;
	},

	LOGIN_ERROR: (state, err) => {
		state.isLogin = false;
		state.error = err;
	},
	GETPASS: state => {
		state.pending = true;
	},

	GETPASS_SUCCESS: (state, data) => {
		state.pending = false;
		state.error = null;
		state.allPass = data;
	},

	GETPASS_ERROR: (state, err) => {
		state.error = err;
	},
	UPDATEPASS: state => {
		state.pending = true;
	},

	UPDATEPASS_SUCCESS: (state, data) => {
		state.pending = false;
		state.error = null;
		state.editado = data;
	},

	UPDATEPASS_ERROR: (state, err) => {
		state.error = err;
	}
};

const getters = {
	isLogin: state => {
		return state.isLogin;
	},
	sendForget: state => {
		return state.sendForget;
	},
	isAdmin: state => {
		return state.isAdmin;
	},
	getAllPass: state => {
		return state.allPass;
	},
	getUpdatePass: state => {
		return state.editado;
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
}
