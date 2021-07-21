import Perfiles from '@/pages/admin/perfiles/index.vue'


export default [

	{
		path : '/admin/perfiles',
		component : Perfiles,
		name: 'Perfiles',
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
