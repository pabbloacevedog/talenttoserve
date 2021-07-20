import Vue from 'vue'
import { mapGetters } from 'vuex'
import $ from 'jquery'
export default Vue.component('Sections', {
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
            tabs :
            [
                { name: 'mails', icon: 'mail', label: 'Mails' },
                { name: 'alarms', icon: 'alarm', label: 'Alarms' },
                { name: 'movies', icon: 'movie', label: 'Movies' },
                { name: 'photos', icon: 'photo', label: 'Photos' },
                { name: 'videos', icon: 'slow_motion_video', label: 'Videos' },
                { name: 'addressbook', icon: 'people', label: 'Address Book' }
            ],
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
        'item'
    ],
	computed: {
		...mapGetters({ 
            // like_post: "Global/getLikePost", 
            // dislike_post: "Global/getDislikePost", 
            // like_comment: "Global/getLikeComment", 
            // dislike_comment: "Global/getDislikeComment", 
            // like_respcomment: "Global/getLikeRespcomment", 
            // dislike_respcomment: "Global/getDislikeRespcomment", 
            error: "Global/error",
        })
	},
	methods: {
        
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
