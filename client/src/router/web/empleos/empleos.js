import Empleos from '@/pages/web/empleos/index.vue'

export default [

	{
		path : '/empleos',
		component : Empleos,
		name: 'Empleos',
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
