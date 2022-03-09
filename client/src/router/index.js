import Vue from "vue";
import VueRouter from "vue-router";

import error from "./routes";
import notFound from "./notFound/notFound";
import menu from "./menu/menu";
import MenuPublico from "./menu_publico/menu_publico";
import Auth from "./auth/auth";
// import Home from './admin/home/home'
// import Portada from './web/portada/portada'
import Asesoria from "./admin/asesoria/asesoria";
import Pais from "./admin/pais/pais";
import Cargo from "./admin/cargo/cargo";
import Capacitacion from "./admin/capacitacion/capacitacion";
import Inscribete from "./admin/inscribete/inscribete";
import Networking from "./admin/networking/networking";
import OpPractica from "./admin/op_practica/op_practica";
import OpTrabajo from "./admin/op_trabajo/op_trabajo";
import Proveedor from "./admin/proveedor/proveedor";
import Perfiles from "./admin/perfiles/perfiles";
import Usuario from "./admin/usuario/usuario";

import Areas from "./web/areas/areas";
import Clientes from "./web/clientes/clientes";
import Contacto from "./web/contacto/contacto";
import Empleos from "./web/empleos/empleos";
import Proveedores from "./web/proveedor/proveedor";
import Asesorias from "./web/asesorias/asesorias";
import Capacitaciones from "./web/capacitaciones/capacitaciones";
import Practicas from "./web/practicas/practicas";
import Inicio from "./web/inicio/inicio";
// import Auth from './olvido/olvido'
import Registry from "./auth/registry";
import Forget from "./auth/forget";
//se define la variable auxiliar como arreglo para agregar mas de una ruta de archivos externos.
const auxiliar = [];
//concatenamos las rutas y asignamos la variable route que usara vue router
const routes = auxiliar.concat(
	//aqui se agregan las rutas de los archivos o paginas del sistema
	error,
	//   Portada,
	Forget,
	Registry,
	Pais,
	Cargo,
	Asesoria,
	Capacitacion,
	Inscribete,
	Networking,
	OpPractica,
	OpTrabajo,
	Proveedor,
	//   Home,
	Perfiles,
	Usuario,
	notFound,
	menu,
	MenuPublico,
	Auth,
	Areas,
	Clientes,
	Contacto,
	Practicas,
	Empleos,
	Proveedores,
	Asesorias,
	Capacitaciones,
	Inicio
);
Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */
export default function(/* { store, ssrContext } */) {
	const Router = new VueRouter({
		scrollBehavior: () => ({ y: 0 }),
		routes,

		// Leave these as is and change from quasar.conf.js instead!
		// quasar.conf.js -> build -> vueRouterMode
		mode: process.env.VUE_ROUTER_MODE,
		base: process.env.VUE_ROUTER_BASE
	});

	return Router;
}
