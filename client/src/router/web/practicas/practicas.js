import Practicas from '@/pages/web/practicas/index.vue'

export default [

	{
		path : '/practicas',
		component : Practicas,
		name: 'Practicas',
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
