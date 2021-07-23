import {GET_USUARIO_QUERY, CREAR_USUARIO_MUTATION, EDITAR_USUARIO_MUTATION, ELIMINAR_USUARIO_MUTATION} from './consultas'

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

    async cargarUsuario({commit}) {
        commit('CARGAR')
        await this.$apollo.defaultClient.resetStore()
		await this.$apollo.defaultClient.query({
            query: GET_USUARIO_QUERY
		}).then(response => {
            const datos = response.data.Usuarios
            console.log('datos',this.$apollo)
			commit('CARGAR_SUCCESS', datos)

		}).catch(response => {
			commit('CARGAR_ERROR', response)
		})
	},
    async crearUsuario({commit}, credenciales) {
		commit('CREAR')
		const {rut , nombre , apellido, email, usuario, telefono, descripcion ,id_perfil, estado, clave} = credenciales
		await this.$apollo.defaultClient.mutate({
			mutation: CREAR_USUARIO_MUTATION,
			variables: {rut , nombre , apellido, email, usuario, telefono, id_perfil, descripcion , estado, clave}
		}).then(response => {
			const datos = response.data.createUsuario.creado
			commit('CREAR_SUCCESS', datos)
		}).catch(response => {
			console.log('response', response)
			commit('CREAR_ERROR', response)
		})
    },
    async editarUsuario({commit}, credenciales) {
		commit('EDITAR')
		const {uuid_usuario, rut , nombre , apellido, email, usuario, telefono, descripcion, id_perfil, estado } = credenciales
		await this.$apollo.defaultClient.mutate({
			mutation: EDITAR_USUARIO_MUTATION,
			variables: {uuid_usuario, rut , nombre , apellido, email, usuario, telefono, descripcion,id_perfil, estado}
		}).then(response => {
			const datos = response.data.editUsuario.editado
			commit('EDITAR_SUCCESS', datos)
		}).catch(response => {
			console.log('response', response)
			commit('EDITAR_ERROR', response)
		})
    },
    async eliminarUsuario({commit}, credenciales) {
		commit('ELIMINAR')
		const {id } = credenciales
		await this.$apollo.defaultClient.mutate({
			mutation: ELIMINAR_USUARIO_MUTATION,
			variables: {id }
		}).then(response => {
			const datos = response.data.removeUsuario.eliminado
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

    CARGAR_ERROR: (state, err) => {
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
}

const getters = {
    getData: state => {
        return state.dataGS
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
