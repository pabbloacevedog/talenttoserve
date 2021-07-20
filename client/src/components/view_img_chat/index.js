import Vue from 'vue'
import { mapGetters } from 'vuex'
import $ from 'jquery'
export default Vue.component('ViewImgChat', {
	$validates: 1,
	data () {
		return {
            base : process.env.BASE_URL,
            comment: '',
            resp_comment: '',
            id_coment_responder: '',
			dense:'',
			username: '',
			username: '',
            slide_viewer: 1,
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
        'funciones'
    ],
	computed: {
	},
	methods: {
        d(){
            this.item.leng
        }
	},
	components: {
	},
	created () {
        console.log(this.item)
	},
	mounted () {
	},
	updated () {
	},
    watch: {
    }

})
