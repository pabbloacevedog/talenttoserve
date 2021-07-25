import Vue from 'vue'
import {getUserFromToken} from '@utils/authService'
import { mapGetters } from 'vuex'
export default Vue.component('Usuario', {
    $validates: 1,
    components:{
        tabla:() => import('./tabla/tabla.vue')
    },
	data () {
		return {
            img:'/statics/login.jpg',
            nuevo_email : '',
            nuevo_id_perfil   : '',
            nuevo_nombre      : '',
            nuevo_telefono    : '',
            nuevo_id_pais     : '',
            nuevo_nombre_empresa    : '',
            nuevo_cargo : '',
            nuevo_producto_empresa  : '',
            nuevo_universidad : '',
            nuevo_carrera     : '',
            nuevo_estado : 
                {
                    label: 'Activo',
                    value: true
                }
            ,
            editar_usuario_id  : '',
            editar_email : '',
            editar_id_perfil   : '',
            editar_nombre      : '',
            editar_telefono    : '',
            editar_id_pais     : '',
            editar_nombre_empresa    : '',
            editar_cargo : '',
            editar_producto_empresa  : '',
            editar_universidad : '',
            editar_carrera     : '',
            editar_suscrito_mail     : {
                label: 'Activo',
                value: true
            },
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
                tittle: 'Usuarios',
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
                selectedkey: 'usuario_id', 
                columns: [
                  {
                    name: 'nombre',
                    label: 'Nombre',
                    align: 'nombre',
                    field: 'nombre',
                    sortable: true
                  },
                  { name: 'email', align: 'center', label: 'Email', field: 'email', sortable: true },
                  { name: 'perfil', align: 'center', label: 'Perfil', field: 'perfil', sortable: true },
                  { name: 'telefono', align: 'center', label: 'Telefono', field: 'telefono', sortable: true },
                  { name: 'pais', align: 'center', label: 'País', field: 'pais', sortable: true },
                  { name: 'nombre_empresa', align: 'center', label: 'Empresa', field: 'nombre_empresa', sortable: true },
                  { name: 'producto_empresa', align: 'center', label: 'Producto', field: 'producto_empresa', sortable: true },
                  { name: 'universidad', align: 'center', label: 'Universidad', field: 'universidad', sortable: true },
                  { name: 'carrera', align: 'center', label: 'Carrera', field: 'carrera', sortable: true },
                  { name: 'suscrito_mail', align: 'center', label: 'Suscrito', field: 'suscrito_mail', sortable: true },
                  { name: 'estado', align: 'center', label: 'Estado', field: 'estado' , sortable: true},
                ],
                data: [
                ],
            },
            funciones:  {
                eliminar: this.eliminar,
                editar: this.editar,
                editar_fila: this.editar_fila,
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
			]
        }
	},
	computed: {
		...mapGetters({ 
            dataUsuario: "Usuario/getData", 
            registro_creado: "Usuario/getCreado",
            registro_editado: "Usuario/getEditado",
            registro_eliminado: "Usuario/getEliminado",
            error: "Usuario/error" , 
        })
	},
	methods: {
        async iniciar () {
            this.$q.loading.show()
			await this.$store.dispatch("Usuario/cargarUsuario").then(res => {
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
                    console.log('dataUsuario',this.dataUsuario)
                    this.parametros_tabla.data = this.dataUsuario
				}
			}).catch(err => {
				console.log(err)
			})
        },
        editar(){
            if(this.parametros_tabla.selected.length == 1){
                this.editar_usuario_id = this.parametros_tabla.selected[0].usuario_id
                this.editar_email = this.parametros_tabla.selected[0].email
                this.editar_id_perfil = this.parametros_tabla.selected[0].id_perfil
                this.editar_nombre = this.parametros_tabla.selected[0].nombre
                this.editar_telefono = this.parametros_tabla.selected[0].telefono
                this.editar_id_pais = this.parametros_tabla.selected[0].id_pais
                this.editar_nombre_empresa = this.parametros_tabla.selected[0].nombre_empresa
                this.editar_cargo = this.parametros_tabla.selected[0].cargo
                this.editar_producto_empresa = this.parametros_tabla.selected[0].producto_empresa
                this.editar_universidad = this.parametros_tabla.selected[0].universidad
                this.editar_carrera = this.parametros_tabla.selected[0].carrera
                this.editar_suscrito_mail = this.parametros_tabla.selected[0].suscrito_mail
                this.editar_estado = this.parametros_tabla.selected[0].estado
                if(this.parametros_tabla.selected[0].suscrito_mail){
                    this.editar_suscrito_mail = {
                        label: 'Suscrito',
                        value: true
                    }
                }
                else{
                    this.editar_suscrito_mail = {
                        label: 'Inactivo',
                        value: false
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
            debugger
            for (let index = 0; index < this.parametros_tabla.data.length; index++) {
                const element = this.parametros_tabla.data[index].usuario_id;
                if(id == element)
                {
                    this.editar_usuario_id = this.parametros_tabla.data[index].usuario_id
                    this.editar_email = this.parametros_tabla.data[index].email
                    this.editar_id_perfil = this.parametros_tabla.data[index].id_perfil
                    this.editar_nombre = this.parametros_tabla.data[index].nombre
                    this.editar_telefono = this.parametros_tabla.data[index].telefono
                    this.editar_id_pais = this.parametros_tabla.data[index].id_pais
                    this.editar_nombre_empresa = this.parametros_tabla.data[index].nombre_empresa
                    this.editar_cargo = this.parametros_tabla.data[index].cargo
                    this.editar_producto_empresa = this.parametros_tabla.data[index].producto_empresa
                    this.editar_universidad = this.parametros_tabla.data[index].universidad
                    this.editar_carrera = this.parametros_tabla.data[index].carrera
                    if(this.parametros_tabla.data[index].suscrito_mail){
                        this.editar_suscrito_mail = {
                            label: 'Suscrito',
                            value: true
                        }
                    }
                    else{
                        this.editar_suscrito_mail = {
                            label: 'Inactivo',
                            value: false
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
                    this.modal_editar = true
                }
            }
        },
        async guardar_editar(){
			this.$q.loading.show()
            const {editar_usuario_id,editar_email,editar_id_perfil,editar_nombre,editar_telefono,editar_id_pais,editar_nombre_empresa,editar_cargo,editar_producto_empresa,editar_universidad,editar_carrera,editar_suscrito_mail,editar_estado} = this
            var est = editar_estado.value
            await this.$store.dispatch("Usuario/editarUsuario", { 
                usuario_id : editar_usuario_id,
                email : editar_email,
                id_perfil : editar_id_perfil,
                nombre : editar_nombre,
                telefono : editar_telefono,
                id_pais : editar_id_pais,
                nombre_empresa : editar_nombre_empresa,
                cargo : editar_cargo,
                producto_empresa : editar_producto_empresa,
                universidad : editar_universidad,
                carrera : editar_carrera,
                suscrito_mail : editar_suscrito_mail,
                estado : est
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
            // if(this.registro_editado){
            //     await this.iniciar()
            // }
        },
        limpiar_editar(){
            this.editar_usuario_id = ''
            this.editar_email = ''
            this.editar_id_perfil = ''
            this.editar_nombre = ''
            this.editar_telefono = ''
            this.editar_id_pais = ''
            this.editar_nombre_empresa = ''
            this.editar_cargo = ''
            this.editar_producto_empresa = ''
            this.editar_universidad = ''
            this.editar_carrera = ''
            this.editar_suscrito_mail = {
                label: 'Suscrito',
                value: true
            }
            this.editar_estado = {
                label: 'Activo',
                value: true
            }

        },
        limpiar_nuevo(){
            this.nuevo_usuario_id = ''
            this.nuevo_email = ''
            this.nuevo_id_perfil = ''
            this.nuevo_nombre = ''
            this.nuevo_telefono = ''
            this.nuevo_id_pais = ''
            this.nuevo_nombre_empresa = ''
            this.nuevo_cargo = ''
            this.nuevo_producto_empresa = ''
            this.nuevo_universidad = ''
            this.nuevo_carrera = ''
            this.nuevo_suscrito_mail = {
                label: 'Suscrito',
                value: true
            }
            this.nuevo_estado = {
                label: 'Activo',
                value: true
            }

        },
        async guardar_nuevo() {
			this.$q.loading.show()
            const {nuevo_usuario_id,nuevo_email,nuevo_id_perfil,nuevo_nombre,nuevo_telefono,nuevo_id_pais,nuevo_nombre_empresa,nuevo_cargo,nuevo_producto_empresa,nuevo_universidad,nuevo_carrera,nuevo_suscrito_mail,nuevo_estado} = this
            var est = nuevo_estado.value
            await this.$store.dispatch("Usuario/crearUsuario", { 
                usuario_id : nuevo_usuario_id,
                email : nuevo_email,
                id_perfil : nuevo_id_perfil,
                nombre : nuevo_nombre,
                telefono : nuevo_telefono,
                id_pais : nuevo_id_pais,
                nombre_empresa : nuevo_nombre_empresa,
                cargo : nuevo_cargo,
                producto_empresa : nuevo_producto_empresa,
                universidad : nuevo_universidad,
                carrera : nuevo_carrera,
                suscrito_mail : nuevo_suscrito_mail,
                estado : est
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
            await this.$store.dispatch("Usuario/eliminarUsuario", { id:this.parametros_tabla.selected}).then(res => {
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
                // this.iniciar()
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
                // this.iniciar()
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
                // this.iniciar()
            }
        },
    }

})
