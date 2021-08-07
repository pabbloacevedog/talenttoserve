<template>
	<div id="q-app" dark>
        <MenuPublico v-if="!isAdmin && !isOnLoginPage()" />
		<Auth v-if="isOnLoginPage()" />
		<Menu v-if="isAdmin" />

	</div>
</template>

<script>
	import { mapGetters } from "vuex";
    window.$ = window.jQuery = require('jquery')
	export default {
		name: "App",
		computed: {
			...mapGetters({ isLogin: "Auth/isLogin", isAdmin: "Auth/isAdmin", error: "Auth/error" })
		},
        methods: {
            isOnLoginPage(){
                if(this.$route.path === '/login' || this.$route.path === '/registry') return true
            }
        }
	}
</script>

