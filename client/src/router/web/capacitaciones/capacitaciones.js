import Capacitaciones from "@/pages/web/capacitaciones/index.vue";

export default [
	{
		path: "/capacitaciones",
		component: Capacitaciones,
		name: "Capacitaciones",
		beforeEnter(to, from, next) {
			if (!localStorage.getItem("token")) {
				next("/login");
			} else {
				next();
			}
		}
	}
];
