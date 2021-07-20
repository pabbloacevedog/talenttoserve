import Vue from 'vue'
import VueRouter from 'vue-router'

import error from './routes'
import notFound from './notFound/notFound'
import menu from './menu/menu'
import Auth from './auth/auth'
import Home from './home/home'
import GestionCorte from './gestion_corte/gestion_corte'
import Asesoria from './asesoria/asesoria'
import MaterialCorte from './material_corte/material_corte'
import HistorialCorte from './historial_corte/historial_corte'
import Perfiles from './perfiles/perfiles'
import UnidadMedida from './unidad_medida/unidad_medida'
import Usuario from './Usuario/Usuario'
// import Auth from './olvido/olvido'
// import Registry from './registry/registry'

//se define la variable auxiliar como arreglo para agregar mas de una ruta de archivos externos.
const auxiliar = [];
//concatenamos las rutas y asignamos la variable route que usara vue router
const routes = auxiliar.concat(
  //aqui se agregan las rutas de los archivos o paginas del sistema
  error,
  GestionCorte,
  Asesoria,
  HistorialCorte,
  Home,
  MaterialCorte,
  Perfiles,
  UnidadMedida,
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
