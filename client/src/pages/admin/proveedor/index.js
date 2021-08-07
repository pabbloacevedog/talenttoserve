import Vue from 'vue'
import {getUserFromToken} from '@utils/authService'
import { mapGetters } from 'vuex'
export default Vue.component('Proveedor', {
    $validates: 1,
    components:{
        tabla:() => import('./tabla/tabla.vue')
    },
	data () {
		return {
            img:'/statics/login.jpg',
            nuevo_proveedor:'',
            nuevo_direccion:'',
            nuevo_telefono:'',
            nuevo_email:'',
            nuevo_web:'',
            nuevo_categoria:null,
            nuevo_descripcion:'',
            nuevo_banner:'',
            nuevo_estado : 
                {
                label: 'Activo',
                value: true
                }
            ,
            editar_codigo: '',
            editar_proveedor:'',
            editar_direccion:'',
            editar_telefono:'',
            editar_email:'',
            editar_web:'',
            editar_categoria:null,
            editar_descripcion:'',
            editar_banner:'',
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
                tittle: 'Proveedor',
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
                selectedkey: 'codigo', 
                columns: [
                  {
                    name: 'proveedor',
                    label: 'proveedor',
                    align: 'left',
                    field: 'proveedor',
                    sortable: true
                  },
                  { name: 'direccion', align: 'center', label: 'Dirección', field: 'direccion', sortable: true },
                  { name: 'telefono', align: 'center', label: 'Telefono', field: 'telefono', sortable: true },
                  { name: 'email', align: 'center', label: 'Email', field: 'email', sortable: true },
                  { name: 'web', align: 'center', label: 'Web', field: 'web', sortable: true },
                  { name: 'nombre_categoria', align: 'center', label: 'Categoría', field: 'nombre_categoria', sortable: true },
                  { name: 'descripcion', align: 'center', label: 'Descripción', field: 'descripcion', sortable: true },
                  { name: 'banner', align: 'center', label: 'Banner', field: 'banner', sortable: true },
                  { name: 'estado', align: 'center', label: 'Estado', field: 'estado' , sortable: true},
                ],
                data: [
                ],
            },
            funciones:  {
                eliminar: this.eliminar,
                editar: this.editar,
                editar_fila: this.editar_fila,
                mostrar_banner: this.mostrar_banner,
                iniciar: this.iniciar
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
            banner: '',
            base : process.env.BASE_URL,
            modal_banner: false,
            select_categoria:[]
        }
	},
	computed: {
		...mapGetters({ 
            dataProveedor: "Proveedor/getData", 
            dataSelector: "Usuario/getSelector", 
            registro_creado: "Proveedor/getCreado",
            registro_editado: "Proveedor/getEditado",
            registro_eliminado: "Proveedor/getEliminado",
            error: "Proveedor/error" , 
        })
	},
	methods: {
        async iniciar () {
            this.$q.loading.show()
			await this.$store.dispatch("Proveedor/cargarProveedor").then(res => {
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
                    console.log('dataProveedor',this.dataProveedor)
                    this.parametros_tabla.data = this.dataProveedor
				}
			}).catch(err => {
				console.log(err)
			})
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
        mostrar_banner(banner){
            this.banner = this.base + banner
            this.modal_banner = true
        },
        async selectores(){
            this.select_categoria = await this.getSelector('categoria')
        },
        editar(){
            if(this.parametros_tabla.selected.length == 1){
                this.editar_codigo = this.parametros_tabla.selected[0].codigo
                this.editar_proveedor = this.parametros_tabla.selected[0].proveedor
                this.editar_direccion = this.parametros_tabla.selected[0].direccion
                this.editar_telefono = this.parametros_tabla.selected[0].telefono
                this.editar_email = this.parametros_tabla.selected[0].email
                this.editar_web = this.parametros_tabla.selected[0].web
                this.editar_categoria = {
                    value: this.parametros_tabla.selected[0].categoria, 
                    label: this.parametros_tabla.selected[0].nombre_categoria
                }
                this.editar_descripcion = this.parametros_tabla.selected[0].descripcion
                this.editar_banner = this.parametros_tabla.selected[0].banner
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
            this.parametros_tabla.data.forEach(element =>{
                if(id == element.codigo)
                {
                    this.editar_codigo = element.codigo
                    this.editar_proveedor = element.proveedor
                    this.editar_direccion = element.direccion
                    this.editar_telefono = element.telefono
                    this.editar_email = element.email
                    this.editar_web = element.web
                    this.editar_categoria = {
                        value: element.categoria, 
                        label: element.nombre_categoria
                    }
                    this.editar_descripcion = element.descripcion
                    this.editar_banner = element.banner
                    if(element.estado){
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
            })
            // for (let index = 0; index < this.parametros_tabla.data.length; index++) {
            //     const element = this.parametros_tabla.data[index].codigo;
            //     if(id == element)
            //     {
            //         this.editar_codigo = this.parametros_tabla.data[index].codigo
            //         this.editar_proveedor = this.parametros_tabla.data[index].proveedor
            //         this.editar_direccion = this.parametros_tabla.data[index].direccion
            //         this.editar_telefono = this.parametros_tabla.data[index].telefono
            //         this.editar_email = this.parametros_tabla.data[index].email
            //         this.editar_web = this.parametros_tabla.data[index].web
            //         this.editar_categoria = this.parametros_tabla.data[index].categoria
            //         this.editar_descripcion = this.parametros_tabla.data[index].descripcion
            //         this.editar_banner = this.parametros_tabla.data[index].banner
            //         if(this.parametros_tabla.data[index].estado){
            //             this.editar_estado = {
            //                 label: 'Activo',
            //                 value: true
            //             }
            //         }
            //         else{
            //             this.editar_estado = {
            //                 label: 'Inactivo',
            //                 value: false
            //             }
            //         }
            //         this.modal_editar = true
            //     }
            // }
        },
        async guardar_editar(){
			this.$q.loading.show()
            const {editar_proveedor,editar_direccion,editar_telefono,editar_email,editar_web,editar_categoria, editar_descripcion , editar_banner, editar_estado} = this
            var est = editar_estado.value
            var cat = parseInt(editar_categoria.value)
            var fi = editar_banner
            if( typeof editar_banner == 'object'){
                fi = editar_banner[0]
            }
            await this.$store.dispatch("Proveedor/editarProveedor", { 
                codigo : this.editar_codigo,
                proveedor:editar_proveedor,
                direccion:editar_direccion,
                telefono:editar_telefono,
                email:editar_email,
                web:editar_web,
                categoria:cat, 
                descripcion:editar_descripcion ,
                file: fi, 
                estado:est 
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
            await this.iniciar()
            // if(this.registro_editado){
            //     await this.iniciar()
            // }
        },
        limpiar_editar(){
            this.editar_codigo = ''
            this.editar_proveedor=''
            this.editar_direccion=''
            this.editar_telefono=''
            this.editar_email=''
            this.editar_web=''
            this.editar_categoria=''
            this.editar_descripcion = ''
            this.editar_banner = ''
            this.editar_estado = {
                label: 'Activo',
                value: true
            }

        },
        limpiar_nuevo(){
            this.nuevo_codigo = ''
            this.nuevo_proveedor=''
            this.nuevo_direccion=''
            this.nuevo_telefono=''
            this.nuevo_email=''
            this.nuevo_web=''
            this.nuevo_categoria=''
            this.nuevo_descripcion = ''
            this.nuevo_banner = ''
            this.nuevo_estado = {
                label: 'Activo',
                value: true
            }

        },
        async guardar_nuevo() {
            const {nuevo_proveedor,nuevo_direccion, nuevo_telefono,nuevo_email,nuevo_web,nuevo_categoria,nuevo_descripcion , nuevo_banner, nuevo_estado} = this
            var est = nuevo_estado.value
            var cat = parseInt(nuevo_categoria.value)
            if(nuevo_proveedor == ''){
                this.$q.notify({
                    message: 'El proveedor es obligatorio',
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
            else if(nuevo_web == ''){
                this.$q.notify({
                    message: 'Ingrese web',
                    timeout: 3000,
                    type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
                    position: 'bottom',
                    icon: 'report_problem'
                })
            }
            else if(nuevo_direccion == ''){
                this.$q.notify({
                    message: 'Ingrese direccion',
                    timeout: 3000,
                    type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
                    position: 'bottom',
                    icon: 'report_problem'
                })
            }
            else if(nuevo_telefono == ''){
                this.$q.notify({
                    message: 'Ingrese telefono',
                    timeout: 3000,
                    type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
                    position: 'bottom',
                    icon: 'report_problem'
                })
            }
            else if(nuevo_email == ''){
                this.$q.notify({
                    message: 'Ingrese email',
                    timeout: 3000,
                    type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
                    position: 'bottom',
                    icon: 'report_problem'
                })
            }
            else{
                this.$q.loading.show()
                await this.$store.dispatch("Proveedor/crearProveedor", {
                    proveedor:nuevo_proveedor,
                    direccion:nuevo_direccion,
                    telefono:nuevo_telefono,
                    email:nuevo_email,
                    web:nuevo_web,
                    categoria:cat, 
                    descripcion:nuevo_descripcion ,
                    file: nuevo_banner[0], 
                    estado:est 
                }).then(res => {
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
            await this.iniciar()
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
            await this.$store.dispatch("Proveedor/eliminarProveedor", { id:this.parametros_tabla.selected}).then(res => {
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
            await this.iniciar()
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
                // var element = document.getElementById("q-app");
                // element.classList.add("modal-open");
                this.selectores()
            }
            else{
                // var element = document.getElementById("q-app");
                // element.classList.remove("modal-open");
                // this.parametros_tabla.data.length = 0
                // this.iniciar()
            }
        },
        'modal_editar': function () {
            if(this.modal_editar){
                // var element = document.getElementById("q-app");
                // element.classList.add("modal-open");
                this.selectores()
            }
            // else{
            //     var element = document.getElementById("q-app");
            //     element.classList.remove("modal-open");
            //     this.parametros_tabla.data.length = 0
            //     this.iniciar()
            // }
        },
        'modal_eliminar': function () {
            // if(this.modal_eliminar){
            //     var element = document.getElementById("q-app");
            //     element.classList.add("modal-open");
            // }
            // else{
            //     var element = document.getElementById("q-app");
            //     element.classList.remove("modal-open");
            //     this.parametros_tabla.data.length = 0
            //     this.iniciar()
            // }
        },
    }

})
