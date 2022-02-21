import Asesoria from "@/pages/admin/asesoria/index.vue";
import CryptoJS from "crypto-js";

export default [
	{
		path: "/admin/asesoria",
		component: Asesoria,
		name: "Asesoria",
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
