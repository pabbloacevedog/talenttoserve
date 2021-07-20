import Vue from 'vue'
import { mapGetters } from 'vuex'
import $ from 'jquery'
export default Vue.component('CardProfile', {
	$validates: 1,
	data () {
		return {
            base : process.env.BASE_URL,
            comment: '',
            up_card:2,
            resp_comment: '',
            id_coment_responder: '',
			dense:'',
			username: '',
			username: '',
            slide: 1,
            type_comment:0,
            src_avatar: localStorage.getItem('src_avatar'),
            avatar_default: '../../statics/user.png',
            data_comment: {
                id_post:"id_post" ,
                id_comment:"id_comment" ,
                id_resp_comment:"id_resp_comment",
                ss_u:"ss_u",
                uuid_user_comment:"uuid_user_comment"
            },
        }
    },
    props: [
        'item',
        'funciones',
        'index',
        
    ],
	computed: {
	},
	methods: {
	},
	components: {
	},
	created () {
        // console.log(this.item)
        // this.$root.$on('update_home', (data) => {
        //     console.log('update_home',data)
        //     if(data){
        //         this.up_card++;
        //         console.log('up_card++',data)
        //     }
        //     else{
        //         this.up_home--
        //     }
            
        // });
	},
	mounted () {
	},
	updated () {
	},
    watch: {
    }

})
