import Vue from "vue";
import { mapGetters } from "vuex";
export default Vue.component("Forget", {
	$validates: true,
	data() {
		return {
			email: "",
			password: "",
			error_: "",
			username: "",
			isPwd: true,
			avatar_clean: "../statics/icono.png",
			lorem:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
		};
	},
	computed: {
		...mapGetters({ sendForget: "Auth/forget" })
	},
	methods: {
		async enviar() {
			const { email } = this;
			if (email) {
				this.$q.loading.show();
				await this.$store
					.dispatch("Auth/forget", {
						email: email
					})
					.then(res => {
						this.$q.loading.hide();
						if (!this.sendForget) {
							var message = this.error.message.replace(
								"GraphQL error: ",
								""
							);
							this.$q.notify({
								message: message,
								timeout: 3000,
								type: "negative", // Available values: 'positive', 'negative', 'warning', 'info'
								position: "bottom",
								icon: "report_problem"
							});
						} else {
							this.$q.notify({
								message:
									"Su password ha sido enviada al email " +
									email,
								timeout: 3000,
								type: "positive", // Available values: 'positive', 'negative', 'warning', 'info'
								position: "bottom",
								icon: "done_all"
							});
							this.email = "";
						}
					})
					.catch(err => {
						console.log(err);
					});
			} else {
				this.$q.notify({
					message: "Ingrese un email válido",
					timeout: 3000,
					type: "negative", // Available values: 'positive', 'negative', 'warning', 'info'
					position: "bottom",
					icon: "report_problem"
				});
			}
		}
	},
	components: {},

	created() {},
	mounted() {},
	updated() {}
});
