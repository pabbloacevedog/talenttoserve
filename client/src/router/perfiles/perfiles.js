import Perfiles from '../../pages/perfiles/index.vue'


export default [

	{
		path : '/perfiles',
		component : Perfiles,
		name: 'perfiles',
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
