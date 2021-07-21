import Usuario from '@/pages/admin/usuario/index.vue'


export default [

	{
		path : '/admin/usuario',
		component : Usuario,
		name: 'Usuario',
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
