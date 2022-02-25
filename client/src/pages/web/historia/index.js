import Vue from 'vue'
import { mapGetters } from 'vuex'
export default Vue.component('Historia', {
    $validates: 1,
    components:{
        // tabla:() => import('./tabla/tabla.vue')
    },
	data () {
		return {
			src_fondo: "statics/img/fondo_historia.png",
			src_fondo_mobile: "statics/img/fondo_historia_mobile.png",
			src_persona: "statics/img/cocinero.png"
		};
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
