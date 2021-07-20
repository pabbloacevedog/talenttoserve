import Vue from 'vue'
import { mapGetters } from 'vuex'
import $ from 'jquery'
export default Vue.component('ViewImgChatPhone', {
	$validates: 1,
	data () {
		return {
			img:'/statics/login.jpg',
			lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			stars: 4,
			text: '',
			tab: 'salon',
			base : process.env.BASE_URL,
            comment: '',
            resp_comment: '',
            id_coment_responder: '',
			dense:'',
			username: '',
			ss_u: '',
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
        'funciones',
        'user_name',
        'user_avatar'
    ],
	computed: {
		...mapGetters({ 
            id_upload: "Global/getUpload", 
            error: "Global/error" , 
            id_comment: "Global/getComment" , 
            id_resp_comment: "Global/getRespComment" , 
            // liked : "Global/getLike", 
            // disliked : "Global/getDislike"
        })
	},
	methods: {
        async like(id_post) {
            this.$q.loading.show()
            var like = {
                uuid_user: this.ss_u,
                id_post: id_post
            }
			await this.$store.dispatch("Global/liked",like).then(res => {
				this.$q.loading.hide()
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
                    if(this.liked){
                        var label = 'cont_like_' + id_post
                        var btn = "like_" + id_post
                        var element = document.getElementById(btn);
                        element.classList.remove("like_no");
                        element.classList.add("like_si");
                        var total_likes = document.getElementById(label).innerHTML;
                        document.getElementById(label).innerHTML = String(Number(total_likes) + 1);
                        // this.home(this.ss_u)
                    }
				}
			}).catch(err => {
				console.log(err)
			})
        },
        async dislike(id_post) {
            this.$q.loading.show()
            var seguir = {
                uuid_user: this.ss_u,
                id_post: id_post
            }
			await this.$store.dispatch("Global/disliked",seguir).then(res => {
				this.$q.loading.hide()
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
                    if(this.disliked){
                        var label = 'cont_like_' + id_post
                        var btn = "like_" + id_post
                        var element = document.getElementById(btn);
                        element.classList.remove("like_si");
                        element.classList.add("like_no");
                        var total_likes = document.getElementById(label).innerHTML;
                        document.getElementById(label).innerHTML = String(Number(total_likes) - 1);
                        // this.home(this.ss_u)
                    }
				}
			}).catch(err => {
				console.log(err)
			})
        },
        darlike(id_post){
            var btn = "like_" + id_post
            var item = document.getElementById(btn);
            var hasClass = item.classList.contains('like_si');
            if(hasClass){
                this.dislike(id_post)
            }
            else{
                this.like(id_post)
            }
        },
        async newComment (id_post) {
			this.$q.loading.show()
			var obj = {
				text : this.comment,
                uuid_user : this.ss_u,
                id_post: id_post
            }
			await this.$store.dispatch("Global/createComment", obj).then(res => {
				this.$q.loading.hide()
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
                    this.addComment(this.comment, this.id_comment, id_post)
                    this.comment = ''
				}
			}).catch(err => {
				console.log(err)
			})
        },
        respComment (id_comment){
            if(this.responder_comentario){
                this.responder_comentario = false;
                this.desmarcarComment(id_comment)
                this.id_coment_responder = ''
            }
            else{
                this.id_coment_responder = id_comment
                this.responder_comentario = true
                this.marcarComment(id_comment)
            }
        },
        respCommentUser (id_comment){
            if(this.responder_comentario_user){
                this.responder_comentario_user = false;
                this.desmarcarCommentUser(id_comment)
                this.id_coment_responder = ''
            }
            else{
                this.id_coment_responder = id_comment
                this.responder_comentario_user = true
                this.marcarCommentUser(id_comment)
            }
        },
        marcarComment(id_comment){
            var action = document.getElementById('action_comment_'+id_comment);
            var user = document.getElementById('comment_user_'+id_comment);
            action.classList.remove("espacio-action-comment");
            action.classList.add("espacio-action-comment-active");
            user.classList.remove("comment_user");
            user.classList.add("comment_user-active");
        },
        desmarcarComment(id_comment){
            var action = document.getElementById('action_comment_'+id_comment);
            var user = document.getElementById('comment_user_'+id_comment);
            
            action.classList.remove("espacio-action-comment-active");
            action.classList.add("espacio-action-comment");
            user.classList.remove("comment_user-active");
            user.classList.add("comment_user");
        },
        marcarCommentUser(id_comment){
            var action = document.getElementById('action_respcomment_'+id_comment);
            var user = document.getElementById('respcomment_user_'+id_comment);
            action.classList.remove("espacio-action-respcomment");
            action.classList.add("espacio-action-respcomment-active");
            user.classList.remove("comment_user");
            user.classList.add("comment_user-active");
        },
        desmarcarCommentUser(id_comment){
            var action = document.getElementById('action_respcomment_'+id_comment);
            var user = document.getElementById('respcomment_user_'+id_comment);
            
            action.classList.remove("espacio-action-respcomment-active");
            action.classList.add("espacio-action-respcomment");
            user.classList.remove("comment_user-active");
            user.classList.add("comment_user");
        },
        addComment(text, id_comment, id_post){
            var contenedor = document.getElementById("add_comment_" + id_post); 
            var newContent = `
            <div align="left" class="todo" id="comment_`+ id_comment + `">
                <div class="espacio-comment" style="font-size: 1rem;">
                    <label class="f_roboto_b cursor-pointer" style="color: rgb(20, 125, 255);">@`+ this.username + ` </label> `+ text + `
                </div>
            </div>
            `
            contenedor.insertAdjacentHTML("beforeend", newContent);
            var label = 'cont_com_' + id_post
            var total_com = document.getElementById(label).innerHTML;
            document.getElementById(label).innerHTML = String(Number(total_com) + 1);
        },
        addRespComment(text, id_comment){
            var contenedor = document.getElementById("add_comment_" + id_post); 
            var newContent = `
            <div class="espacio-respcomment_ul row">
                <div class="col-12"><div class="q-avatar" style="font-size: 30px;">
                <div class="q-avatar__content row flex-center overflow-hidden">
                <img src="`+ src_avatar + `">
                </div>
                </div>
                <label class="f_roboto cursor-pointer" style="color: rgb(20, 125, 255); padding-left: 5px;">@`+ this.username + ` </label>
                <label class="f_roboto_l cursor-pointer">`+ text + `</label>
                </div>
                <div align="right" class="col-12 espacio-action-respcomment">
                <button tabindex="0" type="button" role="button" class="q-btn q-btn-item non-selectable no-outline q-btn--flat q-btn--rectangle q-btn--actionable q-focusable q-hoverable q-btn--wrap like_si" id="like_cf44ef20-df58-43c0-9ed9-6c4c2a7bb3f6" style="font-size: 8px;">
                <div tabindex="-1" class="q-focus-helper">
                </div>
                <div class="q-btn__wrapper col row q-anchor--skip">
                <div class="q-btn__content text-center col items-center q-anchor--skip justify-center row">
                <i aria-hidden="true" role="img" class="fas fa-heart q-icon notranslate"> </i>
                </div>
                </div>
                </button>
                <label id="cont_like_cf44ef20-df58-43c0-9ed9-6c4c2a7bb3f6">2 </label>
                </div
            ></div>
            `
            contenedor.insertAdjacentHTML("beforeend", newContent);
            var label = 'cont_com_' + id_post
            var total_com = document.getElementById(label).innerHTML;
            document.getElementById(label).innerHTML = String(Number(total_com) + 1);
        },
        async newRespComment (id_comment) {
            this.$q.loading.show()
			var obj = {
				text : this.comment,
                uuid_user : this.ss_u,
                id_comment: id_comment
            }
			await this.$store.dispatch("Home/createRespComment", obj).then(res => {
				this.$q.loading.hide()
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
                    this.addRespComment(this.comment, this.id_comment)
                    this.comment = ''
				}
			}).catch(err => {
				console.log(err)
			})
        },
		goProfile(username){
			this.$router.push('/'+ username)
		},
		openDialog(){
            this.upload_files = true
        },
        changePost(index){
            var post = this.twenty_post[index]
            this.data_post = post
            // this.data_post.items = this.data_post.items
            // this.photo_view = true
            console.log(index)
            console.log('datos de este otro post', post)
        },
        async validateComment(id_post){
            if(this.responder_comentario){
                if(this.responder_comentario_user){
                    this.desmarcarCommentUser(this.id_coment_responder)
                }
                await this.respComment(this.id_coment_responder)
            }
            else{
                if(this.responder_comentario_user){
                    if(this.responder_comentario){
                        this.desmarcarComment(this.id_coment_responder)
                    }
                    await this.respCommentUser(this.id_coment_responder)
                }
                else{
                    await this.newComment(id_post)
                }
            }
        }
	},
	components: {
	},

	created () {

	},
	mounted () {

	},
	updated () {
	},
    watch: {

    }

})
