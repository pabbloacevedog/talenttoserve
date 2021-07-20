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

        }
	},
	computed: {

	},
	methods: {

	},
	components: {
	},

	created () {
        console.log(this.funciones)
	},
	mounted () {
	},
	updated () {
	},
    watch: {
    }

})
