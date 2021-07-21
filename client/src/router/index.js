import Vue from 'vue'
import VueRouter from 'vue-router'

import error from './routes'
import notFound from './notFound/notFound'
import menu from './menu/menu'
import Auth from './auth/auth'
import Home from './admin/home/home'
import Asesoria from './admin/asesoria/asesoria'
import Capacitacion from './admin/capacitacion/capacitacion'
import Inscribete from './admin/inscribete/inscribete'
import Networking from './admin/networking/networking'
import Op_practica from './admin/op_practica/op_practica'
import Op_trabajo from './admin/op_trabajo/op_trabajo'
import Publicar_pro from './admin/publicar_pro/publicar_pro'
import Perfiles from './admin/perfiles/perfiles'
import Usuario from './admin/usuario/usuario'
// import Auth from './olvido/olvido'
// import Registry from './registry/registry'

//se define la variable auxiliar como arreglo para agregar mas de una ruta de archivos externos.
const auxiliar = [];
//concatenamos las rutas y asignamos la variable route que usara vue router
const routes = auxiliar.concat(
  //aqui se agregan las rutas de los archivos o paginas del sistema
  error,
  Asesoria,
  Capacitacion,
  Inscribete,
  Networking,
  Op_practica,
  Op_trabajo,
  Publicar_pro,
  Home,
  Perfiles,
  Usuario,
  notFound,
  menu,
  Auth,
)
Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */
export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  return Router
}
