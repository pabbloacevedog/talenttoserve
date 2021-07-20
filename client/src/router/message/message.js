import Messages from '../../pages/messages/messages.vue'


export default [

	{
		path : '/messages',
		component : Messages,
		name: 'messages',
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
