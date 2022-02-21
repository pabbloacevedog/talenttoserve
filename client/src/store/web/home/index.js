import {POST_HOME_QUERY, UPLOAD_POST_MUTATION, UPLOAD_MULTIPLE_MUTATION, CREATE_POST_MUTATION, CREATE_COMMENT_MUTATION, CREATE_RESPCOMMENT_MUTATION, LIKE_POST_MUTATION, DISLIKE_POST_MUTATION} from './consultas'

const state = {
    error: null,
    pending: false,
    isFetching: false,
	alerta : false,
	dataHome:{},
	id_upload:'',
    id_post:'',
    id_comment:'',
    id_resp_comment: '',
    like:'',
    dislike: '',

}

const actions = {
	async loadHome({ commit }, datos) {
		commit("HOME");
		let uuid_user = datos.uuid_user;
		let offset = datos.offset;
		// console.log('home store', this)
		await this.$apollo.defaultClient
			.query({
				query: POST_HOME_QUERY,
				variables: {
					uuid_user,
					offset
				}
			})
			.then(response => {
				const dataHome = response.data.dataHome;
				commit("HOME_SUCCESS", dataHome);
			})
			.catch(response => {
				commit("HOME_ERROR", response);
			});
	},
	async uploadFile({ commit }, file) {
		console.log("file store", file);
		commit("UPLOAD");
		await this.$apollo.defaultClient
			.mutate({
				mutation: UPLOAD_POST_MUTATION,
				variables: { file }
			})
			.then(response => {
				const id = response.data.singleUpload.id;
				commit("UPLOAD_SUCCESS", id);
			})
			.catch(response => {
				console.log("response", response);
				commit("UPLOAD_ERROR", response);
			});
	},
	async uploadFiles({ commit }, files) {
		console.log("files store", files);
		commit("UPLOAD");
		await this.$apollo.defaultClient
			.mutate({
				mutation: UPLOAD_MULTIPLE_MUTATION,
				variables: { files }
			})
			.then(response => {
				const id = response.data.multipleUpload.id;
				commit("UPLOAD_SUCCESS", id);
			})
			.catch(response => {
				console.log("response", response);
				commit("UPLOAD_ERROR", response);
			});
	},
	async createPost({ commit }, datPost) {
		var files = datPost.files;
		var text = datPost.text;
		var uuid_user = datPost.uuid_user;

		commit("CREATE_POST");
		await this.$apollo.defaultClient
			.mutate({
				mutation: CREATE_POST_MUTATION,
				variables: { files, text, uuid_user }
			})
			.then(response => {
				const id = response.data.createPost.id_post;
				commit("CREATE_POST_SUCCESS", id);
			})
			.catch(response => {
				console.log("response", response);
				commit("CREATE_POST_ERROR", response);
			});
	},
	async createPost({ commit }, datPost) {
		var files = datPost.files;
		var text = datPost.text;
		var uuid_user = datPost.uuid_user;

		commit("CREATE_POST");
		await this.$apollo.defaultClient
			.mutate({
				mutation: CREATE_POST_MUTATION,
				variables: { files, text, uuid_user }
			})
			.then(response => {
				const id = response.data.createPost.id_post;
				commit("CREATE_POST_SUCCESS", id);
			})
			.catch(response => {
				console.log("response", response);
				commit("CREATE_POST_ERROR", response);
			});
	}
	// async createComment({commit}, datComment) {
	// 	var id_post = datComment.id_post
	// 	var text =  datComment.text
	// 	var uuid_user = datComment.uuid_user

	// 	commit('CREATE_COMMENT')
	// 	await this.$apollo.defaultClient.mutate({
	// 		mutation: CREATE_COMMENT_MUTATION,
	// 		variables: {text, uuid_user, id_post}
	// 	}).then(response => {
	// 		const id = response.data.createComment.id_comment
	// 		commit('CREATE_COMMENT_SUCCESS', id)

	// 	}).catch(response => {
	// 		console.log('response', response)
	// 		commit('CREATE_COMMENT_ERROR', response)
	// 	})
	// },
	// async createRespComment({commit}, datComment) {
	// 	var id_comment = datComment.id_comment
	// 	var text =  datComment.text
	// 	var uuid_user = datComment.uuid_user

	// 	commit('CREATE_RESPCOMMENT')
	// 	await this.$apollo.defaultClient.mutate({
	// 		mutation: CREATE_RESPCOMMENT_MUTATION,
	// 		variables: {text, uuid_user, id_comment}
	// 	}).then(response => {
	// 		const id = response.data.createComment.id_resp_comment
	// 		commit('CREATE_RESPCOMMENT_SUCCESS', id)

	// 	}).catch(response => {
	// 		console.log('response', response)
	// 		commit('CREATE_RESPCOMMENT_ERROR', response)
	// 	})
	// },
	// async liked({commit}, data) {
	//     commit('LIKE')
	//     console.log('data',data)
	// 	var id_post = data.id_post
	// 	var uuid_user =  data.uuid_user
	// 	await this.$apollo.defaultClient.mutate({
	// 		mutation: LIKE_POST_MUTATION,
	// 		variables: {
	// 			uuid_user, id_post
	// 		}
	// 	}).then(response => {
	// 		const user = response.data.like.like
	// 		commit('LIKE_SUCCESS', user)
	// 	}).catch(response => {
	//         console.log(response)
	// 		commit('LIKE_ERROR', response)
	// 	})
	// },
	// async disliked({commit}, data) {
	// 	commit('DISLIKE')
	// 	var id_post = data.id_post
	// 	var uuid_user =  data.uuid_user
	// 	await this.$apollo.defaultClient.mutate({
	// 		mutation: DISLIKE_POST_MUTATION,
	// 		variables: {
	// 			uuid_user, id_post
	// 		}
	// 	}).then(response => {
	// 		const user = response.data.dislike.dislike
	// 		commit('DISLIKE_SUCCESS', user)
	// 	}).catch(response => {
	// 		commit('DISLIKE_ERROR', response)
	// 	})
	// }
};

const mutations = {

    HOME: (state) => {
        state.pending = true
    },

    HOME_SUCCESS: (state, data) => {
        state.pending = false
		state.error=null
		state.dataHome = data
    },

    HOME_ERROR: (state, err) => {
        state.error = err
	},
	UPLOAD: (state) => {
        state.pending = true
    },

    UPLOAD_SUCCESS: (state, data) => {
        state.pending = false
		state.error=null
		state.id_upload = data
    },

    UPLOAD_ERROR: (state, err) => {
        state.error = err
	},
	CREATE_POST: (state) => {
        state.pending = true
    },

    CREATE_POST_SUCCESS: (state, data) => {
        state.pending = false
		state.error=null
		state.id_post = data
    },

    CREATE_POST_ERROR: (state, err) => {
        state.error = err
    },
    CREATE_COMMENT: (state) => {
        state.pending = true
    },

    CREATE_COMMENT_SUCCESS: (state, data) => {
        state.pending = false
		state.error=null
		state.id_comment = data
    },

    CREATE_COMMENT_ERROR: (state, err) => {
        state.error = err
    },
    CREATE_RESPCOMMENT: (state) => {
        state.pending = true
    },

    CREATE_RESPCOMMENT_SUCCESS: (state, data) => {
        state.pending = false
		state.error=null
		state.id_resp_comment = data
    },

    CREATE_RESPCOMMENT_ERROR: (state, err) => {
        state.error = err
    },
    LIKE: (state) => {
        state.pending = true
    },

    LIKE_SUCCESS: (state, data) => {
        state.pending = false
		state.error=null
		state.like = data
    },

    LIKE_ERROR: (state, err) => {
        state.error = err
    },
    DISLIKE: (state) => {
        state.pending = true
    },

    DISLIKE_SUCCESS: (state, data) => {
        state.pending = false
		state.error=null
		state.dislike = data
    },

    DISLIKE_ERROR: (state, err) => {
        state.error = err
    }
}

const getters = {
    getData: state => {
        return state.dataHome
	},
	getUpload: state => {
        return state.id_upload
	},
	getPost: state => {
        return state.id_post
    },
    getComment: state => {
        return state.id_comment
    },
    getRespComment: state => {
        return state.id_resp_comment
    },
    getLike: state => {
        return state.like
    },
    getDislike: state => {
        return state.dislike
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
