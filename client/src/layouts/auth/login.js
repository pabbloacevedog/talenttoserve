 import Vue from 'vue'
 import {mapGetters} from 'vuex'
 import { Platform } from 'quasar'

 export default Vue.component('Auth',{


        data() {
            return {

            }

        },
        computed: {
            // ...mapGetters({ datosUsuarios: 'Auth/getDatosUsuarios', getDatosU: 'Auth/getDatosU',getError: 'Auth/error'}),


        },
        methods: {

        },
        created(){
			if(this.$route.params.username === undefined){
				if (!this.$route.params.token) {
					this.$router.push('/login')
				}
			}

        },
        mounted(){


        }
})
