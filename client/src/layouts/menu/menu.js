import Vue from 'vue'
import { openURL } from "quasar";
import { mapGetters } from 'vuex'
import { colors } from 'quasar'
import {getUserFromToken} from '@utils/authService'

export default Vue.component('Menu', {
	components: {
	},
	data() {
		return {
			leftDrawerOpen: this.$q.platform.is.desktop,
			nodes: this.$router.options.routes,
			src_logo: '../../statics/icono.png',
            src_avatar: localStorage.getItem('src_avatar'),
            base : process.env.BASE_URL,
			username: true,
            bluetooth: false,
            
			menuList: {},
			link: "",
			nombre: "",
			alias: "",
			email: "",
            text:'',
            miniState: true,
            mostrarDrawer: false,
		}
	},
	props: {
	},
	computed: {
		...mapGetters({ 
            getMenu: 'Menu/getMenu'},{ isLogin: "Auth/isLogin", error: "Auth/error" })
	},
	methods: {
		openURL,
		logout() {
			this.$q.loading.show()
			this.$store.dispatch("Auth/logout", {}).then(res => {
				this.$q.loading.hide()
				this.$router.push('/login')

				// location.reload();
			}).catch(err => {
				console.error("ERROR: ", err)
			})
		},
		cargarDatos(){
			this.$store.dispatch("Menu/getDatos", {}).then(res =>{
				this.menuList = this.getMenu

				// console.log('menu ',this.menuList)
			}).catch(err => {
				console.log("ERROR: ", err)
			})
		},
		explorar(){

		},
		goProfile(){
			this.$router.push('/'+this.username)
        },
        ir_home(){
            if(this.$route.name == 'home'){
                location.reload();
            }
            else{
                this.$router.push('/')
            }
        },
        getDatosUser(datos){
            if(datos.avatar){
                this.src_avatar = this.base + datos.avatar
            }
            
            this.usuario = datos.usuario
			this.nombre = datos.nombre 
        },
	},
	created() {
		if (!this.isLogin) {
            var d = localStorage.getItem("rutas")
            var decrypted = d ? CryptoJS.AES.decrypt(s, process.env.PASSPHRASE) : null
            let data = JSON.parse(decrypted)
			this.nodes.push(...data)
			localStorage.setItem('isLoadNodes', 'true')
			const token = localStorage.getItem('token')
            const datos = getUserFromToken(token)
            this.getDatosUser(datos.datosUsuario)
		}
		this.cargarDatos()

	},
	mounted() {
	},
	watch: {
        '$route': function () {
            console.log(this.$route)
            this.link = this.$route.path
        }
	}


})
