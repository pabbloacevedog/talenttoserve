import Inscribete from "@/pages/admin/inscribete/index.vue";
import CryptoJS from "crypto-js";

export default [
	{
		path: "/admin/inscribete",
		component: Inscribete,
		name: "Inscribete",
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
