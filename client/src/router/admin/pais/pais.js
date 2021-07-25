import Pais from '@/pages/admin/pais/index.vue'


export default [

	{
		path : '/admin/pais',
		component : Pais,
		name: 'Pais',
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
