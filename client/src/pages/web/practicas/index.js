import Vue from 'vue'
import { mapGetters } from 'vuex'
export default Vue.component('Clientes', {
    $validates: 1,
    components:{
        // tabla:() => import('./tabla/tabla.vue')
    },
	data () {
		return {
            src_fondo:'statics/img/cliente.png',
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
