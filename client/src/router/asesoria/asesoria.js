import Asesoria from '../../pages/Asesoria/index.vue'


export default [

	{
		path : '/asesoria',
		component : Asesoria,
		name: 'Asesoria',
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
