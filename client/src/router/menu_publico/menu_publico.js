import MenuPublico from '@/layouts/menu_publico/index.vue'
import Inicio from '@/pages/web/inicio/inicio.vue'

export default [

	{
		path : '/menu_publico',
		component : MenuPublico,
        // children: [
        //     // UserHome will be rendered inside User's <router-view>
        //     // when /user/:id is matched
        //     { path: '', component: Inicio }

        //     // ...other sub routes
        //   ]
	}
]
