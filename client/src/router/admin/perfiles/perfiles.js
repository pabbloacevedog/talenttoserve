import Perfiles from "@/pages/admin/perfiles/index.vue";
import CryptoJS from "crypto-js";

export default [
	{
		path: "/admin/perfiles",
		component: Perfiles,
		name: "Perfiles",
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
