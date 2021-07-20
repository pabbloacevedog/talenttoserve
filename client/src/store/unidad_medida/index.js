import {GET_UNIDAD_MEDIDA_QUERY, GET_UNIDAD_BASE_QUERY, CREAR_UNIDAD_MEDIDA_MUTATION, EDITAR_UNIDAD_MEDIDA_MUTATION, ELIMINAR_UNIDAD_MEDIDA_MUTATION, GUARDAR_UNIDAD_BASE_MUTATION} from './consultas'

const state = {
    error: null,
    pending: false,
    isFetching: false,
	alerta : false,
    dataGS:{},
    dataUB:{},
    creado:'',
    editado:'',
    eliminado:'',
    guardado:''

}

const actions = {

    async cargarUnidadMedida({commit}) {
        commit('CARGAR')
        await this.$apollo.defaultClient.resetStore()
		await this.$apollo.defaultClient.query({
            query: GET_UNIDAD_MEDIDA_QUERY,
            variables: { estado:true }
		}).then(response => {
            const datos = response.data.unidadmedidas
            console.log('datos',this.$apollo)
			commit('CARGAR_SUCCESS', datos)

		}).catch(response => {
			commit('CARGAR_ERROR', response)
		})
    },
    async cargarUnidadBase({commit}) {
        commit('CARGAR_BASE')
        await this.$apollo.defaultClient.resetStore()
		await this.$apollo.defaultClient.query({
            query: GET_UNIDAD_BASE_QUERY,
            variables: { estado:true }
		}).then(response => {
            const datos = response.data.unidadbases
            console.log('datos',this.$apollo)
			commit('CARGAR_BASE_SUCCESS', datos)

		}).catch(response => {
			commit('CARGAR_BASE_ERROR', response)
		})
	},
    async crearUnidadMedida({commit}, credenciales) {
		commit('CREAR')
		const {unidad_base,unidad_conversion,nombre, descripcion , acronimo, estado } = credenciales
		await this.$apollo.defaultClient.mutate({
			mutation: CREAR_UNIDAD_MEDIDA_MUTATION,
			variables: {unidad_base,unidad_conversion,nombre, descripcion , acronimo, estado }
		}).then(response => {
			const datos = response.data.createUnidadMedida.creado
			commit('CREAR_SUCCESS', datos)
		}).catch(response => {
			console.log('response', response)
			commit('CREAR_ERROR', response)
		})
    },
    async editarUnidadMedida({commit}, credenciales) {
		commit('EDITAR')
		const {id_unidad_medida, unidad_base,unidad_conversion,nombre, descripcion , acronimo, estado } = credenciales
		await this.$apollo.defaultClient.mutate({
			mutation: EDITAR_UNIDAD_MEDIDA_MUTATION,
			variables: {id_unidad_medida, unidad_base,unidad_conversion,nombre, descripcion , acronimo, estado }
		}).then(response => {
			const datos = response.data.editUnidadMedida.editado
			commit('EDITAR_SUCCESS', datos)
		}).catch(response => {
			console.log('response', response)
			commit('EDITAR_ERROR', response)
		})
    },
    async eliminarUnidadMedida({commit}, credenciales) {
		commit('ELIMINAR')
		const {id } = credenciales
		await this.$apollo.defaultClient.mutate({
			mutation: ELIMINAR_UNIDAD_MEDIDA_MUTATION,
			variables: {id }
		}).then(response => {
			const datos = response.data.removeUnidadMedida.eliminado
			commit('ELIMINAR_SUCCESS', datos)
		}).catch(response => {
			console.log('response', response)
			commit('ELIMINAR_ERROR', response)
		})
    },
    async guardarUnidadBase({commit}, credenciales) {
		commit('GUARDAR_UNIDAD_BASE')
		const {id } = credenciales
		await this.$apollo.defaultClient.mutate({
			mutation: GUARDAR_UNIDAD_BASE_MUTATION,
			variables: {id }
		}).then(response => {
			const datos = response.data.guardarUnidadBase.guardado
			commit('GUARDAR_UNIDAD_BASE_SUCCESS', datos)
		}).catch(response => {
			console.log('response', response)
			commit('GUARDAR_UNIDAD_BASE_ERROR', response)
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

    CARGAR_ERROR: (state, err) => {
        state.error = err
    },
    CARGAR_BASE: (state) => {
        state.pending = true
    },
    CARGAR_BASE_SUCCESS: (state, data) => {
        state.pending = false
		state.error=null
		state.dataUB = data
    },

    CARGAR_BASE_ERROR: (state, err) => {
        state.error = err
	},
	CREAR: (state) => {
        state.pending = true
    },
    CREAR_SUCCESS: (state, data) => {
        state.pending = false
		state.error=null
		state.creado = data
    },
    CREAR_ERROR: (state, err) => {
        state.error = err
    },
    EDITAR: (state) => {
        state.pending = true
    },
    EDITAR_SUCCESS: (state, data) => {
        state.pending = false
		state.error=null
		state.editado = data
    },
    EDITAR_ERROR: (state, err) => {
        state.error = err
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
    GUARDAR_UNIDAD_BASE: (state) => {
        state.pending = true
    },
    GUARDAR_UNIDAD_BASE_SUCCESS: (state, data) => {
        state.pending = false
		state.error=null
		state.guardado = data
    },
    GUARDAR_UNIDAD_BASE_ERROR: (state, err) => {
        state.error = err
	},
}

const getters = {
    getData: state => {
        return state.dataGS
    },
    getBase: state => {
        return state.dataUB
	},
	getCreado: state => {
        return state.creado
    },
    getEditado: state => {
        return state.editado
    },
    getEliminado: state => {
        return state.eliminado
    },
    getGuardarUnidadBase: state => {
        return state.guardado
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
