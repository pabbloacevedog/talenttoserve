import Usuario from "@/pages/admin/usuario/index.vue";
import CryptoJS from "crypto-js";

export default [
	{
		path: "/admin/usuario",
		component: Usuario,
		name: "Usuario",
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
