import Networking from '@/pages/admin/networking/index.vue'


export default [

	{
		path : '/admin/networking',
		component : Networking,
		name: 'Networking',
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
