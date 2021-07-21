import Inscribete from '@/pages/admin/inscribete/index.vue'


export default [

	{
		path : '/admin/inscribete',
		component : Inscribete,
		name: 'Inscribete',
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
