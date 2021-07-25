import Proveedor from '@/pages/admin/proveedor/index.vue'


export default [

	{
		path : '/admin/proveedor',
		component : Proveedor,
		name: 'Proveedor',
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
