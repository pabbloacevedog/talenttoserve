import Vue from 'vue'
import { mapGetters } from 'vuex'
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
                {name: 'Historia', path:'#historia', icon: '', tag: '#historia'},
                {name: 'Nosotros', path:'#nosotros', icon: '', tag: '#nosotros'},
            ]
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

	},
	mounted () {
	},
	updated () {
	},
    watch: {

    }

})
