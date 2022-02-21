import Vue from 'vue'
import { mapGetters } from 'vuex'
export default Vue.component("Contacto", {
	$validates: 1,
	components: {
		// tabla:() => import('./tabla/tabla.vue')
	},
	data() {
		return {
			src_logo: "../../statics/icono.png",
			src_fondo: "statics/img/fondo_historia.png",
			bandera_mexico: "statics/b_mexico.jpg",
			bandera_chile: "statics/b_chile.png",
			img_contacto: "statics/contact.png",
			icono_instagram: "statics/instagram.png",
			icono_facebook: "statics/facebook.png",
			icono_gmail: "statics/gmail.png",
			icono_whatsapp: "statics/whatsapp.png",
			icono_linkedin: "statics/linkedin.png",
			nombre: "",
			email: "",
			telefono: "",
			mensaje: "",
			columns: [
				{
					name: "name",
					required: true,
					label: "País",
					align: "left",
					field: row => row.name,
					sortable: false,
					classes: "ellipsis",
					style: "max-width: 100px",
					headerClasses: "bg-primary text-white"
				},
				{
					name: "value1",
					align: "left",
					label: "CHILE (Santiago de Chile)",
					field: "value1",
					sortable: false,
					headerClasses: "bg-primary text-white"
				},
				{
					name: "value2",
					label: "MÉXICO (Rivera Maya)",
					field: "value2",
					align: "left",
					sortable: false,
					headerClasses: "bg-primary text-white"
				}
			],
			data: [
				{
					name: "Contacto",
					value1: "Patricia Borges da Gama",
					value2: "Velia Orozcodel Valle",
					align: "left"
				},
				{
					name: "Correo",
					value1: "pborges@talenttoserve.com",
					value2: "vorozco@talenttoserve.com",
					align: "left"
				},
				{
					name: "Teléfono",
					align: "left",
					value1: "+56 972182998",
					value2: "+52 9983176839"
				}
			]
		};
	},
	computed: {
		...mapGetters({
			isLogin: "Auth/isLogin",
			isAdmin: "Auth/isAdmin"
		})
	},
	methods: {
		enviar(){
			{ name, email, telefono, mensaje } from = this
		}
	},
	created() {
		console.log("en compontente");
	},
	mounted() {},
	updated() {},
	watch: {}
});
