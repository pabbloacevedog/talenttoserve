import Vue from 'vue'
import { mapGetters } from 'vuex'
export default Vue.component('Areas', {
    $validates: 1,
    components:{
        // tabla:() => import('./tabla/tabla.vue')
    },
	data () {
		return {
            src_persona:'statics/img/areas_img.png',
			icon_consultoria:'statics/icons/message-glass.png'
        }
	},
	computed: {
		...mapGetters({ 
            isLogin: "Auth/isLogin", isAdmin: "Auth/isAdmin"
        })
	},
	methods: {

	},
	created () {
        
        console.log('en compontente')
	},
	mounted () {
	},
	updated () {
	},
    watch: {

    }

})
