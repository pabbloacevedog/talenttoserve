import Vue from 'vue'
import { mapGetters } from 'vuex'
import $ from 'jquery'
export default Vue.component('AddComment', {
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
            comentarios: [],
			file: null,
      		files: null,
            upload_files: false,
            photo_view: false,
            slide: 1,
            add_comment: false,
            fullscreen: false,
            followers:0,
            fab1: false,
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
            data_comentario : {},
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
        'id_post',
        'item',
        'mb'
    ],
	computed: {
		...mapGetters({ 
            id_resp_comment: "Global/getRespComment", 
            id_comment: "Global/getComment", 
            error: "Global/error",
        })
	},
	methods: {
        async new_comment (id_post) {
			this.$q.loading.show()
			// this.files =  [file]
			
            var obj = {
                text: this.comment,
                uuid_user: this.$ss_u,
                id_post: id_post
            }
            if(await this.$newComment(obj)){
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
                    // var d = new Date();
                    // var comm = {
                    //     avatar: this.$avatar,
                    //     createdAt: d.getDay(),
                    //     id_comment: this.id_comment,
                    //     id_post: this.id_post,
                    //     ilike_comment: false,
                    //     likes_comments: 0,
                    //     n_resp_comments: 0,
                    //     resp_comments: [],
                    //     text: this.comment,
                    //     username: this.$username,
                    //     uuid_user: this.$ss_u,
                    // }
                    // // this.comentarios.comments.push(comm)
                    // // Vue.set(this.item.comments, comm)
                    // // console.log(this.item)
                    // this.$root.$emit('update_coms', true)
                    this.$q.notify({
                        message: this.$username + " : " + this.comment ,
						timeout: 3000,
						type: 'positive',// Available values: 'positive', 'negative', 'warning', 'info'
						position: 'bottom',
                        icon: 'done_all',
                        avatar: this.$avatar
                    })
                    this.comment = ''
				}
            }
            else{
                this.$q.notify({
                    message: "Error al crear el comentario!",
                    timeout: 3000,
                    type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
                    position: 'bottom',
                    icon: 'done_all'
                })
                
            }
        },
        async new_respcomment () {
            this.data_comentario.text = this.comment
            if(await this.$newRespComment(this.data_comentario)){
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
                    var id_comm = this.data_comentario.id_comment

                    // var d = new Date();
                    // var rescomm = {
                    //     avatar: this.$avatar,
                    //     createdAt: d.getDay(),
                    //     id_comment: id_comm,
                    //     id_post: this.id_post,
                    //     id_resp_comment: this.id_resp_comment,
                    //     ilike_resp_comment: false,
                    //     likes_resp_comments: 0,
                    //     text: this.comment,
                    //     username: this.$username,
                    //     uuid_user: this.$ss_u,
                    //     uuid_user_comment: this.data_comentario.uuid_user_resp_comment
                    // }
                    // this.comentarios.comments.push(rescomm)
                    
                    // console.log('id_comm',id_comm)
                    // for (let index = 0; index < this.comentarios.comments.length; index++) {
                    //     debugger
                    //     const element = this.comentarios.comments[index];
                    //     if(id_comm === element.id_comment){
                    //         debugger
                    //         // element.resp_comments.push(rescomm)
                    //         Vue.set(element.resp_comments, rescomm)
                    //     }
                    // }
                    // console.log(this.comentarios)
                    // this.$root.$emit('update_coms', true)
                    this.$q.notify({
                        message: this.$username + " : " + this.comment ,
						timeout: 3000,
						type: 'positive',// Available values: 'positive', 'negative', 'warning', 'info'
						position: 'bottom',
                        icon: 'done_all',
                        avatar: this.$avatar
                    })
                    this.comment = ''
                    this.responder_comentario = false
					// this.$q.notify({
                    //     message: "Comentario " + this.id_resp_comment + " creado correctamente!",
					// 	timeout: 3000,
					// 	type: 'positive',// Available values: 'positive', 'negative', 'warning', 'info'
					// 	position: 'bottom',
					// 	icon: 'done_all'
					// })
					
				}
            }
            else{
                this.$q.notify({
                    message: "Error al crear el post!",
                    timeout: 3000,
                    type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
                    position: 'bottom',
                    icon: 'done_all'
                })
                
            }
        },
        async validateComment(){
            if(this.responder_comentario){
                await this.new_respcomment()
            }
            else{
                if(this.responder_comentario_user){
                    await this.new_respcomment()
                }
                else{
                    await this.new_comment(this.id_post)
                }
            }
        }
	},
	components: {
	},
	created () {
        this.comentarios = this.item
        this.$root.$on('responder_comentario', (data) => {
            // console.log('responder_comentario',data)
            this.data_comentario = data
            this.responder_comentario_user = false
            this.responder_comentario = true
        });
        this.$root.$on('responder_a_usuario', (data) => {
            console.log('responder_a_usuario',data)
            
            this.data_comentario = data
            this.responder_comentario = false
            this.responder_comentario_user = true
            this.comment = '@' +data.username_user_resp_comment + ' '
        });
        this.$root.$on('responder_comentario_no', (data) => {
            // console.log('responder_comentario_no',data)
            this.data_comentario = {}
            this.responder_comentario = false
            this.comment = ''
            // console.log('comment',this.comment)
        });
        this.$root.$on('responder_a_usuario_no', (data) => {
            // console.log('responder_a_usuario_no',data)
            this.data_comentario = {}
            this.responder_comentario_user = false
            this.comment = ''
            // console.log('comment',this.comment)
        });
        // console.log(this.item)
	},
	mounted () {
	},
	updated () {
	},
    watch: {
        'type_comment': function () {
            this.validate()
        },
    }

})
