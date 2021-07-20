import Vue from 'vue'
import { mapGetters } from 'vuex'
import $ from 'jquery'
export default Vue.component('CardUser', {
	$validates: 1,
	data () {
		return {
			img:'/statics/login.jpg',
			text: '',
			base : process.env.BASE_URL,
            message: '',
			dense:'',
			username: '',
			ss_u: '',
            src_avatar: localStorage.getItem('src_avatar'),
            avatar_default: '../../statics/user.png',
			con_fotos:[],
			items: [],
			file: null,
      		files: null,
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
        'funciones'
    ],
	computed: {
		...mapGetters({ 
            // conversation: "Message/getConversation", 
            error: "Message/error",
        })
	},
	methods: {

	},
	components: {
	},
	created () {
        console.log('c messagelist', this.item)
        // this.bringConversation()
	},
	mounted () {
	},
	updated () {
	},
    watch: {
        // 'conversation': function () {
        //     console.log('w conversation', this.item)
        //     // if(this.conversation){
        //     //     this.bringConversation()
        //     // }
            
        // },
    }

})
