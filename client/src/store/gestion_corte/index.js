import {GUARDAR_CORTE_MUTATION} from './consultas'

const state = {
    error: null,
    pending: false,
    isFetching: false,
	alerta : false,
	dataGS:{},
    creado:'',
    editado:'',
    eliminado:''

}

const actions = {

    async guardarCortes({commit}, credenciales) {
		commit('GUARDAR_CORTE')
		const {material_corte,unidad_medida, grosor_sierra , alto_plancha, ancho_plancha, area_plancha, area_plancha_utilizada, area_plancha_restante, total_cortes, parametros } = credenciales
		await this.$apollo.defaultClient.mutate({
			mutation: GUARDAR_CORTE_MUTATION,
			variables: {material_corte,unidad_medida, grosor_sierra , alto_plancha, ancho_plancha, area_plancha, area_plancha_utilizada, area_plancha_restante, total_cortes, parametros: JSON.stringify(parametros) }
		}).then(response => {
			const datos = response.data.guardarCorte.creado
			commit('GUARDAR_CORTE_SUCCESS', datos)
		}).catch(response => {
			console.log('response', response)
			commit('GUARDAR_CORTE_ERROR', response)
		})
    },
}

const mutations = {
	GUARDAR_CORTE: (state) => {
        state.pending = true
    },
    GUARDAR_CORTE_SUCCESS: (state, data) => {
        state.pending = false
		state.error=null
		state.creado = data
    },
    GUARDAR_CORTE_ERROR: (state, err) => {
        state.error = err
    },
}

const getters = {
	getCreado: state => {
        return state.creado
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
