import Proveedor from "@/pages/admin/proveedor/index.vue";
import CryptoJS from "crypto-js";

export default [
	{
		path: "/admin/proveedor",
		component: Proveedor,
		name: "Proveedor",
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
