import Vue from 'vue'
export default Vue.component('notFound', {
    data() {
        return {

            toggle: null,
            items: [
                { icon: 'format_align_left', value: 1 },
                { icon: 'format_align_center', value: 2 },
                { icon: 'format_align_right', value: 3 },
                { icon: 'format_align_justify', value: 4 }
            ]
        }
    },
    methods: {
        inicio(){
			if(this.$route.path === '/')
			{
				location.reload();
			}
			else{
				this.$router.push('/')
			}
        },
    }
})
