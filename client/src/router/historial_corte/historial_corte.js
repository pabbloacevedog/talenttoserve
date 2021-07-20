import Historial_corte from '../../pages/historial_corte/index.vue'


export default [

	{
		path : '/historial_corte',
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
