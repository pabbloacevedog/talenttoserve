const state = {
    error: null,
    pending: false,
    isFetching: false,
	alerta : false,
	datosMenu:{}
}

const actions = {

    getDatos({commit}) {
		try {
			const rutas = JSON.parse(localStorage.getItem('menu'))
			commit('DATOS_SUCCESS', rutas)
		}
		catch(error) {
			console.error(error);
			commit('DATOS_ERROR', error)
		}
    }
}

const mutations = {

    DATOS_SUCCESS: (state, data) => {
        state.pending = false
		state.error = null
        state.datosMenu = data
    },

    DATOS_ERROR: (state, err) => {
        state.error = err
    }
}

const getters = {
    getMenu: state => {
        return state.datosMenu
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
