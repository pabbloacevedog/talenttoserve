import Op_practica from '@/pages/admin/op_practica/index.vue'


export default [

	{
		path : '/admin/op_practica',
		component : Op_practica,
		name: 'Op_practica',
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
