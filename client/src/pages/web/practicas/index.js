import Vue from "vue";
import { mapGetters } from "vuex";
export default Vue.component("Empleos", {
	$validates: 1,
	components: {
		// tabla:() => import('./tabla/tabla.vue')
	},
	data() {
		return {
			src_fondo: "statics/img/empleos.png",
			src_fondo: "statics/img/fondo_nosotros.jpg",
			src_persona: "statics/img/cocinero.png",
			filter: "",
			parametros_tabla: {
				tittle: "Oportunidades de Trabajo",
				acciones: [
					{
						accion: "Eliminar",
						icon: "delete",
						cmd: "eliminar"
					},
					{ accion: "Editar", icon: "update", cmd: "editar" }
				],
				navigationActive: false,
				filter: "",
				selected: [],
				pagination: {
					page: 1,
					rowsPerPage: this.getItemsPerPage()
				},
				selectedkey: "codigo",
				columns: [
					{
						name: "cargo",
						label: "cargo",
						align: "left",
						field: "cargo",
						sortable: true
					},
					{
						name: "descripcion",
						align: "center",
						label: "Descripción",
						field: "descripcion",
						sortable: true
					},
					{
						name: "link",
						align: "center",
						label: "Link",
						field: "link",
						sortable: true
					},
					{
						name: "hotel",
						align: "center",
						label: "Hotel",
						field: "hotel",
						sortable: true
					},
					{
						name: "web",
						align: "center",
						label: "Web",
						field: "web",
						sortable: true
					},
					{
						name: "banner",
						align: "center",
						label: "Banner",
						field: "banner",
						sortable: true
					},
					{
						name: "estado",
						align: "center",
						label: "Estado",
						field: "estado",
						sortable: true
					}
				],
				data: []
			},
			base: process.env.BASE_URL
		};
	},
	computed: {
		...mapGetters({
			isLogin: "Auth/isLogin",
			isAdmin: "Auth/isAdmin",
			dataOpPractica: "OpPractica/getData"
		}),
		cardContainerClass() {
			if (this.$q.screen.gt.xs) {
				return (
					"grid-masonry grid-masonry--" +
					(this.$q.screen.gt.sm ? "3" : "2")
				);
			}

			return void 0;
		},

		rowsPerPageOptions() {
			if (this.$q.screen.gt.xs) {
				return this.$q.screen.gt.sm ? [3, 6, 9] : [3, 6];
			}

			return [3];
		}
	},
	methods: {
		async iniciar() {
			this.$q.loading.show();
			await this.$store
				.dispatch("OpPractica/cargarOpPractica")
				.then(res => {
					this.$q.loading.hide();
					if (this.error) {
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
						console.log("dataOpPractica", this.dataOpPractica);
						this.parametros_tabla.data = this.dataOpPractica;
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		getItemsPerPage() {
			const { screen } = this.$q;
			if (screen.lt.sm) {
				return 3;
			}
			if (screen.lt.md) {
				return 6;
			}
			return 9;
		},
		truncate(input) {
			if (input.length > 200) return input.substring(0, 200) + "...";
			else return input;
		},
		truncate_cargo(input) {
			if (input.length > 27) return input.substring(0, 27) + "...";
			else return input;
		},
		truncate_hotel(input) {
			if (input.length > 35) return input.substring(0, 35) + "...";
			else return input;
		},
		mostrar_banner(banner) {
			return this.base + banner;
		}
	},
	created() {
		this.iniciar();
	},
	mounted() {},
	updated() {},
	watch: {
		"$q.screen.name"() {
			this.pagination.rowsPerPage = this.getItemsPerPage();
		}
	}
});
