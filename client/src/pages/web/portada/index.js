import Vue from 'vue'
import { mapGetters } from 'vuex'
export default Vue.component('Portada', {
    $validates: 1,
    components:{
        // Historia:() => import('../historia/index.vue')
    },
	data () {
		return {
            src_fondo:'statics/img/inicio.png',
            src_logo:'statics/img/logo-clean.png',
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
