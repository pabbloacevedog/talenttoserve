import Asesorias from "@/pages/web/asesorias/index.vue";

export default [
	{
		path: "/asesorias",
		component: Asesorias,
		name: "Asesorias",
		beforeEnter(to, from, next) {
			if (!localStorage.getItem("token")) {
				next("/login");
			} else {
				next();
			}
		}
	}
];
