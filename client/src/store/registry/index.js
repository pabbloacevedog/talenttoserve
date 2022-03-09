import { CREATE_USER_MUTATION } from "./consultas";
import { getUserFromToken } from "@utils/authService";
import { crearRouter, crearRutas } from "@utils/crearRouter";
var routers = [];
var rutes = [];
import CryptoJS from "crypto-js";
const state = {
	isLogin: !!localStorage.getItem("token"),
	error: null,
	pending: false,
	isFetching: false,
	alerta: false,
	datosUsuario: {},
	avatar: ""
};

const actions = {
	async registry({ commit }, credenciales) {
		console.log("regustry", credenciales);
		commit("REGISTRY");
		await this.$apollo.defaultClient
			.mutate({
				mutation: CREATE_USER_MUTATION,
				variables: credenciales
			})
			.then(response => {
				const token = response.data.userSignup.token;
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
				var pass = process.env.PASSPHRASE;
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
				// console.log("token", token);
				// const data = getUserFromToken(token);
				// console.log("user store", data);
				// const user = data.datosUsuario;
				// console.log("user store", user);
				// this.datosUsuario = user;
				// const rutas = data.routers;
				// rutes = crearRutas(rutas);
				// if (user.id_perfil == 1) {
				// 	// var enc_perm = CryptoJS.AES.encrypt(true, pass);
				// 	localStorage.setItem("perm", true);
				// }
				// var pass = process.env.PASSPHRASE;
				// var enc_path_default = CryptoJS.AES.encrypt(
				// 	user.path_default,
				// 	pass
				// );
				// localStorage.setItem("path_default", enc_path_default);
				// localStorage.removeItem("token");
				// // localStorage.removeItem("rutas")
				// var rutes_js = JSON.stringify(rutes);
				// var enc_rutes = CryptoJS.AES.encrypt(rutes_js, pass);
				// localStorage.setItem("rutas", enc_rutes);
				// var enc_rutas = CryptoJS.AES.encrypt(
				// 	JSON.stringify(rutas),
				// 	pass
				// );
				// localStorage.setItem("menu", enc_rutas);
				// routers = crearRouter(rutas);
				// this.$router.addRoutes(routers);
				// // localStorage.setItem('ss_u', user.usuario_id)
				// localStorage.setItem("username", user.nombre);
				// localStorage.setItem("token", token);
				commit("REGISTRY_SUCCESS", user);
			})
			.catch(response => {
				console.log("response", response);
				commit("REGISTRY_ERROR", response);
			});
	}
};

const mutations = {
	REGISTRY: state => {
		state.pending = true;
	},

	REGISTRY_SUCCESS: (state, data) => {
		state.isLogin = true;
		state.pending = false;
		state.error = null;
		state.datosUsuario = data;
	},

	LOGOUT: state => {
		state.isLogin = false;
	},

	REGISTRY_ERROR: (state, err) => {
		state.isLogin = false;
		state.error = err;
	}
};

const getters = {
	isLogin: state => {
		return state.isLogin;
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
