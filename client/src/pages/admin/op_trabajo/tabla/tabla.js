import Vue from 'vue'
export default Vue.component('tabla', {
    props:[
        'funciones',
        "parametros",
    ],
    name:'tabla',
    components:{
    },
	data () {
		return {
            base : process.env.BASE_URL
        }
	},
	computed: {

	},
	methods: {

	},
	components: {
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
