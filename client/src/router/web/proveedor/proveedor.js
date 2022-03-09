import Proveedor from "@/pages/web/proveedor/index.vue";

export default [
	{
		path: "/proveedores",
		component: Proveedor,
		name: "Proveedores",
		beforeEnter(to, from, next) {
			if (!localStorage.getItem("token")) {
				next("/login");
			} else {
				next();
			}
		}
	}
];
