import Vue from 'vue'
import {getUserFromToken} from '@utils/authService'
import { mapGetters } from 'vuex'
import { date } from 'quasar'
export default Vue.component('GestorCortes', {
    $validates: 1,
    components:{
        tabla:() => import('./tabla/tabla.vue')
    },
	data () {
		return {
            alto_plancha:183,
            ancho_plancha:240,
            alto_plancha_base:0,
            ancho_plancha_base:0,
            alto_corte_base:0,
            alto_acumulado:5,
            ancho_acumulado:5,
            n_fila:1,

            grafico_generado: false,
            x_screen: 1,
            ancho_corte_base:0,
            alto_corte:0,
            ancho_corte:0,
            cantidad_corte:0,
            largo_corte:0,
            area_plancha:0,
            area_plancha_utilizada:0,
            area_plancha_restante:0,
            area_corte:0,
            generado: false,
            creado: false,
            maximizedToggle: true,
            modal_cortes_listos: false,
            parametros_graficar:'',
            modal_recuperar_corte :false,
            fecha_corte_guardado:'',
            hora_corte_guardado:'',
            icono_sierra: '/statics/icons/sierra.png',
            img:'/statics/login.jpg',
            total_cortes:0,
            parametros_tabla:{
                tittle: 'Material Corte',
                navigationActive: false,
                filter: '',
                selected: [],
                pagination: {
                    rowsPerPage: 10 
                },
                selectedkey: 'id_material', 
                columns: [
                  { name: 'ancho', align: 'center', label: 'Ancho', field: 'ancho', sortable: true },
                  { name: 'alto', align: 'center', label: 'Alto', field: 'alto', sortable: true },
                  { name: 'cantidad', align: 'center', label: 'Cantidad', field: 'cantidad' , sortable: true},
                  { name: 'area_corte', align: 'center', label: 'Volumen en plancha', field: 'area_corte' , sortable: true},
                  { name: 'quitar', align: 'center', label: '', field: 'quitar' },
                ],
                unidad_medida_nuevo:[],
                data: [
                ],
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
            funciones_cortes:{
                desechar_corte: this.desechar_corte,
                guardar_corte_bd: this.guardar_corte_bd
            },
            funciones_tabla:{
                eliminar_fila: this.eliminar_fila,
            },
            options_grosor_sierra:[],
            options_material_corte:[],
            options_unidad_medida:[],
            grosor_sierra_nuevo:[],
            material_corte_nuevo:[],
            unidad_medida_nuevo:[],
            unidad_base:{},
        }
	},
	computed: {
		...mapGetters({ 
            dataGestorCortes: "GestorCortes/getData", 
            dataGrosorSierra: "GrosorSierra/getData", 
            dataMaterialCorte: "MaterialCorte/getData", 
            dataUnidadMedida: "UnidadMedida/getData", 
            dataUnidadBase: "UnidadMedida/getBase",
            registro_creado: "GestorCortes/getCreado",
            // error: "GestorCortes/error" , 
        })
	},
	methods: {
        async iniciar () {
			await this.$store.dispatch("GestorCortes/cargarGestorCortes").then(res => {
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
                    console.log('dataGestorCortes',this.dataGestorCortes)
				}
			}).catch(err => {
				console.log(err)
			})
        },
        async material_corte () {
			await this.$store.dispatch("MaterialCorte/cargarMaterialCorte").then(res => {
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
                    console.log('dataMaterialCorte',this.dataMaterialCorte)
                    for (let index = 0; index < this.dataMaterialCorte.length; index++) {
                        const nombre = this.dataMaterialCorte[index].nombre;
                        const valor = this.dataMaterialCorte[index].id_material;
                        const estado = this.dataMaterialCorte[index].estado;
                        if (estado == 1){
                            var obj = {
                                label : nombre,
                                value : valor
                            }
                            this.options_material_corte.push(obj)
                        }
                    }

				}
			}).catch(err => {
				console.log(err)
			})
        },
        async grosor_sierra(){
			await this.$store.dispatch("GrosorSierra/cargarGrosorSierra").then(res => {
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
                    console.log('dataGrosorSierra',this.dataGrosorSierra)
                    for (let index = 0; index < this.dataGrosorSierra.length; index++) {
                        const nombre = this.dataGrosorSierra[index].nombre;
                        const grosor = this.dataGrosorSierra[index].grosor;
                        const valor = this.dataGrosorSierra[index].id_grosor_sierra;
                        const estado = this.dataGrosorSierra[index].estado;
                        if (estado == 1){
                            var obj = {
                                label : nombre + ' (' + grosor + ' mm)',
                                value : valor,
                                grosor: grosor
                            }
                            this.options_grosor_sierra.push(obj)
                        }
                    }
				}
			}).catch(err => {
				console.log(err)
			})
        },

        async unidad_medida () {
			await this.$store.dispatch("UnidadMedida/cargarUnidadMedida").then(res => {
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
                    console.log('dataUnidadMedida',this.dataUnidadMedida)
                    for (let index = 0; index < this.dataUnidadMedida.length; index++) {
                        const nombre = this.dataUnidadMedida[index].nombre;
                        const valor = this.dataUnidadMedida[index].id_unidad_medida;
                        const unidad_conversion = this.dataUnidadMedida[index].unidad_conversion;
                        const acronimo = this.dataUnidadMedida[index].acronimo;
                        const estado = this.dataUnidadMedida[index].estado;
                        if (estado == 1){
                            var obj = {
                                label : nombre,
                                value : valor,
                                unidad_conversion: unidad_conversion,
                                acronimo: acronimo
                            }
                            this.options_unidad_medida.push(obj)
                        }
                    }
				}
			}).catch(err => {
				console.log(err)
            })
            // await this.cargarBase()
        },
        async cargarBase () {
			await this.$store.dispatch("UnidadMedida/cargarUnidadBase").then(res => {
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
                    console.log('dataUnidadBase',this.dataUnidadBase)
                    for (let index = 0; index < this.dataUnidadBase.length; index++) {
                        const base = this.dataUnidadBase[index].base;
                        if(base){
                            var obj = {
                                acronimo : this.dataUnidadBase[index].acronimo,
                                nombre: this.dataUnidadBase[index].nombre,
                                unidad: this.dataUnidadBase[index].unidad
                            }
                            this.unidad_base = obj
                        }
                        
                    }
				}
			}).catch(err => {
				console.log(err)
			})
        },
        validar_parametros(){
            var validar = false;
            if(this.ancho_corte <= 0){
                validar = true;
                this.$q.notify({
                    message: "El ancho de corte, no puede ser menor a 1",
                    timeout: 3000,
                    type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
                    position: 'bottom',
                    icon: 'report_problem'
                })
            }
            if(this.alto_corte <= 0){
                validar = true;
                this.$q.notify({
                    message: "El alto de corte, no puede ser menor a 1",
                    timeout: 3000,
                    type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
                    position: 'bottom',
                    icon: 'report_problem'
                })
            }
            if(this.cantidad_corte <= 0){
                validar = true;
                this.$q.notify({
                    message: "El cantidad, no puede ser menor a 1",
                    timeout: 3000,
                    type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
                    position: 'bottom',
                    icon: 'report_problem'
                })
            }
            if(this.material_corte_nuevo.length < 1){
                validar = true;
                this.$q.notify({
                    message: "Debe seleccionar material de corte",
                    timeout: 3000,
                    type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
                    position: 'bottom',
                    icon: 'report_problem'
                })
            }
            if(this.grosor_sierra_nuevo.length < 1){
                validar = true;
                this.$q.notify({
                    message: "Debe seleccionar grosor sierra",
                    timeout: 3000,
                    type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
                    position: 'bottom',
                    icon: 'report_problem'
                })
            }
            if(this.unidad_medida_nuevo.length < 1){
                validar = true;
                this.$q.notify({
                    message: "Debe seleccionar unidad de medida",
                    timeout: 3000,
                    type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
                    position: 'bottom',
                    icon: 'report_problem'
                })
            }
            return validar
        },
        anadir_corte(){
            var validar = this.validar_parametros()
            if(!validar){
                this.alto_corte_base = this.alto_corte * (this.unidad_medida_nuevo.unidad_conversion * this.unidad_base.unidad)
                this.ancho_corte_base = this.ancho_corte * (this.unidad_medida_nuevo.unidad_conversion * this.unidad_base.unidad)
                if (this.parametros_tabla.data.length == 0){
                    this.alto_plancha_base = this.alto_plancha * (this.unidad_medida_nuevo.unidad_conversion * this.unidad_base.unidad)
                    this.ancho_plancha_base = this.ancho_plancha * (this.unidad_medida_nuevo.unidad_conversion * this.unidad_base.unidad)
                    this.area_plancha = this.ancho_plancha_base * this.alto_plancha_base
                }
                if(this.area_plancha_restante == 0){
                    this.area_plancha_restante = this.area_plancha
                }
                var area_corte = ((this.alto_corte_base * this.ancho_corte_base ) / this.unidad_medida_nuevo.unidad_conversion) * this.cantidad_corte
                if(area_corte > this.area_plancha_restante){
                    this.$q.notify({
                        message: "El area de corte del corte ( "+area_corte+" mm) que esta añadiendo excede el total restante de la plancha ( " + this.area_plancha_restante + " mm). Se añadirá un nuevo panel si agrega más cortes",
                        timeout: 3000,
                        type: 'warning',// Available values: 'positive', 'negative', 'warning', 'info'
                        position: 'bottom',
                        icon: 'report_problem'
                    })
                }
                this.area_plancha_utilizada = this.area_plancha_utilizada + area_corte
                this.area_plancha_restante = (this.area_plancha / this.unidad_medida_nuevo.unidad_conversion) - this.area_plancha_utilizada
                this.total_cortes = this.total_cortes + Number(this.cantidad_corte)
                var obj = {
                    ancho : this.ancho_corte,
                    ancho_corte_base : this.ancho_corte_base,
                    alto: this.alto_corte,
                    alto_corte_base: this.alto_corte_base,
                    cantidad: this.cantidad_corte,
                    area_corte : area_corte,
                    unidad : this.unidad_medida_nuevo.acronimo,
                    ancho_plancha_base : this.ancho_plancha_base,
                    alto_plancha_base : this.alto_plancha_base,
                    ancho_plancha : this.ancho_plancha,
                    alto_plancha : this.alto_plancha,
                    area_plancha: this.area_plancha,
                    area_plancha_utilizada : this.area_plancha_utilizada,
                    area_plancha_restante : this.area_plancha_restante,
                    area_corte : area_corte,
                    unidad_medida_nuevo: this.unidad_medida_nuevo,
                    material_corte_nuevo: this.material_corte_nuevo,
                    grosor_sierra: this.grosor_sierra_nuevo.grosor,
                    total_cortes: this.total_cortes
                }
                this.parametros_tabla.data.push(obj);
                this.generado = true;
                this.ancho_corte = 0;
                this.alto_corte = 0;
                this.cantidad_corte = 0;
                this.guardar_corte(obj)
                
            }
        },
        async generar_corte() {
            this.$q.loading.show()
            this.$q.notify({
                message: "Generando corte",
                timeout: 3000,
                type: 'positive',// Available values: 'positive', 'negative', 'warning', 'info'
                position: 'bottom',
                icon: 'report_problem'
            })
            this.$q.loading.hide()
            this.mostrar_cortes()
        },
        async mostrar_cortes(){
            
            var obj = {
                material_corte : this.material_corte_nuevo.label,
                unidad_medida : this.unidad_medida_nuevo.label,
                grosor_sierra : this.grosor_sierra_nuevo.grosor,
                alto_plancha  : this.alto_plancha,
                ancho_plancha  : this.ancho_plancha,
                alto_plancha_base  : this.alto_plancha_base,
                ancho_plancha_base  : this.ancho_plancha_base,
                area_plancha  : this.area_plancha,
                area_plancha_utilizada  : this.area_plancha_utilizada,
                area_plancha_restante  : this.area_plancha_restante,
                total_cortes : this.total_cortes,
                parametros: this.parametros_tabla.data
            }
            this.parametros_graficar = obj
            // await this.cargar_x_screen()
            // await this.dibujar_cortes()
            await this.levantar_modal_cortes()
        },
        async levantar_modal_cortes(){
            this.modal_cortes_listos = true;
        },
        guardar_corte(data){
            var hoy = new Date();
            var fecha = this.obtener_fecha();
            // var hora = this.obtener_hora();
            if(localStorage.getItem('corte_guardado')){
                let datos_locales = JSON.parse(localStorage.getItem('parametros_corte'))
                let datos_all = datos_locales.concat(data)
                localStorage.setItem('parametros_corte', JSON.stringify(datos_all))
                localStorage.setItem('fecha_corte', fecha)
                // localStorage.setItem('hora_corte', hora)
            }
            else{
                var guardar = [] 
                guardar.push(data)
                localStorage.setItem('parametros_corte', JSON.stringify(guardar))
                localStorage.setItem('corte_guardado', true)
                localStorage.setItem('fecha_corte', fecha)
                // localStorage.setItem('hora_corte', hora)
            }
        },
        limpiar_cache_cortes(){
            localStorage.removeItem('parametros_corte');
            localStorage.removeItem('corte_guardado');
            localStorage.removeItem('fecha_corte');
            this.generado = false
            this.parametros_tabla.data.length = 0
            this.area_plancha = this.ancho_plancha * this.alto_plancha
            this.area_plancha_restante = this.area_plancha
            this.area_plancha_utilizada = 0
            this.modal_recuperar_corte = false
        },
        eliminar_fila(row){
            const index = this.parametros_tabla.data.indexOf(row)
            this.parametros_tabla.data.splice( index, 1 );
        },
        cargar_cortes(){
            
            var parametros = JSON.parse(localStorage.parametros_corte)
            let ultimo = parametros.length -1
            // this.parametros_tabla.data = parametros
            for (let index = 0; index < parametros.length; index++) {
                const element = parametros[index];
                this.parametros_tabla.data.push(element)
            }
            this.ancho_plancha = parametros[ultimo].ancho_plancha
            this.alto_plancha = parametros[ultimo].alto_plancha
            this.area_plancha = parametros[ultimo].area_plancha
            this.area_plancha_utilizada = parametros[ultimo].area_plancha_utilizada
            this.area_plancha_restante = parametros[ultimo].area_plancha_restante
            this.unidad_medida_nuevo = parametros[ultimo].unidad_medida_nuevo
            this.material_corte_nuevo = parametros[ultimo].material_corte_nuevo
            this.grosor_sierra_nuevo = parametros[ultimo].grosor_sierra
            this.modal_recuperar_corte = false;
            this.generado = true;
        },
        solo_numeros(e){
            var key = e.keyCode || e.which;
            var tecla = String.fromCharCode(key).toLowerCase();
            var letras = "1234567890";
            var especiales = "8-16-20-80-186";
            var valor = especiales.split('-');
            var tecla_especial = false;
        
            for(var j in valor){
                if(key == valor[j]){
                    tecla_especial = true;
                    break;
                }
            }
            
            var charStr = String.fromCharCode(key)

            if(letras.indexOf(charStr)==-1 && !tecla_especial){  
                e.preventDefault()
                e.stopPropagation()                
            }
        },
        solo_letras(e){
                    
            var key = e.keyCode || e.which;
            var tecla = String.fromCharCode(key).toLowerCase();
            var letras = "aeiouáéíóúabcdefghijklmnñopqrstuvwxyzAEIOUÁÉÍÓÚABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
            var especiales = "8-16-20-32-80-186";
            var valor = especiales.split('-');
            var tecla_especial = false;
        
            for(var j in valor){
                if(key == valor[j]){
                    tecla_especial = true;
                    break;
                }
            }
            
            var charStr = String.fromCharCode(key)

            if(letras.indexOf(charStr)==-1 && !tecla_especial){  
                e.preventDefault()
                e.stopPropagation()                
            }

        },
        async carga_inicial(){
            this.$q.loading.show()
            await this.material_corte()
            await this.unidad_medida()
            await this.cargarBase()
            await this.grosor_sierra()
            this.$q.loading.hide()
        },
        obtener_fecha(){
            var hoy = new Date();
            var mes = hoy.getMonth() + 1 
            var dia = hoy.getDate()
            if(mes < 10){
                mes = '0' + mes
            }
            if(dia < 10){
                dia = '0' + dia
            }
            
            var hora = hoy.getHours()
            var minutos = hoy.getMinutes()
            var segundos = hoy.getSeconds()

            if(hora < 10){
                hora = '0' + hora
            }
            if(minutos < 10){
                minutos = '0' + minutos
            }
            if(segundos < 10){
                segundos = '0' + segundos
            }
            return  hoy.getFullYear()+ '/' + mes + '/' + dia + ' ' + hora + ':' + minutos + ':' + segundos;
        },
        obtener_hora(){
            var hoy = new Date();
            var hora = hoy.getHours()
            var minutos = hoy.getMinutes()
            var segundos = hoy.getSeconds()

            if(hora < 10){
                hora = '0' + hora
            }
            if(minutos < 10){
                minutos = '0' + minutos
            }
            if(segundos < 10){
                segundos = '0' + segundos
            }
            return hora + ':' + minutos + ':' + segundos;
        },
        async cargar_x_screen(){
            console.log(this.$q.screen.width)
            if(this.$q.screen.width > 1919){
                this.x_screen = 2
            }
            else if(this.$q.screen.width < 1919 && this.$q.screen.width > 1439){
                this.x_screen = 2.5
            }
            else if(this.$q.screen.width < 1439 && this.$q.screen.width > 1023){
                this.x_screen = 3
            }
            else{
                this.x_screen = 4
            }
            console.log('this.x_screen',this.x_screen)
        },
        desechar_corte(){
            this.modal_cortes_listos = false
            this.limpiar_cache_cortes()
            this.generado = false
            this.parametros_tabla.data.length = 0
            this.area_plancha = this.ancho_plancha * this.alto_plancha
            this.area_plancha_restante = this.area_plancha
            this.area_plancha_utilizada = 0
        },
        async guardar_corte_bd(){
            var obj = {
                material_corte : this.material_corte_nuevo.label,
                unidad_medida : this.unidad_medida_nuevo.label,
                grosor_sierra : parseInt(this.grosor_sierra_nuevo.grosor),
                alto_plancha  : parseInt(this.alto_plancha),
                ancho_plancha  : parseInt(this.ancho_plancha),
                area_plancha  : parseInt(this.area_plancha),
                area_plancha_utilizada  : parseInt(this.area_plancha_utilizada),
                area_plancha_restante  : parseInt(this.area_plancha_restante),
                total_cortes : parseInt(this.total_cortes),
                parametros: this.parametros_tabla.data
            }
            await this.$store.dispatch("GestorCortes/guardarCortes", obj).then(res => {
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
                    this.$q.notify({
                        message: "Cortes guardados correctamente",
                        timeout: 3000,
                        type: 'positive',// Available values: 'positive', 'negative', 'warning', 'info'
                        position: 'bottom',
                        icon: 'done_all'
                    })
                    this.modal_cortes_listos = false
                    this.limpiar_cache_cortes()
                    this.generado = false
                    this.parametros_tabla.data.length = 0
                    this.area_plancha = this.ancho_plancha * this.alto_plancha
                    this.area_plancha_restante = this.area_plancha
                    this.area_plancha_utilizada = 0
                }
            }).catch(err => {
                console.log(err)
            })
        },
        verificar_corte_guardado(){
            if(localStorage.getItem('corte_guardado')){
                return true
            }
            else{
                return false
            }
        }
	},
	created () {
		const token = localStorage.getItem('token')
		const datos = getUserFromToken(token)
		this.username = datos.datosUsuario.username
        this.ss_u = datos.datosUsuario.uuid_user
        this.carga_inicial()
        if(localStorage.getItem('corte_guardado')){
            this.fecha_corte_guardado = localStorage.getItem('fecha_corte')
            this.hora_corte_guardado = localStorage.getItem('hora_corte')
            var fecha_guardada = new Date(this.fecha_corte_guardado)
            var fecha_actual = new Date(this.obtener_fecha())
            var segDif = fecha_actual.getTime() -fecha_guardada.getTime();
            var horasDif = Math.round(segDif/(1000 * 60 * 60));
            if(horasDif < 6){
                this.cargar_cortes()
            }
            else{
                this.fecha_corte_guardado = date.formatDate(this.fecha_corte_guardado, 'DD/MM/YYYY HH:mm:ss')
                this.modal_recuperar_corte = true
            }

            
        }
        console.log(this.generado)
        // this.iniciar()
	},
	mounted () {
	},
	updated () {
	},
    watch: {
        'modal_nuevo': function () {
            if(this.modal_nuevo){
                var element = document.getElementById("q-app");
                element.classList.add("modal-open");
            }
            else{
                var element = document.getElementById("q-app");
                element.classList.remove("modal-open");
                this.parametros_tabla.data.length = 0
                this.$forceUpdate();
            }
        },
        'modal_editar': function () {
            if(this.modal_editar){
                var element = document.getElementById("q-app");
                element.classList.add("modal-open");
            }
            else{
                var element = document.getElementById("q-app");
                element.classList.remove("modal-open");
                this.parametros_tabla.data.length = 0
                this.$forceUpdate();
            }
        },
        'modal_eliminar': function () {
            if(this.modal_eliminar){
                var element = document.getElementById("q-app");
                element.classList.add("modal-open");
            }
            else{
                var element = document.getElementById("q-app");
                element.classList.remove("modal-open");
                this.parametros_tabla.data.length = 0
                this.$forceUpdate();
            }
        },
        // 'unidad_medida_nuevo': function () {
        //     this.parametros_tabla.unidad_medida_nuevo = this.unidad_medida_nuevo.nombre
        // },
        "$q.screen.width"() {
            console.log(this.$q.screen.width)
            if(this.modal_cortes_listos){
                this.cargar_x_screen()
                // this.dibujar_cortes()
            }

        }
    }

})
