import Vue from 'vue'
import { mapGetters } from 'vuex'
import {scroll} from 'quasar'

const {getScrollTarget, setScrollPosition} = scroll
export default Vue.component('MenuPublico', {
    $validates: 1,
    components:{
        
    },
	data () {
		return {
            menu:[
                {name: 'Areas', path:'/areas', icon: '', tag: ' '},
                {name: 'Clientes', path:'/clientes', icon: '', tag: '#clientes'},
                {name: 'Contacto', path:'/Contacto', icon: '', tag: '#contacto'},
                {name: 'Empleos', path:'/empleos', icon: '', tag: '#empleos'},
                {name: 'Practicas laborales', path:'/practicas', icon: '', tag: '#practicas'},
                {name: 'Nosotros', path:'#nosotros', icon: '', tag: '#nosotros'},
            ],
            src_logo: '../../statics/icono.png',
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
            const offset = el.offsetTop - 65
            const duration = 800
            setScrollPosition(target, offset, duration)
        }
	},
	created () {

	},
	mounted () {
	},
	updated () {
	},
    watch: {
        

    }

})
