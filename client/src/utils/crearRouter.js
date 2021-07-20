export  function crearRouter(data) {
	var routers = []
	data.forEach((item) => {
        let menu = Object.assign({}, item)
        // debugger
		let componenteCreado = componente(menu.name, menu.carpet, menu.path)
		routers.push(componenteCreado)
	})
	return routers
}
function componente(name, carpet, path){
	return {
		path : path,
		component : () => import(`@/${carpet}/${name}/${name}.vue`)
	}
}
export  function crearRutas(data) {
	var rutas = []
	data.forEach((item) => {
		let menu = Object.assign({}, item)
		if(menu.addroute){
			var ruta = {
				component: menu.component,
				name: menu.name,
				path: menu.path,
				carpet: menu.carpet,
				order: menu.order_menu,
				icon: menu.icon,
				addmenu: menu.addmenu
			}
			rutas.push(ruta)
		}
	})
	return rutas
}
