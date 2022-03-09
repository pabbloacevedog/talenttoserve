import Forget from "@/layouts/auth/forget/forget.vue";

export default [
	{
		name: "Forget",
		path: "/forget",
		component: Forget,
		beforeEnter(to, from, next) {
			if (!localStorage.getItem("token")) {
				next();
			} else {
				next("/");
			}
		}
	}
];
