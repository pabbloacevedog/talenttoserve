import Cargo from '@/pages/admin/cargo/index.vue'


export default [

	{
		path : '/admin/cargo',
		component : Cargo,
		name: 'Cargo',
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
