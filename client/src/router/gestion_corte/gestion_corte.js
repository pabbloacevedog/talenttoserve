import Gestion_corte from '../../pages/gestion_corte/index.vue'


export default [

	{
		path : '/gestion_corte',
		component : Gestion_corte,
		name: 'gestion_corte',
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
