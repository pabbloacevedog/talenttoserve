import {crearRouter} from "@utils/crearRouter";
import CryptoJS from 'crypto-js'
export default ({router}) => {
	let user = localStorage.getItem("token")
	if(user){
		var pass = process.env.PASSPHRASE
        var d = localStorage.getItem("rutas")
        var decrypted = d ? CryptoJS.AES.decrypt(d, pass).toString(CryptoJS.enc.Utf8) : null
		let data = JSON.parse(decrypted)
		if (data) {
			//Aquí es para evitar que los usuarios actualicen manualmente la página, la aplicación completa se recargue, la ruta agregada de forma dinámica desaparecerá, por lo que volveremos a agregarla una vez.
			let routes = [];
			routes = crearRouter(data);
			router.addRoutes(routes);
			localStorage.removeItem("isLoadNodes")
		}
	}
	router.beforeEach((route, redirect, next) => {
		var pass = process.env.PASSPHRASE
        var d = localStorage.getItem("rutas")
        var decrypted = d ? CryptoJS.AES.decrypt(d, pass).toString(CryptoJS.enc.Utf8) : null
		let data = JSON.parse(decrypted)
		if (data && route.path === "/login") {
			// Aquí no se usa el enrutador para saltar, porque, al saltar a la página de inicio de sesión, debe volver a iniciar sesión, obtener los datos, esta vez, agregará las reglas de enrutamiento a la instancia del enrutador nuevamente,
			// Cuando next () salta, la página no se actualiza, las reglas anteriores aún existen, pero con la ubicación, la página se puede actualizar. Cuando se actualiza la página, se vuelve a cargar la aplicación completa.
			// Y hemos eliminado al usuario en sessionStorage antes de actualizar, por lo que no se ejecuta la ruta agregada anteriormente.
			// localStorage.removeItem("rutas")
			// localStorage.removeItem("isLoadNodes")
			window.location.href = "/";
			return false;
		}
		else{
			if (route.path) {
				next();
			} else {
				next({
					path: "/notFound"
				});
			}
		}
		// if (!data && route.path !== "/login") {
		// 	next({
		// 		path: "/login"
		// 	});
		// } else {
		// 	if (route.path) {
		// 		next();
		// 	} else {
		// 		next({
		// 			path: "/notFound"
		// 		});
		// 	}
		// }
	});
}
