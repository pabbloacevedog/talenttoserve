import Forget from "../../layouts/auth/forget/forget.vue";
import login from "../../layouts/auth/start/start.vue";
import Reset from "../../layouts/auth/reset/reset.vue";
import Registry from "../../layouts/auth/registry/registry.vue";

export default [
	{
		path: "/forget",
		component: Forget,
		beforeEnter(to, from, next) {
			if (!localStorage.getItem("token")) {
				next();
			} else {
				to("/");
			}
		}
	},
	{
		path: "/login",
		component: login,
		beforeEnter(to, from, next) {
			if (!localStorage.getItem("token")) {
				next();
			} else {
				to("/");
			}
		},
		// children: [
		// 	{
		// 		// name:'registro',
		// 		path: "/registry",
		// 		component: Registry,
		// 		beforeEnter(to, from, next) {
		// 			if (!localStorage.getItem("token")) {
		// 				next();
		// 			}
		// 		}
		// 	},
		// 	{
		// 		path: "/forget",
		// 		component: Forget,
		// 		beforeEnter(to, from, next) {
		// 			if (!localStorage.getItem("token")) {
		// 				next();
		// 			} else {
		// 				to("/");
		// 			}
		// 		}
		// 	}
		// ]
	},
	// {
	// 	// name:'registro',
	// 	path: "/registry",
	// 	component: Registry,
	// 	beforeEnter(to, from, next) {
	// 		if (!localStorage.getItem("token")) {
	// 			to("/registry");
	// 		}
	// 	}
	// },
	{
		name: "reset",
		path: "/reset/:token",
		component: Reset,
		beforeEnter(to, from, next) {
			if (!localStorage.getItem("token")) {
				next();
			} else {
				to("/");
			}
		}
	}
];
