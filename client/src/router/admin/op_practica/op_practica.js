import OpPractica from "@/pages/admin/op_practica/index.vue";
import CryptoJS from "crypto-js";

export default [
	{
		path: "/admin/op_practica",
		component: OpPractica,
		name: "OpPractica",
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
