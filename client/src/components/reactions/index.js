import Vue from 'vue'
import { mapGetters } from 'vuex'
import $ from 'jquery'
export default Vue.component('Reactions', {
	$validates: 1,
	data () {
		return {
			img:'/statics/login.jpg',
			text: '',
			base : process.env.BASE_URL,
            comment: '',
            resp_comment: '',
            id_coment_responder: '',
			dense:'',
			username: '',
            src_avatar: localStorage.getItem('src_avatar'),
            avatar_default: '../../statics/user.png',
			con_fotos:[],
			items: [],
			file: null,
      		files: null,
            upload_files: false,
            photo_view: false,
            slide: 1,
            add_comment: false,
            fullscreen: false,
            followers:0,
			name:'',
			review :'' ,
			upload_file: false,
			slide: 1,
			siguiendo_modal: false,
            siguiendo: 0,
            uuid_profile:'',
            username_profile:'',
            ancho_pantalla:screen.width,
            alto_pantalla: screen.height,
            uuid_user: '',
            following: false,
            posts: '',
            alto: 400,
            ancho: 600,
            slide_viewer: 1,
            responder_comentario: false,
            responder_comentario_user: false,
            items_cabecera: ['belleza', 'comida', 'vestuario', 'zapatos', 'accesorios', 'hogar', 'electro'],
            contentStyle: {
                    color: '#555'
            },
    
            contentActiveStyle: {
                // backgroundColor: '#eee',
                color: 'black'
            },
    
            thumbStyle: {
                right: '2px',
                borderRadius: '5px',
                backgroundColor: '#027be3',
                width: '5px',
                opacity: 0.75
            }
        }
    },
    props: [
        'item',
        'ss_u',
        'type',
    ],
	computed: {
		...mapGetters({ 
            like_post: "Global/getLikePost", 
            dislike_post: "Global/getDislikePost", 
            like_comment: "Global/getLikeComment", 
            dislike_comment: "Global/getDislikeComment", 
            like_respcomment: "Global/getLikeRespcomment", 
            dislike_respcomment: "Global/getDislikeRespcomment", 
            error: "Global/error",
        })
	},
	methods: {
        async setLikePost (id_post) {

            var objeto = {
                uuid_user: this.$ss_u,
                id_post: id_post
            }
            if(await this.$like_post(objeto)){
				if(this.error){
					var message = this.error.message.replace('GraphQL error: ','')
					this.$q.notify({
						message: message,
						timeout: 3000,
						type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
						position: 'bottom',
						icon: 'report_problem'
					})
				}
				else{
                    if(this.like_post){
                        this.add_like(id_post, "post")
                    }
				}
            }
            else{
                this.$q.notify({
                    message: "Error al dar like en post!",
                    timeout: 3000,
                    type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
                    position: 'bottom',
                    icon: 'done_all'
                })
                
            }
        },
        async setDislikePost (id_post) {

            var objeto = {
                uuid_user: this.$ss_u,
                id_post: id_post
            }
            if(await this.$dislike_post(objeto)){
				if(this.error){
					var message = this.error.message.replace('GraphQL error: ','')
					this.$q.notify({
						message: message,
						timeout: 3000,
						type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
						position: 'bottom',
						icon: 'report_problem'
					})
				}
				else{
                    if(this.dislike_post){
                        this.add_dislike(id_post, "post")
                    }
				}
            }
            else{
                this.$q.notify({
                    message: "Error al dar dislike en post!",
                    timeout: 3000,
                    type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
                    position: 'bottom',
                    icon: 'done_all'
                })
                
            }
        },
        async setLikeComment (id_comment) {

            var objeto = {
                uuid_user: this.$ss_u,
                id_comment: id_comment
            }
            if(await this.$ike_comment(objeto)){
				if(this.error){
					var message = this.error.message.replace('GraphQL error: ','')
					this.$q.notify({
						message: message,
						timeout: 3000,
						type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
						position: 'bottom',
						icon: 'report_problem'
					})
				}
				else{
                    if(this.like_comment){
                        this.add_like(id_comment, "comment")
                    }
				}
            }
            else{
                this.$q.notify({
                    message: "Error al dar like en comment!",
                    timeout: 3000,
                    type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
                    position: 'bottom',
                    icon: 'done_all'
                })
                
            }
        },
        async setDislikeComment (id_comment) {

            var objeto = {
                uuid_user: this.$ss_u,
                id_comment: id_comment
            }
            if(await this.$dislike_commentt(objeto)){
				if(this.error){
					var message = this.error.message.replace('GraphQL error: ','')
					this.$q.notify({
						message: message,
						timeout: 3000,
						type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
						position: 'bottom',
						icon: 'report_problem'
					})
				}
				else{
                    if(this.dislike_comment){
                        this.add_dislike(id_comment, "comment")
                    }
				}
            }
            else{
                this.$q.notify({
                    message: "Error al dar dislike en post!",
                    timeout: 3000,
                    type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
                    position: 'bottom',
                    icon: 'done_all'
                })
                
            }
        },
        async setLikeRespcomment (id_resp_comment) {

            var objeto = {
                uuid_user: this.$ss_u,
                id_resp_comment: id_resp_comment
            }
            
            if(await this.$like_respcomment(objeto)){
				if(this.error){
					var message = this.error.message.replace('GraphQL error: ','')
					this.$q.notify({
						message: message,
						timeout: 3000,
						type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
						position: 'bottom',
						icon: 'report_problem'
					})
				}
				else{
                    if(this.like_respcomment){
                        this.add_like(id_resp_comment, "resp_comment")
                    }
				}
            }
            else{
                this.$q.notify({
                    message: "Error al dar like en resp_comment!",
                    timeout: 3000,
                    type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
                    position: 'bottom',
                    icon: 'done_all'
                })
                
            }
        },
        async setDislikeRespcomment (id_resp_comment) {

            var objeto = {
                uuid_user: this.$ss_u,
                id_resp_comment: id_resp_comment
            }
            if(await this.$dislike_respcomment(objeto)){
				if(this.error){
					var message = this.error.message.replace('GraphQL error: ','')
					this.$q.notify({
						message: message,
						timeout: 3000,
						type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
						position: 'bottom',
						icon: 'report_problem'
					})
				}
				else{
                    if(this.dislike_respcomment){
                        this.add_dislike(id_resp_comment, "resp_comment")
                    }
				}
            }
            else{
                this.$q.notify({
                    message: "Error al dar dislike en resp_comment!",
                    timeout: 3000,
                    type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
                    position: 'bottom',
                    icon: 'done_all'
                })
                
            }
        },
        add_like(id, type){
            var label = ''
            var btn = ''
            if(type == "post"){
                label = 'cont_like_post_' + id
                btn = "like_post_" + id
            }
            else if(type == "comment"){
                label = 'cont_like_comment_' + id
                btn = "like_comment_" + id
            }
            else{
                label = 'cont_like_resp_comment_' + id
                btn = "like_resp_comment_" + id
            }
            var element = document.getElementById(btn);
            element.classList.remove("like_no");
            element.classList.add("like_si");
            var total_likes = document.getElementById(label).innerHTML;
            document.getElementById(label).innerHTML = String(Number(total_likes) + 1);
        },
        add_dislike(id, type){
            var label = ''
            var btn = ''
            if(type == "post"){
                label = 'cont_like_post_' + id
                btn = "like_post_" + id
            }
            else if(type == "comment"){
                label = 'cont_like_comment_' + id
                btn = "like_comment_" + id
            }
            else{
                label = 'cont_like_resp_comment_' + id
                btn = "like_resp_comment_" + id
            }
            var element = document.getElementById(btn);
            element.classList.remove("like_si");
            element.classList.add("like_no");
            var total_likes = document.getElementById(label).innerHTML;
            document.getElementById(label).innerHTML = String(Number(total_likes) - 1);
        },
        darlike(id, type){
            var btn = ''
            var item = ''
            var hasClass = ''
            if(type == "post"){
                btn = "like_post_" + id
                item = document.getElementById(btn);
                hasClass = item.classList.contains('like_si');
                if(hasClass){
                    this.setDislikePost(id)
                }
                else{
                    this.setLikePost(id)
                }
            }
            else if(type == "comment"){
                btn = "like_comment_" + id
                item = document.getElementById(btn);
                hasClass = item.classList.contains('like_si');
                if(hasClass){
                    this.setDislikeComment(id)
                }
                else{
                    this.setLikeComment(id)
                }
            }
            else{
                btn = "like_resp_comment_" + id
                item = document.getElementById(btn);
                hasClass = item.classList.contains('like_si');
                if(hasClass){
                    this.setDislikeRespcomment(id)
                }
                else{
                    this.setLikeRespcomment(id)
                }
            }
        },
        respComment (id_comment){
            if(this.responder_comentario){
                this.responder_comentario = false;
                this.desmarcarComment(id_comment)
                this.id_coment_responder = ''
                var datos = {}
                this.$root.$emit('responder_comentario_no', datos)
            }
            else{
                this.id_coment_responder = id_comment
                this.responder_comentario = true
                this.marcarComment(id_comment)
                var datos = {
                    uuid_user: this.$ss_u,
                    id_comment: id_comment,
                    uuid_user_comment : this.item.uuid_user, 
                    uuid_user_resp_comment : '',
                    username_user_resp_comment : ''
                }
                this.$root.$emit('responder_comentario', datos)
            }
        },
        respCommentUser (id_comment){
            if(this.responder_comentario_user){
                this.responder_comentario_user = false;
                this.desmarcarCommentUser(id_comment)
                this.id_coment_responder = ''
                var datos = {}
                this.$root.$emit('responder_a_usuario_no', datos)
            }
            else{
                this.id_coment_responder = id_comment
                this.responder_comentario_user = true
                this.marcarCommentUser(id_comment)
                var datos = {
                    uuid_user: this.$ss_u,
                    id_comment: id_comment,
                    uuid_user_comment : this.item.uuid_user_comment, 
                    uuid_user_resp_comment : this.item.uuid_user,
                    username_user_resp_comment : this.item.username
                }
                this.$root.$emit('responder_a_usuario', datos)
            }
        },
        marcarComment(id_comment){
            var action = document.getElementById('action_comment_'+id_comment);
            var user = document.getElementById('comment_user_'+id_comment);
            // action.classList.remove("espacio-action-comment");
            action.classList.add("espacio-action-comment-active");
            user.classList.remove("comment_user");
            user.classList.add("comment_user-active");
        },
        desmarcarComment(id_comment){
            var action = document.getElementById('action_comment_'+id_comment);
            var user = document.getElementById('comment_user_'+id_comment);
            
            action.classList.remove("espacio-action-comment-active");
            // action.classList.add("espacio-action-comment");
            user.classList.remove("comment_user-active");
            user.classList.add("comment_user");
        },
        marcarCommentUser(id_comment){
            console.log(id_comment)
            var action = document.getElementById('action_respcomment_'+id_comment);
            var user = document.getElementById('respcomment_user_'+id_comment);
            // action.classList.remove("espacio-action-respcomment");
            action.classList.add("espacio-action-respcomment-active");
            user.classList.remove("comment_user");
            user.classList.add("comment_user-active");
        },
        desmarcarCommentUser(id_comment){
            var action = document.getElementById('action_respcomment_'+id_comment);
            var user = document.getElementById('respcomment_user_'+id_comment);
            
            action.classList.remove("espacio-action-respcomment-active");
            // action.classList.add("espacio-action-respcomment");
            user.classList.remove("comment_user-active");
            user.classList.add("comment_user");
        },
        async bringLikesPost(){
            let obj = {
                offset: this.commentsPost.length,
                id_post: this.id_post
            }
            if(await this.$commentsPost(obj)){
				if(this.error){
					var message = this.error.message.replace('GraphQL error: ','')
					this.$q.notify({
						message: message,
						timeout: 3000,
						type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
						position: 'bottom',
						icon: 'report_problem'
					})
                }
                else{
                }
            }
            else{
                this.$q.notify({
                    message: "Error al traer los likes para el post: " + this.id_post,
                    timeout: 3000,
                    type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
                    position: 'bottom',
                    icon: 'done_all'
                })
            }
        },
        async bringLikesComment(){
            let obj = {
                offset: this.commentsPost.length,
                id_post: this.id_post
            }
            if(await this.$commentsPost(obj)){
				if(this.error){
					var message = this.error.message.replace('GraphQL error: ','')
					this.$q.notify({
						message: message,
						timeout: 3000,
						type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
						position: 'bottom',
						icon: 'report_problem'
					})
                }
                else{
                }
            }
            else{
                this.$q.notify({
                    message: "Error al traer los likes para el post: " + this.id_post,
                    timeout: 3000,
                    type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
                    position: 'bottom',
                    icon: 'done_all'
                })
            }
        },
        async bringLikesRespComment(){
            let obj = {
                offset: this.commentsPost.length,
                id_post: this.id_post
            }
            if(await this.$commentsPost(obj)){
				if(this.error){
					var message = this.error.message.replace('GraphQL error: ','')
					this.$q.notify({
						message: message,
						timeout: 3000,
						type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
						position: 'bottom',
						icon: 'report_problem'
					})
                }
                else{
                }
            }
            else{
                this.$q.notify({
                    message: "Error al traer los likes para el post: " + this.id_post,
                    timeout: 3000,
                    type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
                    position: 'bottom',
                    icon: 'done_all'
                })
            }
        },
        
	},
	components: {
	},
	created () {
        // console.log('item',this.item)
	},
	mounted () {
	},
	updated () {
	},
    watch: {
    }

})
