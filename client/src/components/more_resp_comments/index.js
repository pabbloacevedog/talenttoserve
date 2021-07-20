import Vue from 'vue'
import { mapGetters } from 'vuex'
import $ from 'jquery'
export default Vue.component('MoreRespComments', {
	$validates: 1,
	data () {
		return {
			base : process.env.BASE_URL,
            src_avatar: localStorage.getItem('src_avatar'),
            avatar_default: '../../statics/user.png',
            icom: 2,
            iresp: 2,
            update_compotent:1,
            responder_comentario: false,
            responder_comentario_user: false,
            min_resp:1,
            min_com:2,
            t_resp:0,
            n_com:0,
            n_resp:0,
            total_com:0,
            moreComs :true,
            moreRespComs :true,
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
        'remaining',
        'funciones',
    ],
	computed: {
		...mapGetters({ 
            error: "Global/error",
        })
	},
	methods: {
	},
	components: {
	},
	created () {
        console.log(this.remaining)
	},
	mounted () {
	},
	updated () {
	},
    watch: {
    }

})
