import Vue from "vue";
import { mapGetters } from "vuex";
import CryptoJS from "crypto-js";

export default Vue.component("Registry", {
	$validates: 1,
	data() {
		return {
			email: "",
			avatar_default: "../statics/image55.png",
			avatar_clean: "../statics/icono.png",
			password: "",
			nombre: "",
			apellido: "",
			usuario: "",
			producto_empresa:'',
			id_perfil: [],
			id_pais: "",
			rut: "",
			telefono: "",
			confirm: "",
			repassword: "",
			title: "Registro",
			items: [],
			isPwd: true,
			error_rut: false,
			alert: false,
			date: "2019/02/01",

			perfiles: [
				{
					label: "Postulante",
					value: "1"
				},
				{
					label: "Proveedor",
					value: "3"
				},
				{
					label: "Hotel",
					value: "4"
				}
			]
		};
	},
	props: {},
	computed: {
		...mapGetters({
			isLogin: "Registry/isLogin",
			error: "Registry/error",
			allPass: "Auth/getAllPass",
			paises: "Pais/getData"
		})
	},
	methods: {
		async iniciar() {
			this.$q.loading.show();
			await this.$store
				.dispatch("Pais/cargarPais")
				.then(res => {
					this.$q.loading.hide();
					console.log('paises', this.paises)

				})
				.catch(err => {
					console.log(err);
				});
		},
		async register() {
			this.$q.loading.show();
			const {
				email,
				password,
				id_perfil,
				nombre,
				telefono,
				id_pais,
				nombre_empresa,
				cargo,
				producto_empresa,
				universidad,
				carrera
			} = this;

			var perfil = id_perfil.value;
			var pass = process.env.PASSPHRASE;
			var encrypted = CryptoJS.AES.encrypt(password, pass);
			await this.$store
				.dispatch("Registry/registry", {
					email,
					password,
					id_perfil: perfil,
					nombre,
					telefono,
					id_pais,
					nombre_empresa,
					cargo,
					producto_empresa,
					universidad,
					carrera,
					password: encrypted.toString()
				})
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
						this.$q.notify({
							message: "Login success",
							timeout: 3000,
							type: "positive", // Available values: 'positive', 'negative', 'warning', 'info'
							position: "bottom",
							icon: "done_all"
						});
						// location.reload();
						this.$router.push("/");
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		async SetNewPass() {
			// this.$q.loading.show()
			var todos = [];
			// array.forEach(element => {

			// });
			var newObj = this.allPass.map(user => {
				user.password_new = user.password;
				user.passphrase = user.password;
				return user;
			});
			console.log("newObj", newObj);
			await this.$store
				.dispatch("Auth/SetNewPass", { users: newObj })
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
						this.$q.notify({
							message: "Usuarios actualizados correctamente!",
							timeout: 3000,
							type: "positive", // Available values: 'positive', 'negative', 'warning', 'info'
							position: "bottom",
							icon: "done_all"
						});
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		perfil_view() {
			console.log(this.id_perfil);
		},
		async UpdatePass() {
			await this.$store
				.dispatch("Auth/getPassUsers")
				.then(res => {
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
						console.log(
							"Are here! " + this.allPass.length,
							this.allPass
						);
						// this.SetNewPass()
					}
				})
				.catch(err => {
					console.log(err);
				});
			console.log("Updating...");
		},
		formatearRut() {
			this.rut = this.$general.formatear_rut(this.rut);
		},
		validarRut() {
			if (this.rut != "") {
				var valido = this.$general.validar_rut(
					this.rut
						.split(".")
						.join("")
						.split("-")
						.join("")
				);

				if (valido) {
					this.error_rut = false;
				} else {
					this.error_rut = true;
				}
			}
		},
		format() {
			var rutAndDv = splitRutAndDv(this.rut);
			var cRut = rutAndDv[0];
			var cDv = rutAndDv[1];
			if (!(cRut && cDv)) {
				return cRut || this.rut;
			}
			var rutF = "";
			var thousandsSeparator = useThousandsSeparator ? "." : "";
			while (cRut.length > 3) {
				rutF = thousandsSeparator + cRut.substr(cRut.length - 3) + rutF;
				cRut = cRut.substring(0, cRut.length - 3);
			}
			return cRut + rutF + "-" + cDv;
		}
	},
	components: {},

	created() {
		this.iniciar();
	},
	mounted() {},
	updated() {}
});
