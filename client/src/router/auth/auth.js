import Forget from '../../layouts/auth/forget/forget.vue'
import login from '../../layouts/auth/start/start.vue'
import Reset from '../../layouts/auth/reset/reset.vue'
import Registry from '../../layouts/auth/registry/registry.vue'
// import Profile from '../../layouts/auth/profile/profile.vue'
// import Header from '../../layouts/auth/header/header.vue'

export default [

	{
		path : '/forget',
		component : Forget,
		beforeEnter(to, from, next) {
            if(!localStorage.getItem("token")){
                next()
            }
		}
	},
	{
		path : '/login',
		component : login,
		beforeEnter(to, from, next) {

			if (!localStorage.getItem("token") ){
                next()
            }
		}
	},
	{
		name:'registro',
		path : '/registry',
		component: Registry,
		beforeEnter(to, from, next) {
			if(!localStorage.getItem("token")){
                next()
            }
		}
	},
	{
		name:'reset',
		path : '/reset/:token',
		component: Reset,
		beforeEnter(to, from, next) {
			if(!localStorage.getItem("token")){
                next()
            }
		}
	}


]
