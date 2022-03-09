import Registry from "@/layouts/auth/registry/registry.vue";

export default [
	{
		name: "Registry",
		path: "/registry",
		component: Registry,
		beforeEnter(to, from, next) {
			if (!localStorage.getItem("token")) {
				next();
			}
			else{
				next('/')
			}
		}
	}
];
