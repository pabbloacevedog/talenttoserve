import Vue from 'vue'
import { mapGetters } from 'vuex'
export default Vue.component('Contacto', {
    $validates: 1,
    components:{
        // tabla:() => import('./tabla/tabla.vue')
    },
	data () {
		return {
			src_fondo:'statics/img/fondo_historia.png',
            src_persona:'statics/img/cocinero.png',
			nombre:'',
			email:'',
			telefono:'',
			mensaje:''
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
