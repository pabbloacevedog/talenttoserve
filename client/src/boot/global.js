import Vue from 'vue'

Vue.use( {
    install(Vue){
        Vue.prototype.$avatar_default = '../../statics/user.png'
        Vue.prototype.$avatar = localStorage.getItem('src_avatar')
        Vue.prototype.$ss_u = localStorage.getItem('ss_u')
        Vue.prototype.$username = localStorage.getItem('username')
        Vue.prototype.$commentsPost = async function (obj){
            var resp = false
            await this.$store.dispatch("Global/commentsPost", obj).then(res => {
                resp = true
            }).catch(err => {
                console.log(err)
            })
            return resp
        }
        Vue.prototype.$resp_commentsComment = async function (obj){
            var resp = false
            await this.$store.dispatch("Global/resp_commentsComment", obj).then(res => {
                resp = true
            }).catch(err => {
                console.log(err)
            })
            return resp
        }
        Vue.prototype.$likesPost = async function (id_post){
            var resp = false
            await this.$store.dispatch("Global/likesPost", id_post).then(res => {
                resp = true
            }).catch(err => {
                console.log(err)
            })
            return resp
        }
        Vue.prototype.$likesComment = async function (id_comment){
            var resp = false
            await this.$store.dispatch("Global/likesComment", id_comment).then(res => {
                resp = true
            }).catch(err => {
                console.log(err)
            })
            return resp
        }
        Vue.prototype.$likesRespCommentPost = async function (id_resp_comment){
            var resp = false
            await this.$store.dispatch("Global/likesRespCommentPost", id_resp_comment).then(res => {
                resp = true
            }).catch(err => {
                console.log(err)
            })
            return resp
        }
        Vue.prototype.$new_post = async function (obj){
            var resp = false
            // var obj = {
            //     files : this.files,
            //     text : this.text,
            //     uuid_user : this.ss_u
            // }
            console.log('global',this)
            await this.$store.dispatch("Global/createPost", obj).then(res => {
                resp = true
            }).catch(err => {
                console.log(err)
            })
            return resp
        }
        Vue.prototype.$like_post = async function(objeto) {
            var resp = false
            // var objeto = {
            //     uuid_user: this.ss_u,
            //     id_post: id_post
            // }
            await this.$store.dispatch("Global/liked_post", objeto).then(res => {
                resp = true
            }).catch(err => {
                console.log(err)
            })
            return resp
        }
        Vue.prototype.$dislike_post = async function(objeto) {
            var resp = false
            // var objeto = {
            //     uuid_user: this.ss_u,
            //     id_post: id_post
            // }
            await this.$store.dispatch("Global/disliked_post", objeto).then(res => {
                resp = true
            }).catch(err => {
                console.log(err)
            })
            return resp
        }
        Vue.prototype.$ike_comment = async function(objeto) {
            var resp = false
            // var objeto = {
            //     uuid_user: this.ss_u,
            //     id_comment: id_comment
            // }
            await this.$store.dispatch("Global/liked_comment", objeto).then(res => {
                resp = true
            }).catch(err => {
                console.log(err)
            })
            return resp
        }
        Vue.prototype.$dislike_commentt = async function(objeto) {
            var resp = false
            // var objeto = {
            //     uuid_user: this.ss_u,
            //     id_comment: id_comment
            // }
            await this.$store.dispatch("Global/disliked_comment", objeto).then(res => {
                resp = true
            }).catch(err => {
                console.log(err)
            })
            return resp
        },
        Vue.prototype.$like_respcomment = async function(objeto) {
            var resp = false
            // var objeto = {
            //     uuid_user: this.ss_u,
            //     id_resp_comment: id_resp_comment
            // }
            await this.$store.dispatch("Global/liked_respcomment", objeto).then(res => {
                resp = true
            }).catch(err => {
                console.log(err)
            })
            return resp
        }
        Vue.prototype.$dislike_respcomment = async function(objeto) {
            var resp = false
            // var objeto = {
            //     uuid_user: this.ss_u,
            //     id_resp_comment: id_resp_comment
            // }
            await this.$store.dispatch("Global/disliked_respcomment", objeto).then(res => {
                resp = true
            }).catch(err => {
                console.log(err)
            })
            return resp
        }
        Vue.prototype.$newComment = async function(obj) {
            var resp = false
            // var obj = {
            //     text: this.comment,
            //     uuid_user: this.ss_u,
            //     id_post: id_post
            // }
            await this.$store.dispatch("Global/createComment", obj).then(res => {
                resp = true
            }).catch(err => {
                console.log(err)
            })
            return resp
        }
        Vue.prototype.$newRespComment = async function (obj) {
            var resp = false
            // var obj = {
            //     text: this.comment,
            //     uuid_user: this.ss_u,
            //     id_comment: id_comment,
            //     uuid_user_comment : uuid_user_comment, 
            //     uuid_user_resp_comment : uuid_user_resp_comment
            // }
            await this.$store.dispatch("Global/createRespComment", obj).then(res => {
                resp = true
            }).catch(err => {
                console.log(err)
            })
            return resp
        }
        Vue.prototype.$follow = async function (obj) {
            var resp = false

            // var obj = {
            //     uuid_user: this.ss_u,
            //     uuid_profile: this.uuid_profile
            // }
            console.log('seguir', obj)
            await this.$store.dispatch("Global/follow", obj).then(res => {
                resp = true
            }).catch(err => {
                console.log(err)
            })
            return resp
        }
        Vue.prototype.$unfollow = async function (obj) {
            var resp = false
            // var obj = {
            //     text: this.comment,
            //     uuid_user: this.ss_u,
            //     id_comment: id_comment,
            //     uuid_user_comment : uuid_user_comment, 
            //     uuid_user_resp_comment : uuid_user_resp_comment
            // }
            await this.$store.dispatch("Global/unfollow", obj).then(res => {
                resp = true
            }).catch(err => {
                console.log(err)
            })
            return resp
        }
    } 
})
