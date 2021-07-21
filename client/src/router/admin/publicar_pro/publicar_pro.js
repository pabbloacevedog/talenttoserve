import Publicar_pro from '@/pages/admin/publicar_pro/index.vue'


export default [

	{
		path : '/admin/publicar_pro',
		component : Publicar_pro,
		name: 'Publicar_pro',
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
