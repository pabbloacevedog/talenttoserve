import Vue from 'vue'
import { mapGetters } from 'vuex'
export default Vue.component('Nosotros', {
    $validates: 1,
    components: {
        // tabla:() => import('./tabla/tabla.vue')
    },
    data() {
        return {
			src_fondo: "statics/img/fondo_nosotros_final.png",
			// src_persona:'statics/img/nosotros.png',
			slide: 1,
			items: [
				{
					src: "statics/nosotros/patricia_borgues.png",
					nombre: "Patricia Borges da Gama",
					cargo:
						"Administrador Hotelero / Diplomado en Gestión Hotelera y Turismo",
					descripcion: `
                        32 Años en Hotelería/ Asume cargos a nivel gerencial en Área de
                        Operaciones en Chile, Portugal y Brasil. Participación en 3 aperturas
                        de Hoteles y en 4 de preaperturas y aperturas como asesora.
                        Docente durante 8 años en Asignaturas de Hotelería en 4
                        Universidades en Chile y México y 7 años como entrenadora de
                        varias cadenas hoteleras.
                        Fundadora y administradora de Service to Serve Consulting, y de
                        Talent to Serve (Portal Hotelero)
                        Hotel Ritz Carlton Santiago, Chile y en Lisboa, Portugal (Luxury),
                        Grand Hyatt Santiago, Chile (Luxury), Hotel Renaissance Santiago,
                        Chile (Upper Upscale), Hoteles Park Plaza Santiago, Chile
                        (Upscale),Hoteis Transamerica, Brasil (Upscale) Hotel Maksoud,
                        Brasil(Upscale)`
				},
				{
					src: "statics/nosotros/valeria_orozco.png",
					nombre: "Velia Orozco del Valle",
					cargo: `Licenciada en Ciencias de la Comunicación / MBA Master en
                    administración de negocios`,
					descripcion: `
                    Mas de 22 Años de experiencia profesional en comunicación y
                    Hotelería/ Asume cargos a nivel gerencial en Área de ventas y mkg
                    en Chile dirigiendo equipos comerciales.
                    Desarrollo de mercados México, Argentina, Brasil, Perú y Colombia.
                    Participación de la apertura de Ritz Carlton Santiago y de la
                    operación comercial en la fusión entre Marriott International y
                    Starwood hotels; dentro de la propiedad W Santiago.
                    Experiencia docente universitaria y magíster,Performance life and
                    balance coach, coach ejecutivo, Asesora de Imagen
                    Boards - 14 años como Directora en la Cámara Chilena Mexicana y
                    Presidenta de comité de networking y desarrollo de nuevos negocios
                    y como Directora de Santiago convention Bureau
                    `
				},
				{
					src: "statics/nosotros/natalia_ortiz.png",
					nombre: "Natalia Ortiz",
					cargo: `Administradora de Empresas Turísticas y Hoteleras`,
					descripcion: `
                    17 años de experiencia., comenzó su carrera en el área operativa
                    para luego continuar en el área de Ventas y Mercadeo. Ha trabajado
                    en cadenas como Marriott y Hilton liderando equipos comerciales.
                    Ha participado en 6 aperturas de hoteles tanto en Colombia como
                    en Chile, desde marcas de servicios limitados como Hampton hasta
                    propiedades de lujo como Conrad.
                    Tiene conocimiento en creación de presupuestos, desarrollo y
                    manejo de portafolio de clientes, reportes y presentaciones a
                    superiores, planeación estratégica de mercadeo, cumplimiento de
                    metas, entrenamiento y creación de material de ventas.
                    Mariott Bogotá, JW Marriott Bogotá, Hampton by Hilton
                    Barranquilla y Cartagena, Renaissance Santiago, Conrad
                    Cartagena, Hilton Garden Inn Barranquilla y Hilton Garden Inn
                    Santa Marta.`
				},
				{
					src: "statics/nosotros/emilio_bissoni.png",
					nombre: "Emilio Bissoni",
					cargo: `Administrador de Empresas`,
					descripcion: `
                    30 años en Hotelería/.Ha gestionado restaurantes y hoteles de
                    lujo, de servicio completo y de servicio limitado, en cinco cadenas
                    nternacionales. Como Gerente General o Gerente Corporativo de
                    Operaciones, ha liderado grupos de trabajo en Argentina, Brasil,
                    Chile, Colombia, Perú, Uruguay y USA.
                    Participó en el análisis de viabilidad, diseño conceptual, definición
                    de la oferta, desarrollo del proyecto, puesta en marcha y apertura
                    de hoteles en Buenos Aires, Santiago, Río de Janeiro, Florianópolis,
                    Miami, Lima y Bogotá, además de haber liderado el cambio de
                    bandera de hoteles en Argentina y Colombia.
                    Ha trabajado en todas las áreas operativas de un hotel hasta
                    alcanzar la posición de Gerente General en algunas de las
                    cadenas y hoteles más relevantes de América Latina`
				},
				{
					src: "statics/nosotros/roberto_castillo.png",
					nombre: "Roberto Castillo",
					cargo: `Contador Auditor`,
					descripcion: `
                        Mas de 30 años de experiencia en Hoteles de cadenas internacionales
                        y nacionales.
                        Aperturas, Puesta en Marcha, Implementación, Contabilidad.
                        Control de gestión y reportes segun USALI.
                        Cierres contables, balances, estado de resultados, emisión informes
                        de cierre, cálculo de variaciones, cuentas por pagar, cobrar,
                        proveedores, auditoría de ingresos, tesorería, Budget, Gestión
                        Operacional.
                        Hotel Sheraton Santiago ( Luxury ), Hotel Ritz Carlton Santiago
                        (Luxury), Hotel The Singular ( Luxury) , Hotel Noi ( Upper Upscale),
                        Hotel Hilton Garden Inn( Upscale)`
				},
				{
					src: "statics/nosotros/katherin_rodrigez.png",
					nombre: "Katherine Rodriguez",
					cargo: `Administradora de Empresas mencion Ventas y Marketing`,
					descripcion: `
                        Posee una experiencia de 20 años en la hotelería, trabajando en
                        las mejores cadenas internacionales del país
                        Inició su carrera en Sheraton Santiago Hotel by Starwood.
                        obteniendo cargos a nivel gerencial en The Ritz Carlton hotel by
                        Marriott - Grand Hyatt Santiago - Renaissance Santiago Hotel by
                        Marriott.
                        Su experiencia abarca las áreas de Recepción, Pisos ejecutivos,
                        gerencia nocturna, Capacitación, Ventas y Marketing para
                        Alimentos y bebidas, Spa and fitness center, Concierge y como
                        manager on duty.
                        `
				}
			]
		};
    },
    computed: {
        ...mapGetters({
            isLogin: "Auth/isLogin", isAdmin: "Auth/isAdmin"
        })
    },
    methods: {

    },
    created() {

        console.log('en compontente')
    },
    mounted() {
    },
    updated() {
    },
    watch: {

    }

})
