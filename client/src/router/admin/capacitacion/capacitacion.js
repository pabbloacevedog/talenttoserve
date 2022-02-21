import Capacitacion from "@/pages/admin/capacitacion/index.vue";
import CryptoJS from "crypto-js";

export default [
	{
		path: "/admin/capacitacion",
		component: Capacitacion,
		name: "Capacitacion",
		beforeEnter(to, from, next) {
			var isadmin = localStorage.getItem("perm");
			var decrypted = isadmin
				? CryptoJS.AES.decrypt(isadmin, process.env.PASSPHRASE)
				: false;
			if (!decrypted) {
				next("/login");
			} else {
				next();
			}
		}
	}
];
