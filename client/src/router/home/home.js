import Historial_corte from '../../pages/historial_corte/index.vue'


export default [

	{
		path : '/',
		component : Historial_corte,
		name: 'historial_corte',
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
