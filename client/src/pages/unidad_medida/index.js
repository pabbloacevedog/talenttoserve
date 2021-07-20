import Vue from 'vue'
import {getUserFromToken} from '@utils/authService'
import { mapGetters } from 'vuex'
export default Vue.component('UnidadMedida', {
    $validates: 1,
    components:{
        tabla:() => import('./tabla/tabla.vue')
    },
	data () {
		return {
            img:'/statics/login.jpg',
            nuevo_unidad_base: '',
            nuevo_nombre_unidad_base: '',
            nuevo_unidad_conversion: '',
            nuevo_nombre:'',
            nuevo_descripcion:'',
            nuevo_acronimo:'',
            nuevo_estado : 
                {
                label: 'Activo',
                value: true
                }
            ,
            editar_id_unidad_medida: '',
            editar_unidad_base: '',
            editar_unidad_conversion: '',
            editar_nombre:'',
            editar_descripcion:'',
            editar_acronimo : '',
            editar_estado : 
                {
                label: 'Activo',
                value: true
                }
            ,
            modal_nuevo: false,
            modal_eliminar: false,
            modal_editar: false,
            modal_unidad_base: false,
            parametros_tabla:{
                tittle: 'Unidad Medida',
                acciones:[
                    { accion: 'Eliminar', icon: 'delete', cmd: 'eliminar'},
                    { accion: 'Editar', icon: 'update', cmd: 'editar' },
                ],
                navigationActive: false,
                filter: '',
                selected: [],
                pagination: {
                    rowsPerPage: 10 
                },
                selectedkey: 'id_unidad_medida', 
                columns: [
                  {
                    name: 'unidad_base',
                    label: 'Unidad Base',
                    align: 'left',
                    field: 'unidad_base',
                    sortable: true
                  },
                  { name: 'unidad_conversion', align: 'center', label: 'Unidad Conversión', field: 'unidad_conversion', sortable: true },
                  { name: 'nombre', align: 'center', label: 'Nombre', field: 'nombre', sortable: true },
                  { name: 'descripcion', align: 'center', label: 'Descripción', field: 'descripcion', sortable: true },
                  { name: 'acronimo', align: 'center', label: 'Acrónimo', field: 'acronimo', sortable: true },
                  { name: 'estado', align: 'center', label: 'Estado', field: 'estado' , sortable: true},
                ],
                unidad_base:'',
                data: [
                ],
            },
            funciones:  {
                eliminar: this.eliminar,
                editar: this.editar,
                editar_fila: this.editar_fila,
                iniciar: this.iniciar
            },
            selected_ub:{},
            options_ub:[],
            estados: [
				{
				label: 'Activo',
				value: true
				},
				{
				label: 'Inactivo',
				value: false
				}
			]
        }
	},
	computed: {
		...mapGetters({ 
            dataUnidadMedida: "UnidadMedida/getData", 
            dataUnidadBase: "UnidadMedida/getBase",
            registro_creado: "UnidadMedida/getCreado",
            registro_editado: "UnidadMedida/getEditado",
            registro_eliminado: "UnidadMedida/getEliminado",
            error: "UnidadMedida/error" , 
        })
	},
	methods: {
        async iniciar () {
            this.$q.loading.show()
			await this.$store.dispatch("UnidadMedida/cargarUnidadMedida").then(res => {
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
                    console.log('dataUnidadMedida',this.dataUnidadMedida)
                    this.parametros_tabla.data = this.dataUnidadMedida
				}
			}).catch(err => {
				console.log(err)
            })
            await this.cargarBase()
            await this.mostrarBase()
        },
        async cargarBase () {
            this.$q.loading.show()
			await this.$store.dispatch("UnidadMedida/cargarUnidadBase").then(res => {
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
                    console.log('dataUnidadBase',this.dataUnidadBase)
                    
				}
			}).catch(err => {
				console.log(err)
			})
        },
        async mostrarBase(){
            this.options_ub = []
            for (let index = 0; index < this.dataUnidadBase.length; index++) {
                const element = this.dataUnidadBase[index];
                var obj = {
                    label : element.nombre + ' (' + element.acronimo + ')',
                    value : element.nombre,
                    nombre : element.nombre,
                    acronimo: element.acronimo,
                    unidad: element.unidad,
                    base: element.base
                }
                this.options_ub.push(obj)
                if(element.base)
                {
                    this.selected_ub.label = element.nombre + ' (' + element.acronimo + ')'
                    this.selected_ub.value = element.nombre
                    this.selected_ub.nombre = element.nombre
                    this.selected_ub.acronimo =  element.acronimo 
                    this.selected_ub.unidad = element.unidad 
                    this.selected_ub.base = element.base 
                    this.nuevo_unidad_base = 1
                    this.nuevo_nombre_unidad_base = element.nombre
                    this.parametros_tabla.unidad_base =  element.nombre
                }
            }
            console.log(this.options_ub)
        },
        async show_conf(){
            await this.cargarBase()
            await this.mostrarBase()
            this.modal_unidad_base = true
        },
        editar(){
            if(this.parametros_tabla.selected.length == 1){
                this.editar_id_unidad_medida = this.parametros_tabla.selected[0].id_unidad_medida
                this.editar_unidad_base = this.parametros_tabla.selected[0].unidad_base
                this.editar_unidad_conversion = this.parametros_tabla.selected[0].unidad_conversion
                this.editar_nombre = this.parametros_tabla.selected[0].nombre
                this.editar_descripcion = this.parametros_tabla.selected[0].descripcion
                this.editar_acronimo = this.parametros_tabla.selected[0].acronimo
                if(this.parametros_tabla.selected[0].estado){
                    this.editar_estado = {
                        label: 'Activo',
                        value: true
                    }
                }
                else{
                    this.editar_estado = {
                        label: 'Inactivo',
                        value: false
                    }
                }
                this.modal_editar = true

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
        editar_fila(id){
            for (let index = 0; index < this.parametros_tabla.data.length; index++) {
                const element = this.parametros_tabla.data[index].id_unidad_medida;
                if(id == element)
                {
                    this.editar_id_unidad_medida = this.parametros_tabla.data[index].id_unidad_medida
                    this.editar_unidad_base = this.parametros_tabla.data[index].unidad_base
                    this.editar_unidad_conversion = this.parametros_tabla.data[index].unidad_conversion
                    this.editar_nombre = this.parametros_tabla.data[index].nombre
                    this.editar_descripcion = this.parametros_tabla.data[index].descripcion
                    this.editar_acronimo = this.parametros_tabla.data[index].acronimo
                    if(this.parametros_tabla.data[index].estado){
                        this.editar_estado = {
                            label: 'Activo',
                            value: true
                        }
                    }
                    else{
                        this.editar_estado = {
                            label: 'Inactivo',
                            value: false
                        }
                    }
                    this.modal_editar = true
                }
            }
        },
        async guardar_editar(){
			this.$q.loading.show()
            const {editar_unidad_base,editar_unidad_conversion,editar_nombre, editar_descripcion , editar_acronimo, editar_estado} = this
            var gro = parseInt(editar_unidad_base)
            var u_conv = parseInt(editar_unidad_conversion)
            var est = editar_estado.value
            await this.$store.dispatch("UnidadMedida/editarUnidadMedida", { id_unidad_medida : this.editar_id_unidad_medida, unidad_base: gro, unidad_conversion: u_conv, nombre : editar_nombre, descripcion:editar_descripcion , acronimo : editar_acronimo, estado:est }).then(res => {
                console.log(res)
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
                        message: "Registro editado correctamente",
                        timeout: 3000,
                        type: 'positive',// Available values: 'positive', 'negative', 'warning', 'info'
                        position: 'bottom',
                        icon: 'done_all'
                    })
                    this.modal_editar = false
                    this.limpiar_editar()
                    this.parametros_tabla.data = []
                    this.parametros_tabla.selected = []

                }
            }).catch(err => {
                console.log(err)
            })
            console.log(this.registro_editado)
            if(this.registro_editado){
                await this.iniciar()
            }
        },
        limpiar_editar(){
            this.editar_id_unidad_medida = ''
            this.editar_unidad_base = ''
            this.editar_unidad_conversion = ''
            this.editar_nombre = ''
            this.editar_descripcion = ''
            this.editar_acronimo = ''
            this.editar_estado = {
                label: 'Activo',
                value: true
            }

        },
        limpiar_nuevo(){
            this.nuevo_id_unidad_medida = ''
            this.nuevo_unidad_base = ''
            this.nuevo_unidad_conversion = ''
            this.nuevo_nombre = ''
            this.nuevo_descripcion = ''
            this.nuevo_acronimo = ''
            this.nuevo_estado = {
                label: 'Activo',
                value: true
            }

        },
        async show_modal_nuevo(){
            await this.cargarBase()
            await this.mostrarBase()
            this.modal_nuevo = true
        },
        async guardar_nuevo() {
			this.$q.loading.show()
            const {nuevo_unidad_base, nuevo_unidad_conversion, nuevo_nombre, nuevo_descripcion , nuevo_acronimo, nuevo_estado} = this
            var gro = parseInt(nuevo_unidad_base)
            var u_con = parseInt(nuevo_unidad_conversion)
            var est = nuevo_estado.value
            await this.$store.dispatch("UnidadMedida/crearUnidadMedida", { unidad_base: gro, unidad_conversion: u_con ,nombre : nuevo_nombre, descripcion:nuevo_descripcion , acronimo : nuevo_acronimo, estado:est }).then(res => {
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
                        message: "Registro creado",
                        timeout: 3000,
                        type: 'positive',// Available values: 'positive', 'negative', 'warning', 'info'
                        position: 'bottom',
                        icon: 'done_all'
                    })
                    this.modal_nuevo = false
                    this.limpiar_nuevo()
                    // this.iniciar()
                }
            }).catch(err => {
                console.log(err)
            })
        },
        eliminar(){
            // //replace
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
            await this.$store.dispatch("UnidadMedida/eliminarUnidadMedida", { id:this.parametros_tabla.selected}).then(res => {
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
        async guardar_unidad_base(){
            this.$q.loading.show()
            await this.$store.dispatch("UnidadMedida/guardarUnidadBase", { id:this.selected_ub}).then(res => {
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
                        message: 'Unidad base guardada con éxito',
                        timeout: 3000,
                        type: 'positive',// Available values: 'positive', 'negative', 'warning', 'info'
                        position: 'bottom',
                        icon: 'done_all'
                    })
                    this.modal_unidad_base = false
                    this.selected_ub = []
                }
            }).catch(err => {
                console.log(err)
            })
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
	},
	created () {
		const token = localStorage.getItem('token')
		const datos = getUserFromToken(token)
		this.username = datos.datosUsuario.username
		this.ss_u = datos.datosUsuario.uuid_user
		if(datos.datosUsuario.avatar){
			this.src_avatar = datos.datosUsuario.avatar
        }
        this.iniciar()
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
                this.iniciar()
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
                this.iniciar()
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
                this.iniciar()
            }
        },
        'modal_unidad_base': function () {
            if(this.modal_unidad_base){
                var element = document.getElementById("q-app");
                element.classList.add("modal-open");
            }
            else
            {
                var element = document.getElementById("q-app");
                element.classList.remove("modal-open");
                this.parametros_tabla.data.length = 0
                this.iniciar()
            }
        },
        'selected_ub': function () {
            console.log(this.selected_ub)
        },
    }

})
