<template>
	<div id="q-app" dark>
		<Auth v-if="isOnLoginPage()" />
		<Registry v-else-if="isOnRegistryPage()" />
		<Forget v-else-if="isOnForgetPage()" />
		<Menu v-else-if="isAdminPage()" />
		<MenuPublico v-else />
	</div>
</template>

<script>
import { mapGetters } from "vuex";
window.$ = window.jQuery = require("jquery");
export default {
	name: "App",
	computed: {
		...mapGetters({
			isLogin: "Auth/isLogin",
			isAdmin: "Auth/isAdmin",
			error: "Auth/error"
		})
	},
	methods: {
		isOnLoginPage() {
			if (this.$route.path === "/login") return true;
		},
		isOnRegistryPage() {
			if (this.$route.path === "/registry") return true;
		},
		isOnForgetPage() {
			if (this.$route.path === "/forget") return true;
		},
		isAdminPage() {
			var res = this.$route.path.indexOf("admin");
			if (res !== -1) return true;
			else return false;
		}
	}
};
</script>
