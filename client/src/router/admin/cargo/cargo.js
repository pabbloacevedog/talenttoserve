import Cargo from "@/pages/admin/cargo/index.vue";
import CryptoJS from "crypto-js";

export default [
	{
		path: "/admin/cargo",
		component: Cargo,
		name: "Cargo",
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
