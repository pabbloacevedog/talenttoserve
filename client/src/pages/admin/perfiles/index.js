import Vue from 'vue'
import {getUserFromToken} from '@utils/authService'
import { mapGetters } from 'vuex'
export default Vue.component('Perfil', {
    $validates: 1,
    components:{
        tabla:() => import('./tabla/tabla.vue')
    },
	data () {
		return {
            img:'/statics/login.jpg',
            nuevo_nombre:'',
            nuevo_descripcion:'',
            nuevo_path_default:'',
            nuevo_estado : 
                {
                label: 'Activo',
                value: true
                }
            ,
            editar_id_perfil: '',
            editar_nombre:'',
            editar_descripcion:'',
            editar_path_default:'',
            editar_estado : 
                {
                label: 'Activo',
                value: true
                }
            ,
            modal_nuevo: false,
            maximizedToggle: true,
            modal_eliminar: false,
            modal_editar: false,
            parametros_tabla:{
                tittle: 'Perfiles',
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
                selectedkey: 'id_perfil', 
                columns: [
                  { name: 'nombre', align: 'center', label: 'Nombre', field: 'nombre', sortable: true },
                  { name: 'descripcion', align: 'center', label: 'Descripción', field: 'descripcion', sortable: true },
                  { name: 'path_default', align: 'center', label: 'Ruta por defecto', field: 'path_default', sortable: true },
                  { name: 'estado', align: 'center', label: 'Estado', field: 'estado' , sortable: true},
                ],
                data: [
                ],
            },
            rutas_guardar:[],
            rutas_guardar_nuevo:[],
            funciones:  {
                eliminar: this.eliminar,
                editar: this.editar,
                editar_fila: this.editar_fila,
                iniciar: this.iniciar
            },
            rutas_perfil_nuevo : [],
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
            select_path_default:[],
        }
	},
	computed: {
		...mapGetters({ 
            dataPerfil: "Perfil/getData", 
            rutas_all: "Perfil/getRutasAll",
            rutas_perfil: "Perfil/getRutasPerfil",
            registro_creado: "Perfil/getCreado",
            registro_editado: "Perfil/getEditado",
            registro_eliminado: "Perfil/getEliminado",
            dataSelector: "Usuario/getSelector", 
            error: "Perfil/error" , 
        })
	},
	methods: {
        async iniciar () {
            this.$q.loading.show()
			await this.$store.dispatch("Perfil/cargarPerfil").then(res => {
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
                    console.log('dataPerfil',this.dataPerfil)
                    this.parametros_tabla.data = this.dataPerfil
				}
			}).catch(err => {
				console.log(err)
			})
        },
        async rutasAll () {
            this.$q.loading.show()
			await this.$store.dispatch("Perfil/cargarRutasAll").then(res => {
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
                    console.log('rutas_all',this.rutas_all)
				}
			}).catch(err => {
				console.log(err)
			})
        },
        async rutasPerfil () {
            this.$q.loading.show()
            console.log(this.editar_id_perfil)
            var id = String(this.editar_id_perfil)
			await this.$store.dispatch("Perfil/cargarRutasPerfil", { id_perfil: id }).then(res => {
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
                    console.log('rutas_perfil',this.rutas_perfil)
				}
			}).catch(err => {
				console.log(err)
			})
        },
        editar(){
            if(this.parametros_tabla.selected.length == 1){
                this.editar_id_perfil = this.parametros_tabla.selected[0].id_perfil
                this.editar_nombre = this.parametros_tabla.selected[0].nombre
                this.editar_descripcion = this.parametros_tabla.selected[0].descripcion
                // this.editar_path_default = this.parametros_tabla.selected[0].path_default
                if(this.parametros_tabla.selected[0].path_default != ''){
                    this.editar_path_default = {
                        label: this.parametros_tabla.selected[0].path_default,
                        value: this.parametros_tabla.selected[0].path_default
                    }
                }
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
                this.rutasAll()
                this.rutasPerfil()
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
        async editar_fila(id){
            for (let index = 0; index < this.parametros_tabla.data.length; index++) {
                const element = this.parametros_tabla.data[index].id_perfil;
                if(id == element)
                {
                    this.editar_id_perfil = this.parametros_tabla.data[index].id_perfil
                    this.editar_nombre = this.parametros_tabla.data[index].nombre
                    this.editar_descripcion = this.parametros_tabla.data[index].descripcion
                    // this.editar_path_default = this.parametros_tabla.data[index].path_default
                    if(this.parametros_tabla.data[index].path_default != ''){
                        this.editar_path_default = {
                            label: this.parametros_tabla.data[index].path_default,
                            value: this.parametros_tabla.data[index].path_default
                        }
                    }
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
                    await this.rutasAll()
                    await this.rutasPerfil()
                    await this.cruzarRutas()
                    this.modal_editar = true
                }
            }
        },
        async cruzarRutas(){
            this.rutas_guardar = []
            if(this.rutas_perfil){
                for (let i = 0; i < this.rutas_perfil.length; i++) {
                    const element = this.rutas_perfil[i];
                    for (let index = 0; index < this.rutas_all.length; index++) {
                        const dim = this.rutas_all[index];
                        if (element.path === dim.path){
                            dim.estado = 1
                            dim.value = true
                        }
                        dim.id_perfil = this.editar_id_perfil
                    }
                }
            }
            this.rutas_guardar = this.rutas_all
        },
        validarRutas(){
            var val = false
            for (let i = 0; i < this.rutas_all.length; i++) {
                const element = this.rutas_all[i];
                if(element.estado == "1"){
                    val = true
                }
            }
            return val
        },
        async mostrarNuevo(){
            await this.rutasAll()
            this.rutas_guardar_nuevo = this.rutas_all
            this.modal_nuevo = true
        },
        async guardar_editar(){
			this.$q.loading.show()
            const {editar_nombre, editar_descripcion ,editar_path_default, editar_estado} = this
            var est = editar_estado.value
            await this.$store.dispatch("Perfil/editarPerfil", { 
                id_perfil : this.editar_id_perfil, 
                nombre : editar_nombre, 
                descripcion:editar_descripcion , 
                path_default:editar_path_default.value , 
                estado:est , 
                rutas:this.rutas_guardar
            }).then(res => {
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
            this.editar_id_perfil = ''
            this.editar_nombre = ''
            this.editar_descripcion = ''
            this.editar_path_default = ''
            this.editar_estado = {
                label: 'Activo',
                value: true
            }

        },
        limpiar_nuevo(){
            this.nuevo_id_perfil = ''
            this.nuevo_nombre = ''
            this.nuevo_descripcion = ''
            this.nuevo_path_default = ''
            this.nuevo_estado = {
                label: 'Activo',
                value: true
            }

        },
        async guardar_nuevo() {
			
            const {nuevo_nombre, nuevo_descripcion ,nuevo_path_default, nuevo_estado} = this
            var est = nuevo_estado.value
            if(nuevo_nombre == ''){
                this.$q.notify({
                    message: 'El nombre es obligatorio',
                    timeout: 3000,
                    type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
                    position: 'bottom',
                    icon: 'report_problem'
                })
            }
            else if(nuevo_descripcion == ''){
                this.$q.notify({
                    message: 'Ingrese una descripción',
                    timeout: 3000,
                    type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
                    position: 'bottom',
                    icon: 'report_problem'
                })
            }
            else if(nuevo_path_default == '' || nuevo_path_default.length == 0){
                this.$q.notify({
                    message: 'Ingrese ruta por defecto',
                    timeout: 3000,
                    type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
                    position: 'bottom',
                    icon: 'report_problem'
                })
            }
            else{
                this.$q.loading.show()
                await this.$store.dispatch("Perfil/crearPerfil", { nombre : nuevo_nombre, descripcion:nuevo_descripcion,path_default:nuevo_path_default.value , estado:est ,rutas:this.rutas_guardar_nuevo}).then(res => {
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
            }
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
            this.parametros_tabla.selected.forEach(element =>delete element.__typename)
            await this.$store.dispatch("Perfil/eliminarPerfil", { id:this.parametros_tabla.selected}).then(res => {
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
        async selectores(){
            this.select_path_default = await this.getSelector('rutas')
            
            console.log('select_path_default',this.select_path_default)
        },
        async getSelector (tipo) {
            var retorno = []
            this.$q.loading.show()
			await this.$store.dispatch("Usuario/cargarSelector",{tipo}).then(res => {
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
                    // console.log('dataSelector',this.dataSelector)
                    retorno = this.dataSelector
				}
			}).catch(err => {
				console.log(err)
			})
            return retorno
        },
	},
	created () {
		const token = localStorage.getItem('token')
		const datos = getUserFromToken(token)
		this.nombre = datos.datosUsuario.nombre
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
                this.selectores()
                // var element = document.getElementById("q-app");
                // element.classList.add("modal-open");
            }
            else{
                // var element = document.getElementById("q-app");
                // element.classList.remove("modal-open");
                this.parametros_tabla.data.length = 0
                this.iniciar()
            }
        },
        'modal_editar': function () {
            if(this.modal_editar){
                this.selectores()
                // var element = document.getElementById("q-app");
                // element.classList.add("modal-open");
            }
            else{
                // var element = document.getElementById("q-app");
                // element.classList.remove("modal-open");
                this.parametros_tabla.data.length = 0
                this.iniciar()
            }
        },
        'modal_eliminar': function () {
            if(this.modal_eliminar){
                // var element = document.getElementById("q-app");
                // element.classList.add("modal-open");
            }
            else{
                // var element = document.getElementById("q-app");
                // element.classList.remove("modal-open");
                this.parametros_tabla.data.length = 0
                this.iniciar()
            }
        },
    }

})
