import Vue from 'vue'
import { mapGetters } from 'vuex'
import $ from 'jquery'
export default Vue.component('NewPost', {
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
        'ubi'
    ],
	computed: {
		...mapGetters({ 
            id_upload: "Global/getUpload", 
            error: "Global/error",
        })
	},
	methods: {
        async upload () {
			this.$q.loading.show()
			// this.files =  [file]
			
			var obj = {
				files : this.files,
				text : this.text,
				uuid_user : this.$ss_u
            }
            var nuevo = await this.$new_post(obj)

            if(nuevo){
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
					this.$q.notify({
                        message: "Post " + this.id_upload + " creado correctamente!",
						timeout: 3000,
						type: 'positive',// Available values: 'positive', 'negative', 'warning', 'info'
						position: 'bottom',
						icon: 'done_all'
					})
					this.$root.$emit('update_' + this.ubi, true)
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
	},
	components: {
	},
	created () {
        console.log('ubi',this.ubi)
	},
	mounted () {
	},
	updated () {
	},
    watch: {
    }

})
