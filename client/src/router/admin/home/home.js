import Home from '@/pages/admin/home/index.vue'


export default [

	{
		path : '/admin/home',
		component : Home,
		name: 'Home',
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
