import Networking from "@/pages/admin/networking/index.vue";
import CryptoJS from "crypto-js";

export default [
	{
		path: "/admin/networking",
		component: Networking,
		name: "Networking",
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
