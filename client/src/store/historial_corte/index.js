import {GET_HISTORIAL_CORTE_QUERY,  ELIMINAR_HISTORIAL_CORTE_MUTATION, GET_CORTES_ALL_QUERY, GET_CORTES_GRAFICO_QUERY, GET_PLANCHAS_GRAFICO_QUERY, GET_TOTAL_PLANCHAS_QUERY,GET_MATERIAL_MAS_USADO_QUERY} from './consultas'

const state = {
    error: null,
    pending: false,
    isFetching: false,
	alerta : false,
	dataGS:{},
    creado:'',
    cortes_all:'',
    cortes_grafico:'',
    planchas_grafico:'',
    planchas_all:'',
    material_mas_usado:'',
    eliminado:''

}

const actions = {

    async cargarHistorialCorte({commit}) {
        commit('CARGAR')
        await this.$apollo.defaultClient.resetStore()
		await this.$apollo.defaultClient.query({
            query: GET_HISTORIAL_CORTE_QUERY,
            variables: { estado:true }
		}).then(response => {
            const datos = response.data.historialcortes

			commit('CARGAR_SUCCESS', datos)

		}).catch(response => {
			commit('ERROR', response)
		})
    },
    async cargarCortesAll({commit}) {
        commit('CARGAR_CORTES')
        await this.$apollo.defaultClient.resetStore()
		await this.$apollo.defaultClient.query({
            query: GET_CORTES_ALL_QUERY
		}).then(response => {
            const datos = response.data.cortes_all
			commit('CARGAR_CORTES_SUCCESS', datos)

		}).catch(response => {
			commit('ERROR', response)
		})
    },
    async cargarCortesGrafico({commit}) {
        commit('CARGAR_CORTES_GRAFICO')
        await this.$apollo.defaultClient.resetStore()
		await this.$apollo.defaultClient.query({
            query: GET_CORTES_GRAFICO_QUERY
		}).then(response => {
            const datos = response.data.cortes_grafico

			commit('CARGAR_CORTES_GRAFICO_SUCCESS', datos)

		}).catch(response => {
			commit('ERROR', response)
		})
    },
    async cargarPlanchasGrafico({commit}) {
        commit('CARGAR_PLANCHAS_GRAFICO')
        await this.$apollo.defaultClient.resetStore()
		await this.$apollo.defaultClient.query({
            query: GET_PLANCHAS_GRAFICO_QUERY
		}).then(response => {
            const datos = response.data.planchas_grafico

			commit('CARGAR_PLANCHAS_GRAFICO_SUCCESS', datos)

		}).catch(response => {
			commit('ERROR', response)
		})
    },
    async cargarPlanchasAll({commit}) {
        commit('CARGAR_PLANCHAS')
        await this.$apollo.defaultClient.resetStore()
		await this.$apollo.defaultClient.query({
            query: GET_TOTAL_PLANCHAS_QUERY
		}).then(response => {
            const datos = response.data.total_planchas

			commit('CARGAR_PLANCHAS_SUCCESS', datos)
		}).catch(response => {
			commit('ERROR', response)
		})
    },
    async cargarMaterialMasUsado({commit}) {
        commit('CARGAR_MATERIAL_MAS_USADO')
        await this.$apollo.defaultClient.resetStore()
		await this.$apollo.defaultClient.query({
            query: GET_MATERIAL_MAS_USADO_QUERY
		}).then(response => {
            const datos = response.data.material_mas_usado

			commit('CARGAR_MATERIAL_MAS_USADO_SUCCESS', datos)
		}).catch(response => {
			commit('ERROR', response)
		})
	},
    async eliminarHistorialCorte({commit}, credenciales) {
		commit('ELIMINAR')
		const {id } = credenciales
		await this.$apollo.defaultClient.mutate({
			mutation: ELIMINAR_HISTORIAL_CORTE_MUTATION,
			variables: {id }
		}).then(response => {
			const datos = response.data.removeHistorialCorte.eliminado
			commit('ELIMINAR_SUCCESS', datos)
		}).catch(response => {
			console.log('response', response)
			commit('ELIMINAR_ERROR', response)
		})
    }
}

const mutations = {

    CARGAR: (state) => {
        state.pending = true
    },
    CARGAR_SUCCESS: (state, data) => {
        state.pending = false
		state.error=null
		state.dataGS = data
    },
    CARGAR_CORTES: (state) => {
        state.pending = true
    },
    CARGAR_CORTES_SUCCESS: (state, data) => {
        state.pending = false
		state.error=null
		state.cortes_all = data
    },
    CARGAR_CORTES_GRAFICO: (state) => {
        state.pending = true
    },
    CARGAR_CORTES_GRAFICO_SUCCESS: (state, data) => {
        state.pending = false
		state.error=null
		state.cortes_grafico = data
    },
    CARGAR_PLANCHAS_GRAFICO: (state) => {
        state.pending = true
    },
    CARGAR_PLANCHAS_GRAFICO_SUCCESS: (state, data) => {
        state.pending = false
		state.error=null
		state.planchas_grafico = data
    },
    CARGAR_PLANCHAS: (state) => {
        state.pending = true
    },
    CARGAR_PLANCHAS_SUCCESS: (state, data) => {
        state.pending = false
		state.error=null
		state.planchas_all = data
    },
    CARGAR_MATERIAL_MAS_USADO: (state) => {
        state.pending = true
    },
    CARGAR_MATERIAL_MAS_USADO_SUCCESS: (state, data) => {
        state.pending = false
		state.error=null
		state.material_mas_usado = data
    },
    ELIMINAR: (state) => {
        state.pending = true
    },
    ELIMINAR_SUCCESS: (state, data) => {
        state.pending = false
		state.error=null
		state.eliminado = data
    },
    ELIMINAR_ERROR: (state, err) => {
        state.error = err
    },
    ERROR: (state, err) => {
        state.error = err
	},
}

const getters = {
    getData: state => {
        return state.dataGS
    },
    getCortesAll: state => {
        return state.cortes_all
    },
    getCortesGrafico: state => {
        return state.cortes_grafico
    },
    getPlanchasGrafico: state => {
        return state.planchas_grafico
    },
    getPlanchasAll: state => {
        return state.planchas_all
    },
    getMaterialMasUsado: state => {
        return state.material_mas_usado
	},
    getEliminado: state => {
        return state.eliminado
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
