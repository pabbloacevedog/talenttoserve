import Vue from 'vue'
import { mapGetters } from 'vuex'
import CryptoJS from 'crypto-js'

export default Vue.component('Login', {
    $validates: true,
    data () {
        return {
            email: '',
            password: '',
			error_: '',
			username:'',
			isPwd: true,
			avatar_default: '../statics/user.png',
			lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        }
	},
	computed: {
		...mapGetters({ isLogin: "Auth/isLogin", error: "Auth/error" })
	},
    methods: {
        async authenticate () {
			this.$q.loading.show()
			const {email, password} = this
			var self = this
			var pass = process.env.PASSPHRASE;
            var encrypted = CryptoJS.AES.encrypt(password, pass);
			await this.$store.dispatch("Auth/login", {
				email: email,
				password: encrypted.toString()
			}).then(res => {
				this.$q.loading.hide()
				if(this.error){
					var message = this.error.message.replace('GraphQL error: ','')
					this.$q.notify({
						message: message,
						timeout: 3000,
						type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
						position: 'bottom',
						icon: 'report_problem'
					})
				}
				else{
					this.$q.notify({
						message: "Sesión iniciada correctamente",
						timeout: 3000,
						type: 'positive',// Available values: 'positive', 'negative', 'warning', 'info'
						position: 'bottom',
						icon: 'done_all'
					})
                    let data = JSON.parse(localStorage.getItem('rutas'))

					// location.reload();debugger
					this.$router.push(data[0].path)
				}
			}).catch(err => {
				console.log(err)
			})
		}
    },
    components: {
    },

    created () {
    },
    mounted () {

    },
    updated () {
    }

})
