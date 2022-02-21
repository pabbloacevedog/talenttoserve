import Vue from 'vue'
import {getUserFromToken} from '@utils/authService'
import { mapGetters } from 'vuex'
export default Vue.component('OpPractica', {
    $validates: 1,
    components:{
        tabla:() => import('./tabla/tabla.vue')
    },
	data () {
		return {
            img:'/statics/login.jpg',
            nuevo_cargo:'',
            nuevo_descripcion:'',
            nuevo_link:'',
            nuevo_hotel:'',
            nuevo_estado :
                {
                label: 'Activo',
                value: true
                }
            ,
            editar_codigo: '',
            editar_cargo:'',
            editar_descripcion:'',
            editar_link:'',
            editar_hotel:'',
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
                tittle: 'Oportunidades de Practica',
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
                    name: 'cargo',
                    label: 'cargo',
                    align: 'left',
                    field: 'cargo',
                    sortable: true
                  },
                  { name: 'descripcion', align: 'center', label: 'Descripción', field: 'descripcion', sortable: true },
                  { name: 'link', align: 'center', label: 'Link', field: 'link', sortable: true },
                  { name: 'hotel', align: 'center', label: 'Hotel', field: 'hotel', sortable: true },
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
            dataOpPractica: "OpPractica/getData",
            registro_creado: "OpPractica/getCreado",
            registro_editado: "OpPractica/getEditado",
            registro_eliminado: "OpPractica/getEliminado",
            error: "OpPractica/error" ,
        })
	},
	methods: {
        async iniciar () {
            this.$q.loading.show()
			await this.$store.dispatch("OpPractica/cargarOpPractica").then(res => {
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
                    console.log('dataOpPractica',this.dataOpPractica)
                    this.parametros_tabla.data = this.dataOpPractica
				}
			}).catch(err => {
				console.log(err)
			})
        },
        editar(){
            if(this.parametros_tabla.selected.length == 1){
                this.editar_codigo = this.parametros_tabla.selected[0].codigo
                this.editar_cargo = this.parametros_tabla.selected[0].cargo
                this.editar_descripcion = this.parametros_tabla.selected[0].descripcion
                this.editar_link = this.parametros_tabla.selected[0].link
                this.editar_hotel = this.parametros_tabla.selected[0].hotel
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
                const element = this.parametros_tabla.data[index].codigo;
                if(id == element)
                {
                    this.editar_codigo = this.parametros_tabla.data[index].codigo
                    this.editar_cargo = this.parametros_tabla.data[index].cargo
                    this.editar_descripcion = this.parametros_tabla.data[index].descripcion
                    this.editar_link = this.parametros_tabla.data[index].link
                    this.editar_hotel = this.parametros_tabla.data[index].hotel
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
            const {editar_cargo, editar_descripcion , editar_link, editar_hotel, editar_estado} = this
            var est = editar_estado.value
            await this.$store.dispatch("OpPractica/editarOpPractica", { codigo : this.editar_codigo, cargo:editar_cargo, descripcion:editar_descripcion ,link: editar_link, hotel: editar_hotel,  estado:est }).then(res => {
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
            this.editar_cargo = ''
            this.editar_descripcion = ''
            this.editar_link = ''
            this.editar_hotel = ''
            this.editar_estado = {
                label: 'Activo',
                value: true
            }

        },
        limpiar_nuevo(){
            this.nuevo_codigo = ''
            this.nuevo_cargo = ''
            this.nuevo_descripcion = ''
            this.nuevo_link = ''
            this.nuevo_hotel = ''
            this.nuevo_estado = {
                label: 'Activo',
                value: true
            }

        },
        async guardar_nuevo() {

            const {nuevo_cargo, nuevo_descripcion , nuevo_link, nuevo_hotel, nuevo_estado} = this
            var est = nuevo_estado.value
            if(nuevo_cargo == ''){
                this.$q.notify({
                    message: 'El cargo es obligatorio',
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
            else if(nuevo_link == ''){
                this.$q.notify({
                    message: 'Ingrese link para rideccionar',
                    timeout: 3000,
                    type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
                    position: 'bottom',
                    icon: 'report_problem'
                })
            }
            else if(nuevo_hotel == ''){
                this.$q.notify({
                    message: 'Ingrese Hotel',
                    timeout: 3000,
                    type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
                    position: 'bottom',
                    icon: 'report_problem'
                })
            }
            else{
                this.$q.loading.show()
                await this.$store.dispatch("OpPractica/crearOpPractica", { cargo: nuevo_cargo, descripcion:nuevo_descripcion , link: nuevo_link, hotel: nuevo_hotel,  estado:est }).then(res => {
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
            await this.$store.dispatch("OpPractica/eliminarOpPractica", { id:this.parametros_tabla.selected}).then(res => {
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
            // if(this.modal_nuevo){
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
        'modal_editar': function () {
            // if(this.modal_editar){
            //     var element = document.getElementById("q-app");
            //     element.classList.add("modal-open");
            // }
            // else{
            //     // var element = document.getElementById("q-app");
            //     // element.classList.remove("modal-open");
            //     // this.parametros_tabla.data.length = 0
            //     // this.iniciar()
            // }
        },
        'modal_eliminar': function () {
            // if(this.modal_eliminar){
            //     // var element = document.getElementById("q-app");
            //     // element.classList.add("modal-open");
            // }
            // else{
            //     // var element = document.getElementById("q-app");
            //     // element.classList.remove("modal-open");
            //     this.parametros_tabla.data.length = 0
            //     this.iniciar()
            // }
        },
    }

})
