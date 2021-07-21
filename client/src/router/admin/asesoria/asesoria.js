import Asesoria from '@/pages/admin/asesoria/index.vue'


export default [

	{
		path : '/admin/asesoria',
		component : Asesoria,
		name: 'Asesoria',
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
