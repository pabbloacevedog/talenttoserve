
// const routes = [
//   {
//     path: '/',
//     component: () => import('layouts/MyLayout.vue'),
//     children: [
//       { path: '', component: () => import('pages/Index.vue') }
//     ]
//   }
// ]
const routes = []
// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('layouts/notFound/notFound.vue')
  })
}

export default routes
