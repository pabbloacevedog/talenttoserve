import Material_corte from '../../pages/material_corte/index.vue'


export default [

	{
		path : '/material_corte',
		component : Material_corte,
		name: 'material_corte',
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
