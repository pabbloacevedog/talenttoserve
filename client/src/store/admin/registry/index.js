import {CREATE_USER_MUTATION} from './consultas'
import {getUserFromToken} from '@utils/authService'
import {crearRouter, crearRutas} from '@utils/crearRouter'
var routers = []
var rutes= []

const state = {
    isLogin: !!localStorage.getItem("token"),
    error: null,
    pending: false,
    isFetching: false,
	alerta : false,
	datosUsuario:{},
	avatar:''
}

const actions = {

    async registry({commit}, credenciales) {
		commit('REGISTRY')
		const {nombre, apellido , usuario, email, rut, perfil, telefono, password} = credenciales
		await this.$apollo.defaultClient.mutate({
			mutation: CREATE_USER_MUTATION,
			variables: {nombre, apellido , usuario, email, rut, id_perfil:perfil, telefono, password}
		}).then(response => {

			const token = response.data.userSignup.token
            const data = getUserFromToken(token)
            debugger
			const user = data.datosUsuario
			this.datosUsuario = user
            if(user.avatar){
                localStorage.setItem('src_avatar', this.avatar)
            }
            else{
                this.$avatar = this.$avatar_default
            }
			const rutas = data.routers
			rutes = crearRutas(rutas)

			localStorage.removeItem("token")
			localStorage.removeItem("rutas")
			localStorage.setItem('rutas', JSON.stringify(rutes))
			localStorage.setItem('menu', JSON.stringify(rutas))
			routers = crearRouter(rutas)
			this.$router.addRoutes(routers)
			localStorage.setItem('token', token)
			this.state.Auth.isLogin = true
			this.state.Auth.datosUsuario = user
			commit('REGISTRY_SUCCESS', user)


		}).catch(response => {
			console.log('response', response)
			commit('REGISTRY_ERROR', response)
		})
    }
}

const mutations = {

    REGISTRY: (state) => {
        state.pending = true
    },

    REGISTRY_SUCCESS: (state, data) => {
        state.isLogin = true
        state.pending = false
		state.error=null
		state.datosUsuario = data
    },

    LOGOUT: (state) => {
        state.isLogin = false
    },

    REGISTRY_ERROR: (state, err) => {
        state.isLogin = false
        state.error = err
    }
}

const getters = {
    isLogin: state => {
        return state.isLogin
    },
    error: state => {
        return state.error
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
