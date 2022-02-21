import Vue from 'vue'
import { mapGetters } from 'vuex'
export default Vue.component('Historia', {
    $validates: 1,
    components:{
        // tabla:() => import('./tabla/tabla.vue')
    },
	data () {
		return {
            src_fondo:'statics/sobrenosotros.png',
            src_persona:'statics/5.jpg',
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
