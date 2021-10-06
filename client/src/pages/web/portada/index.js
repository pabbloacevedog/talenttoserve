import Vue from 'vue'
import { mapGetters } from 'vuex'
import {scroll} from 'quasar'
const {getScrollTarget, setScrollPosition} = scroll
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
        scrollToElement(id) {
            let el = document.getElementById(id)
            const target = getScrollTarget(el)
            const offset = el.offsetTop - 0
            const duration = 150
            setScrollPosition(target, offset, duration)
        }
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
