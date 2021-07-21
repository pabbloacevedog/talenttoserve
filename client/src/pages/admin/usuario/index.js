import Vue from 'vue'
import {getUserFromToken} from '@utils/authService'
import { mapGetters } from 'vuex'
import CryptoJS from 'crypto-js'
export default Vue.component('Usuario', {
    $validates: 1,
    components:{
        tabla:() => import('./tabla/tabla.vue')
    },
	data () {
		return {
            img:'/statics/login.jpg',
            nuevo_email: '',
			nuevo_password: '',
			nuevo_nombre: '',
            nuevo_descripcion: '',
			nuevo_apellido:'',
            nuevo_usuario: '',
            nuevo_id_perfil: [],
            nuevo_rut:'',
            nuevo_telefono: '',
            nuevo_estado : 
                {
                label: 'Activo',
                value: true
                }
            ,
            editar_email: '',
			editar_password: '',
			editar_nombre: '',
            editar_descripcion:'',
			editar_apellido:'',
            editar_usuario: '',
            editar_id_perfil: [],
            editar_rut:'',
            editar_telefono: '',
            editar_estado : 
                {
                label: 'Activo',
                value: true
                }
            ,
            isPwd: true,
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
                selectedkey: 'uuid_usuario', 
                columns: [
                  {
                    name: 'rut',
                    label: 'Rut',
                    align: 'left',
                    field: 'rut',
                    sortable: true
                  },
                  { name: 'nombre', align: 'center', label: 'Nombres', field: 'nombre', sortable: true },
                  { name: 'apellido', align: 'center', label: 'Apellidos', field: 'apellido', sortable: true },
                  { name: 'email', align: 'center', label: 'E-nmail', field: 'email', sortable: true },
                  { name: 'usuario', align: 'center', label: 'Usuario', field: 'usuario', sortable: true },
                  { name: 'telefono', align: 'center', label: 'Tel', field: 'telefono', sortable: true },
                  { name: 'descripcion', align: 'center', label: 'Desc', field: 'descripcion', sortable: true },
                  { name: 'id_perfil', align: 'center', label: 'Perfil', field: 'id_perfil', sortable: true },
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
            ],
            perfiles: []
        }
	},
	computed: {
		...mapGetters({ 
            dataPerfil: "Perfil/getData", 
            dataUsuario: "Usuario/getData", 
            registro_creado: "Usuario/getCreado",
            registro_editado: "Usuario/getEditado",
            registro_eliminado: "Usuario/getEliminado",
            error: "Usuario/error" , 
        })
	},
	methods: {
        async cargarPerfiles () {
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
                    for (let index = 0; index < this.dataPerfil.length; index++) {
                        const label = this.dataPerfil[index].nombre;
                        const value = this.dataPerfil[index].id_perfil;

                        var obj = {
                            value: value,
                            label: label
                        }
                        this.perfiles.push(obj)
                    }
                    console.log('dataPerfil',this.dataPerfil)
				}
			}).catch(err => {
				console.log(err)
			})
        },
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
                this.editar_uuid_usuario = this.parametros_tabla.selected[0].uuid_usuario
                this.editar_rut = this.parametros_tabla.selected[0].rut
                this.editar_nombre = this.parametros_tabla.selected[0].nombre
                this.editar_apellido = this.parametros_tabla.selected[0].apellido
                this.editar_email = this.parametros_tabla.selected[0].email
                this.editar_usuario = this.parametros_tabla.selected[0].usuario
                this.editar_telefono = this.parametros_tabla.selected[0].telefono
                var perfil = {
                    value : this.parametros_tabla.selected[0].id_perfil,
                    label : this.parametros_tabla.selected[0].perfil
                }
                this.editar_id_perfil = perfil
                this.editar_descripcion = this.parametros_tabla.selected[0].descripcion
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
                const element = this.parametros_tabla.data[index].uuid_usuario;
                if(id == element)
                {
                    this.editar_uuid_usuario = this.parametros_tabla.data[index].uuid_usuario
                    this.editar_rut = this.parametros_tabla.data[index].rut
                    this.editar_nombre = this.parametros_tabla.data[index].nombre
                    this.editar_apellido = this.parametros_tabla.data[index].apellido
                    this.editar_email = this.parametros_tabla.data[index].email
                    this.editar_usuario = this.parametros_tabla.data[index].usuario
                    this.editar_telefono = this.parametros_tabla.data[index].telefono
                    var perfil = {
                        value : this.parametros_tabla.data[index].id_perfil,
                        label : this.parametros_tabla.data[index].perfil
                    }
                    this.editar_id_perfil = perfil
                    this.editar_descripcion = this.parametros_tabla.data[index].descripcion

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
            const {editar_rut,editar_nombre, editar_apellido, editar_email, editar_usuario, editar_telefono, editar_descripcion , editar_id_perfil, editar_estado} = this
            // var gro = parseInt(editar_rut)
            var est = editar_estado.value
            var id_per = String(editar_id_perfil.value)
            await this.$store.dispatch("Usuario/editarUsuario", { uuid_usuario : this.editar_uuid_usuario, rut: editar_rut,nombre : editar_nombre, apellido: editar_apellido, email: editar_email, usuario: editar_usuario, telefono: editar_telefono, descripcion:editar_descripcion ,id_perfil:id_per, estado:est }).then(res => {
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
            this.editar_uuid_usuario = ''
            this.editar_rut = ''
            this.editar_nombre = ''
            this.editar_apellido = ''
            this.editar_email = ''
            this.editar_usuario = ''
            this.editar_telefono = ''
            this.editar_id_perfil = ''
            this.editar_descripcion = ''
            this.editar_estado = {
                label: 'Activo',
                value: true
            }

        },
        limpiar_nuevo(){
            this.nuevo_uuid_usuario = ''
            this.nuevo_rut = ''
            this.nuevo_nombre = ''
            this.nuevo_apellido = ''
            this.nuevo_email = ''
            this.nuevo_usuario = ''
            this.nuevo_telefono = ''
            this.nuevo_id_perfil = ''
            this.nuevo_descripcion = ''
            this.nuevo_estado = {
                label: 'Activo',
                value: true
            }

        },
        async guardar_nuevo() {
			this.$q.loading.show()
            const {nuevo_rut,nuevo_nombre, nuevo_apellido, nuevo_email, nuevo_usuario, nuevo_telefono, nuevo_descripcion , nuevo_estado, nuevo_id_perfil, nuevo_password} = this
            var est = nuevo_estado.value
            var id_per = nuevo_id_perfil.value
            var pass = process.env.PASSPHRASE;
            var encrypted = CryptoJS.AES.encrypt(nuevo_password, pass);
            await this.$store.dispatch("Usuario/crearUsuario", { rut: nuevo_rut,nombre : nuevo_nombre, apellido: nuevo_apellido, email: nuevo_email, usuario: nuevo_usuario, telefono: nuevo_telefono, descripcion:nuevo_descripcion ,id_perfil:id_per, estado:est, clave: encrypted.toString() }).then(res => {
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
        formatearRut(){
            this.nuevo_rut = this.$general.formatear_rut(this.nuevo_rut)
        },
        validarRut () {
            if (this.nuevo_rut != ""){
                var valido = this.$general.validar_rut(this.nuevo_rut.split('.').join('').split('-').join(''))
            
                if(valido){
                    this.error_rut = false
                }else{
                    this.error_rut = true
                }
            }
        },
        formatearRut_e(){
            this.editar_rut = this.$general.formatear_rut(this.editar_rut)
        },
        validarRut_e () {
            if (this.editar_rut != ""){
                var valido = this.$general.validar_rut(this.nuevoeditar_rut_rut.split('.').join('').split('-').join(''))
            
                if(valido){
                    this.error_rut = false
                }else{
                    this.error_rut = true
                }
            }
        },
        format(){
            var rutAndDv = splitRutAndDv(this.rut);
            var cRut = rutAndDv[0]; var cDv = rutAndDv[1];
            if(!(cRut && cDv)) { return cRut || this.rut; }
            var rutF = "";
            var thousandsSeparator = useThousandsSeparator ? "." : "";
            while(cRut.length > 3) {
                rutF = thousandsSeparator + cRut.substr(cRut.length - 3) + rutF;
                cRut = cRut.substring(0, cRut.length - 3);
            }
            return cRut + rutF + "-" + cDv;
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
        this.iniciar()
        this.cargarPerfiles()
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
    }

})
