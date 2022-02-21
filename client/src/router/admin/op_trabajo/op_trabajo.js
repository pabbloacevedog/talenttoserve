import OpTrabajo from "@/pages/admin/op_trabajo/index.vue";
import CryptoJS from "crypto-js";

export default [
	{
		path: "/admin/op_trabajo",
		component: OpTrabajo,
		name: "OpTrabajo",
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
