import Pais from "@/pages/admin/pais/index.vue";
import CryptoJS from "crypto-js";

export default [
	{
		path: "/admin/pais",
		component: Pais,
		name: "Pais",
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
