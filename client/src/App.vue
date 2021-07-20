<template>
	<div id="q-app" dark>
		<Auth v-if="!isLogin" />
		<Menu v-if="isLogin" />

	</div>
</template>

<script>
	import { mapGetters } from "vuex";
    window.$ = window.jQuery = require('jquery')
	export default {
		name: "App",
		computed: {
			...mapGetters({ isLogin: "Auth/isLogin", error: "Auth/error" })
		}
	}
</script>

