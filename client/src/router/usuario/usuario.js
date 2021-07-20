import Usuario from '../../pages/usuario/index.vue'


export default [

	{
		path : '/usuario',
		component : Usuario,
		name: 'usuario',
		beforeEnter(to, from, next) {
			if (!localStorage.getItem("token") ){
                next('/login')
			}
			else{
				next()
			}
		}

	}
]
