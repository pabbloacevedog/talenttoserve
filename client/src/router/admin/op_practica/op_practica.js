import OpPractica from '@/pages/admin/op_practica/index.vue'


export default [

	{
		path : '/admin/op_practica',
		component : OpPractica,
		name: 'OpPractica',
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
