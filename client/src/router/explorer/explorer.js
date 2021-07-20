import Explorer from '../../pages/explorer/explorer.vue'


export default [

	{
		path : '/explorer',
		component : Explorer,
		name: 'explorer',
		beforeEnter(to, from, next) {
			if (!localStorage.getItem("token") ){
                next('/login')
			}
			else{
				next()
			}
		}
	}
]
