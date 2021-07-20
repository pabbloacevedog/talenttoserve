import Vue from 'vue'
import {getUserFromToken} from '@utils/authService'
import { mapGetters } from 'vuex'
import { Platform } from 'quasar'
import $ from 'jquery'
export default Vue.component('Messages', {
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
            twenty_post:[],
			dense:'',
			username: '',
            ss_u: '',
            name_addressee:'',
            src_avatar: '../../statics/user.png',
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
            init: true,
			review :'' ,
			upload_file: false,
            slide: 1,
            up_home:1,
			siguiendo_modal: false,
            siguiendo: 0,
            uuid_profile:'',
            username_profile:'',
            ancho_pantalla:screen.width,
            alto_pantalla: screen.height,
            uuid_user: '',
            uuid_user_addressee:'',
            following: false,
            posts: '',
            alto: 400,
            ancho: 600,
            positionConv:9999,
            avatar_addressee:'',
            data_post:[],
            messages:[],
            slide_viewer: 1,
            conversationUp: false,
            maximizedToggle: true,
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
            },
        }
	},
	computed: {
		...mapGetters({ 
            dataList: "Message/getMessageList", 
            conversation: "Message/getConversation", 
            // id_upload: "Global/getUpload", 
            error: "Message/error" , 
            // incomingMessage: "Message/getIncommingMessage"
            // id_comment: "Global/getComment" , 
            // id_resp_comment: "Global/getRespComment" , 
        })
	},
	methods: {
        async home (uuid_user) {
            
			this.$q.loading.show()
			await this.$store.dispatch("Message/loadList", uuid_user).then(res => {
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
                    this.items =  []
                    var message = this.dataList
                    for (let index = 0; index < message.length; index++) {
                        if(!message[index].avatar_addressee.includes(this.base)){
                            var avatar = this.base + message[index].avatar_addressee
                            message[index].avatar_addressee = avatar 
                        }
					}
                    this.items = message
					console.log('messages',this.items)
				}
			}).catch(err => {
				console.log(err)
			})
        },
        async goConversation(item){
            this.init = false
            this.name_addressee = item.name_addressee
            this.avatar_addressee = item.avatar_addressee
            this.uuid_user = item.uuid_user
            this.uuid_user_addressee = item.uuid_user_addressee
            await this.bringConversation(item.uuid_user, item.uuid_user_addressee)
        },
        async goConversationMB(item){
            this.init = false
            this.name_addressee = item.name_addressee
            this.avatar_addressee = item.avatar_addressee
            this.uuid_user = item.uuid_user
            this.uuid_user_addressee = item.uuid_user_addressee
            await this.bringConversation(item.uuid_user,item.uuid_user_addressee)
            this.conversationUp = true
            // debugger
            
            
        },
        parseConversation(message){
            for (let index = 0; index < message.length; index++) {
                // debugger
                if(message[index].uuid_user == this.ss_u){
                    if(!message[index].name.includes('strong')){
                        var name = "<strong class='f_roboto cursor-pointer color-message'>" +  message[index].name + "</strong>"
                        message[index].name = name
                    }
                    if(!message[index].avatar.includes(this.base)){
                        var avatar = this.base + message[index].avatar
                        message[index].avatar = avatar 
                    }
                }
                else{
                    if(!message[index].name.includes('strong')){
                        var name = "<strong class='f_roboto cursor-pointer comment_user'>" +  message[index].name + "</strong>"
                        message[index].name = name
                    }
                    if(!message[index].avatar.includes(this.base)){
                        var avatar = this.base + message[index].avatar
                        message[index].avatar = avatar 
                    }
                }
            }
            return message
        },
        async bringConversation(uuid_user,uuid_user_addressee){
            let obj = {
                uuid_user , uuid_user_addressee
            }
            this.$q.loading.show()
			await this.$store.dispatch("Message/loadConversation", obj).then(res => {
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
                    console.log('res',res)
                    this.messages = []
                    var new_conversation = this.conversation
                    this.messages = this.parseConversation(new_conversation)
                    console.log('conversation',this.messages)
                    
				}
			}).catch(err => {
				console.log(err)
			})
        }
	},
	components: {
	},

	created () {
        console.log('$ss_u', this.$ss_u)
        console.log('$avatar', this.$avatar)
		const token = localStorage.getItem('token')
		const datos = getUserFromToken(token)
		this.username = datos.datosUsuario.username
		this.ss_u = datos.datosUsuario.uuid_user
		if(datos.datosUsuario.avatar){
			this.src_avatar = datos.datosUsuario.avatar
        }
        // this.initSubscriptions()
        this.home(this.ss_u)
        
        // this.$root.$on('update_home', (data) => {
        //     console.log('update_home',data)
        //     if(data){
        //         this.home(this.$ss_u)
        //         this.up_home++;
        //         console.log('up_home++',data)
        //     }
        //     else{
        //         this.up_home--
        //     }
            
        // });
	},
	mounted () {
        // this.$refs.scrollArea.setScrollPosition(9999)
        // if(this.photo_view){
        //     var speed = 0;
        //     var scroll = 0;
        //     var container = $('.carousel-frame');
        //     var container_w = container.width();
        //     var max_scroll = container[0].scrollWidth - container.outerWidth();
        //     var prev_frame = new Date().getTime();
        //     container.on('mousemove', function (e) {
        //         var mouse_x = e.pageX - container.offset().left;
        //         var mouseperc = 100 * mouse_x / container_w;
        //         speed = mouseperc - 50;
        //     }).on('mouseleave', function () {
        //         speed = 0;
        //     });

        //     function updatescroll() {
        //         var cur_frame = new Date().getTime();
        //         var time_elapsed = cur_frame - prev_frame;
        //         prev_frame = cur_frame;
        //         if (speed !== 0) {
        //             scroll += speed * time_elapsed / 50;
        //             if (scroll < 0) scroll = 0;
        //             if (scroll > max_scroll) scroll = max_scroll;
        //             $('.carousel-frame').scrollLeft(scroll);
        //         }
        //         console.log('Speed: ' + speed);
        //         console.log('Scroll: ' + scroll);
        //         window.requestAnimationFrame(updatescroll);
        //     }
        //     window.requestAnimationFrame(updatescroll);
        // }
	},
	updated () {
	},
    watch: {
        'incomingMessage': function () {
            console.log('Nuevo Message ', this.incomingMessage)
            // let add_Message = this.addIncommingMessage(this.incomingMessage)
            this.items.unshift(add_Message)
            // this.up_home++
        },
    }

})
