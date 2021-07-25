import OpTrabajo from '@/pages/admin/op_trabajo/index.vue'


export default [

	{
		path : '/admin/op_trabajo',
		component : OpTrabajo,
		name: 'OpTrabajo',
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
