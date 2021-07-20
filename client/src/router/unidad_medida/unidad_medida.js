import Unidad_medida from '../../pages/unidad_medida/index.vue'


export default [

	{
		path : '/unidad_medida',
		component : Unidad_medida,
		name: 'unidad_medida',
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
