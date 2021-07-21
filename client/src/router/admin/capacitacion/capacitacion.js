import Capacitacion from '@/pages/admin/capacitacion/index.vue'


export default [

	{
		path : '/admin/capacitacion',
		component : Capacitacion,
		name: 'Capacitacion',
		beforeEnter(to, from, next) {
			if (!localStorage.getItem("isAdmin") ){
                next('/login')
			}
			else{
				next()
			}
		}

	}
]
