import Vue from 'vue'
import { mapGetters } from 'vuex'
export default Vue.component('Inicio', {
    $validates: 1,
    components:{
        // tabla:() => import('./tabla/tabla.vue')
    },
	data () {
		return {
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
