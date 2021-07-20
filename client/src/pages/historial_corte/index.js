import Vue from 'vue'
import {getUserFromToken} from '@utils/authService'
import { mapGetters } from 'vuex'
export default Vue.component('HistorialCorte', {
    $validates: 1,
    components:{
        tabla:() => import('./tabla/tabla.vue'),
        LineChart:() => import('./grafico_cortes/grafico.vue'),
        BarChart:() => import('./grafico_planchas/grafico.vue')
    },
	data () {
		return {
            img:'@/statics/login.jpg',
            img_card_1:'../statics/card/card_1.jpg',
            img_card_2:'../statics/card/card_2.jpg',
            img_card_3:'../statics/card/card_3.jpg',
            icon_card_1:'img:../statics/card/sierra_mesa.svg',
            icon_card_2:'img:../statics/card/floor.svg',
            icon_card_3:'img:../statics/card/sierra.svg',
            nuevo_grosor: '',
            nuevo_material_corte:'',
            nuevo_unidad_medida:'',
            nuevo_estado : 
                {
                label: 'Activo',
                value: true
                }
            ,
            parametros_grafico:'',
            maximizedToggle: true,
            ancho_card:250,
            editar_id_historial_corte: '',
            editar_grosor: '',
            editar_material_corte:'',
            editar_unidad_medida:'',
            editar_estado : 
                {
                label: 'Activo',
                value: true
                }
            ,
            modal_nuevo: false,
            modal_eliminar: false,
            modal_editar: false,
            parametros_tabla:{
                PaginationLabel:'Filas por página',
                tittle: 'Historial de Cortes',
                acciones:[
                    { accion: 'Eliminar', icon: 'delete', cmd: 'eliminar'},
                ],
                navigationActive: false,
                filter: '',
                selected: [],
                pagination: {
                    rowsPerPage: 4
                },
                selectedkey: 'id_historial_corte', 
                visibleColumns: [ 'material_corte', 'alto_plancha', 'ancho_plancha', 'area_plancha_utilizada', 'total_cortes', 'ver'],
                columns: [
                  {
                    name: 'id_historial_corte',
                    label: 'ID',
                    align: 'left',
                    field: 'id_historial_corte',
                    sortable: true
                  },
                  { name: 'material_corte', align: 'center', label: 'Material Corte', field: 'material_corte', sortable: true },
                  { name: 'unidad_medida', align: 'center', label: 'Unidad medida', field: 'unidad_medida', sortable: true },
                  { name: 'grosor_sierra', align: 'center', label: 'Grosor sierra', field: 'grosor_sierra' , sortable: true},
                  { name: 'alto_plancha', align: 'center', label: 'Alto plancha', field: 'alto_plancha' , sortable: true},
                  { name: 'ancho_plancha', align: 'center', label: 'Ancho plancha', field: 'ancho_plancha' , sortable: true},
                  { name: 'area_plancha', align: 'center', label: 'Area plancha', field: 'area_plancha' , sortable: true},
                  { name: 'area_plancha_utilizada', align: 'center', label: 'Area utilizada', field: 'area_plancha_utilizada' , sortable: true},
                //   { name: 'area_plancha_restante', align: 'center', label: 'Area restante', field: 'area_plancha_restante' , sortable: true},
                  { name: 'total_cortes', align: 'center', label: 'Total Cortes', field: 'total_cortes' , sortable: true},
                  { name: 'ver', align: 'center', label: 'Ver', field: 'ver' , sortable: true},
                ],
                data: [
                ],
            },
            funciones:  {
                eliminar: this.eliminar,
                iniciar: this.iniciar,
                generar_grafico: this.generar_grafico,
                editar_fila: this.generar_grafico
            },
            funciones_cortes:  {
                cerrar_grafico: this.cerrar_grafico,
            },
            estados: [
				{
				label: 'Activo',
				value: true
				},
				{
				label: 'Inactivo',
				value: false
				}
            ],
            chartDataPlanchas: {
                labels: [],
                datasets: [
                    {
                    label: 'Planchas últimos 12 meses',
                    fontColor: 'white',
                    defaultFontColor : 'white',
                    backgroundColor: ['#6f0dc1'],
                    borderColor:'#c427f2 ',
                    pointBackgroundColor:'#c427f2 ',
                    borderWidth:1,
                    data: []
                    }
                ]
            },
            chartDataCortes: {
                labels: [],
                datasets: [
                    {
                    label: 'Cortes últimos 12 meses',
                    fontColor: 'white',
                    backgroundColor: ['#b40d38','#6d153d','#b40d38','#6d153d','#b40d38','#6d153d','#b40d38','#6d153d','#b40d38','#6d153d','#b40d38','#6d153d'],
                    data: []
                    }
                ]
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: true,
                    labels: {
                        fontColor: 'white'
                    },
                },
                scales: {
                    yAxes: [{
                        ticks: {
                        fontColor: '#00b2ff'
                        },
                    }],
                    xAxes: [{
                        ticks: {
                        fontColor: '#white'
                        },
                    }]
                }
            },
            modal_cortes_listos: false,
        }
	},
	computed: {
		...mapGetters({ 
            dataHistorialCorte: "HistorialCorte/getData", 
            registro_eliminado: "HistorialCorte/getEliminado",
            cortes_all: "HistorialCorte/getCortesAll",
            cortes_grafico: "HistorialCorte/getCortesGrafico",
            planchas_grafico: "HistorialCorte/getPlanchasGrafico",
            planchas_all: "HistorialCorte/getPlanchasAll",
            material_mas_usado: "HistorialCorte/getMaterialMasUsado",
            error: "HistorialCorte/error" , 
        }),
        estilo_grafico(){
            return {
                height: `40vh !important`,
                position: 'relative'
            }
        }
	},
	methods: {
        async iniciar () {
            this.$q.loading.show()
            await this.get_cortes_all()
            await this.get_cortes_grafico()
            await this.get_planchas_grafico()
            await this.get_planchas_all()
            await this.get_material_mas_usado()
			await this.$store.dispatch("HistorialCorte/cargarHistorialCorte").then(res => {
				this.$q.loading.hide()
				if(this.error){
					var message = this.error.message.replace('GraphQL error: ','')
					this.$q.notify({
						message: message,
						timeout: 3000,
						type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
						position: 'bottom',
						icon: 'report_problem'
					})
				}
				else{
                    this.parametros_tabla.data = this.dataHistorialCorte
				}
			}).catch(err => {
				console.log(err)
            })
        },
        async get_cortes_all () {
			await this.$store.dispatch("HistorialCorte/cargarCortesAll").then(res => {
				if(this.error){
					var message = this.error.message.replace('GraphQL error: ','')
					this.$q.notify({
						message: message,
						timeout: 3000,
						type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
						position: 'bottom',
						icon: 'report_problem'
					})
                }
			}).catch(err => {
				console.log(err)
			})
        },
        async get_material_mas_usado() {
			await this.$store.dispatch("HistorialCorte/cargarMaterialMasUsado").then(res => {
				if(this.error){
					var message = this.error.message.replace('GraphQL error: ','')
					this.$q.notify({
						message: message,
						timeout: 3000,
						type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
						position: 'bottom',
						icon: 'report_problem'
					})
                }
			}).catch(err => {
				console.log(err)
			})
        },
        async get_cortes_grafico () {
			await this.$store.dispatch("HistorialCorte/cargarCortesGrafico").then(res => {
				if(this.error){
					var message = this.error.message.replace('GraphQL error: ','')
					this.$q.notify({
						message: message,
						timeout: 3000,
						type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
						position: 'bottom',
						icon: 'report_problem'
					})
                }
			}).catch(err => {
				console.log(err)
			})
        },
        async get_planchas_grafico () {
			await this.$store.dispatch("HistorialCorte/cargarPlanchasGrafico").then(res => {
				if(this.error){
					var message = this.error.message.replace('GraphQL error: ','')
					this.$q.notify({
						message: message,
						timeout: 3000,
						type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
						position: 'bottom',
						icon: 'report_problem'
					})
                }
			}).catch(err => {
				console.log(err)
			})
        },
        cargarGraficos(){
            for (let index = 0; index < this.planchas_grafico.length; index++) {
                const total_mes = this.planchas_grafico[index].total_mes;
                const mes = this.planchas_grafico[index].mes;
                this.chartDataPlanchas.labels.push(mes)
                this.chartDataPlanchas.datasets[0].data.push(total_mes)
            }
            for (let index = 0; index < this.cortes_grafico.length; index++) {
                const total_mes = this.cortes_grafico[index].total_mes;
                const mes = this.cortes_grafico[index].mes;
                this.chartDataCortes.labels.push(mes)
                this.chartDataCortes.datasets[0].data.push(total_mes)
            }
        },
        async get_planchas_all () {
			await this.$store.dispatch("HistorialCorte/cargarPlanchasAll").then(res => {
				if(this.error){
					var message = this.error.message.replace('GraphQL error: ','')
					this.$q.notify({
						message: message,
						timeout: 3000,
						type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
						position: 'bottom',
						icon: 'report_problem'
					})
                }
			}).catch(err => {
				console.log(err)
			})
        },
        ir_gestor_cortes(){
            this.$router.push('/gestion_corte')
        },
        eliminar(){
            if(this.parametros_tabla.selected.length > 0){
                this.modal_eliminar = true
            }
            else{
                var mensaje = 'Debe seleccionar 1 registro de la tabla'
                this.$q.notify({
                    message: mensaje,
                    timeout: 3000,
                    color: 'negative',
                    position: 'bottom-left'
                })
            }
        },
        async guardar_eliminar(){
            this.$q.loading.show()
            await this.$store.dispatch("HistorialCorte/eliminarHistorialCorte", { id:this.parametros_tabla.selected}).then(res => {
                this.$q.loading.hide()
                if(this.error){
                    var message = this.error.message.replace('GraphQL error: ','')
                    this.$q.notify({
                        message: message,
                        timeout: 3000,
                        type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
                        position: 'bottom',
                        icon: 'report_problem'
                    })
                }
                else{
                    var mensaje = ''
                    if(this.parametros_tabla.selected.length < 1){
                        mensaje = this.parametros_tabla.selected.length + ' Registros Eliminados!'
                    }
                    else{
                        mensaje = 'Registro Eliminado!'
                    }
                    this.$q.notify({
                        message: mensaje,
                        timeout: 3000,
                        type: 'positive',// Available values: 'positive', 'negative', 'warning', 'info'
                        position: 'bottom',
                        icon: 'done_all'
                    })
                    this.modal_eliminar = false
                    this.parametros_tabla.selected = []
                }
            }).catch(err => {
                console.log(err)
            })
        },
        async cargar_x_screen(){
            console.log(this.$q.screen.width)
            if(this.$q.screen.width > 1919){
                this.x_screen = 2
                this.parametros_tabla.pagination.rowsPerPage = 7
            }
            else if(this.$q.screen.width < 1919 && this.$q.screen.width > 1439){
                this.x_screen = 2.5
                this.parametros_tabla.pagination.rowsPerPage = 5
            }
            else if(this.$q.screen.width < 1439 && this.$q.screen.width > 1023){
                this.x_screen = 3
                this.parametros_tabla.pagination.rowsPerPage = 4
            }
            else{
                this.x_screen = 4
                this.parametros_tabla.pagination.rowsPerPage = 10
            }
        },
        async generar_grafico(parametros){
            console.log(parametros)
            var par = JSON.parse(parametros.parametros)
            console.log(par)
            this.parametros_grafico = parametros
            this.modal_cortes_listos = true;
        },
        cerrar_grafico(){
            this.modal_cortes_listos = false;
        }

	},
	created () {
		const token = localStorage.getItem('token')
		const datos = getUserFromToken(token)
		this.username = datos.datosUsuario.username
		this.ss_u = datos.datosUsuario.uuid_user
		if(datos.datosUsuario.avatar){
			this.src_avatar = datos.datosUsuario.avatar
        }
        this.cargar_x_screen()
        this.iniciar()
        // this.cargarGraficos()
	},
	mounted () {
        // this.cargarGraficos()
	},
	updated () {
        if (this.chartDataPlanchas.labels.length === 0){
            this.cargarGraficos()
        }
        
	},
    watch: {
        'modal_eliminar': function () {
            if(this.modal_eliminar){
                var element = document.getElementById("q-app");
                element.classList.add("modal-open");
            }
            else{
                var element = document.getElementById("q-app");
                element.classList.remove("modal-open");
                this.parametros_tabla.data.length = 0
                this.iniciar()
            }
        },
        "$q.screen.width"() {
            this.cargar_x_screen()
        },
    },

})
