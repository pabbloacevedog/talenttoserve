<template>
    <div>
        
        <!-- <q-breadcrumbs v-if="$q.platform.is.mobile" active-color="accent">
            <div class="flex items-center justify-end q-gutter-sm">
                <q-btn
                    rounded
                    icon="add"
                    color="primary"
                    size="md"
                    label="Agregar Item"
                    class="btn_add"
                    @click="mostrarNuevo()"
                />
            </div>
        </q-breadcrumbs> -->
        <q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="$q.platform.is.mobile">
            <q-btn fab icon="add" color="accent" @click="mostrarNuevo()" />
        </q-page-sticky>
        <q-breadcrumbs active-color="accent" v-if="$q.platform.is.desktop">
            <template v-slot:separator>
                <q-icon
                size="1.2em"
                name="arrow_forward"
                color="accent"
                />
            </template>

            <q-breadcrumbs-el label="Home" icon="home" to="/"  class="b_link"/>
            <q-breadcrumbs-el :label="parametros_tabla.tittle" icon="fab fa-whmcs" class="b_activo" />
            <div class="flex items-center justify-end q-gutter-sm" >
                <q-chip clickable  @click="mostrarNuevo()" class="btn_add">
                    <q-avatar class="activo icon_add" text-color="white" >
                        <span class="material-icons">
                            add
                        </span>
                    </q-avatar>
                    Crear Nuevo
                </q-chip >
            </div>
        </q-breadcrumbs>
        <div v-if="$q.platform.is.mobile">
            <tabla :parametros="parametros_tabla" :funciones="funciones" />
        </div>
        <div style="padding-top: 2%;" v-else>
            <tabla :parametros="parametros_tabla" :funciones="funciones" />
        </div>
        <q-dialog
            v-model="modal_nuevo"
            persistent
            :maximized="maximizedToggle"
            transition-show="slide-up"
            transition-hide="slide-down"
        >
            <q-card class="modales text-white">
            <q-bar>
                <q-space></q-space>
                <q-btn dense flat icon="close" v-close-popup>
                <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
                </q-btn>
            </q-bar>
            <q-card-section align="center" v-if="$q.platform.is.desktop">
                <div class="text-h5 titulo_crear" color="text">Nuevo Perfil</div>
                    <div class="row">
                        <div class="col-6">       
                            <div class="text-h6 titulo_crear" color="text">Datos del Perfil</div>     
                        </div>
                        <div class="col-6">  
                            <div class="text-h6 titulo_crear" color="text">Rutas del Perfil</div>     
                        </div>      
                </div>   
            </q-card-section>
            <q-card-section align="center" v-else>
                <div class="text-h5 titulo_crear" color="text">Nuevo Perfil</div>
            </q-card-section>
            <q-card-section class="q-pt-none" v-if="$q.platform.is.desktop">
                    <div class="row">
                        <div class="col-6" style="padding: 3% 8%;">       
                            <q-input  dense standout required label='Nombre' v-model='nuevo_nombre' class="input-reg">
                            </q-input>
                            <q-input  dense standout required label='Descripción' v-model='nuevo_descripcion' class="input-reg">
                            </q-input>   
                            <q-select dense standout required v-model="nuevo_estado" :options="estados" label="Estado"/>      
                        </div>
                        <div class="col-6" style="padding: 3% 8%;">  
                            <div class="row ">
                                <div  class="col-5 text-subtitle1 titulo_crear">Nombre</div>
                                <div  class="col-5 text-subtitle1 titulo_crear">Ruta</div>
                                <div class="col-2 text-subtitle1 titulo_crear">Asignado</div>
                            </div>
                            <div
                            v-for="(dim) in rutas_guardar_nuevo"
                            :key="dim.path"
                            class="row"
                            >
                                <div  class="col-5 texto_check" >{{dim.name}}</div>
                                <div  class="col-5 texto_check">{{dim.path}}</div>
                                <div class="col-2 texto_check" align="center" style="cursor: pointer;">
                                    <q-checkbox v-model="dim.value" color="accent"></q-checkbox>
                                </div>
                                <q-separator />
                            </div>
                        </div>      
                    </div>
            </q-card-section>
            <q-card-section align="center" v-else>
                <div class="row">
                    <div class="col-12">       
                        <q-input  dense standout required label='Nombre' v-model='nuevo_nombre' class="input-reg">
                        </q-input>
                        <q-input  dense standout required label='Descripción' v-model='nuevo_descripcion' class="input-reg">
                        </q-input>   
                        <q-select dense standout required v-model="nuevo_estado" :options="estados" label="Estado" class="input-reg"/>      
                    </div>
                    <div class="col-12" style="padding-bottom: 5%;">  
                        <div class="text-h6 titulo_crear" color="text">Rutas del Perfil</div>     
                    </div>     
                    <div class="col-12" >  
                        <div class="row ">
                            <div  class="col-4 text-subtitle1 titulo_crear">Nombre</div>
                            <div  class="col-4 text-subtitle1 titulo_crear">Ruta</div>
                            <div class="col-4 text-subtitle1 titulo_crear">Asignado</div>
                        </div>
                    </div>
                    <div class="col-12"> 
                        <div v-for="(dim) in rutas_guardar_nuevo" :key="dim.path" class="row">
                            <div  class="col-4 " >{{dim.name}}</div>
                            <div  class="col-4 ">{{dim.path}}</div>
                            <div class="col-4 texto_check" align="center" style="cursor: pointer;">
                                <q-checkbox v-model="dim.value" color="accent"></q-checkbox>
                            </div>
                        </div>
                    </div>      
                </div>
            </q-card-section>
            <q-card-section align="center">
                <q-btn class="cancelar"  @click.native="modal_nuevo = false ">CANCELAR</q-btn>
                <q-btn class="bg-accent text-white" @click="guardar_nuevo()">GUARDAR</q-btn>
            </q-card-section>
            </q-card>
        </q-dialog>
        <q-dialog
            v-model="modal_editar"
            persistent
            :maximized="maximizedToggle"
            transition-show="slide-up"
            transition-hide="slide-down"
        >
            <q-card class="modales text-white">
            <q-bar>
                <q-space></q-space>
                <q-btn dense flat icon="close" v-close-popup>
                <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
                </q-btn>
            </q-bar>
            <q-card-section align="center" v-if="$q.platform.is.desktop">
                <div class="text-h5 titulo_crear" color="text">Editar Perfil</div>
                    <div class="row">
                        <div class="col-6">       
                            <div class="text-h6 titulo_crear" color="text">Datos del Perfil</div>     
                        </div>
                        <div class="col-6">  
                            <div class="text-h6 titulo_crear" color="text">Rutas del Perfil</div>     
                        </div>      
                </div>   
            </q-card-section>
            <q-card-section align="center" v-else>
                <div class="text-h5 titulo_crear" color="text">Editar Perfil</div>
            </q-card-section>
            <q-card-section class="q-pt-none" v-if="$q.platform.is.desktop">
                    <div class="row">
                        <div class="col-6" style="padding: 3% 8%;">       
                            <q-input  dense standout required label='Nombre' v-model='editar_nombre' class="input-reg">
                            </q-input>
                            <q-input  dense standout required label='Descripción' v-model='editar_descripcion' class="input-reg">
                            </q-input>   
                            <q-select dense standout required v-model="editar_estado" :options="estados" label="Estado"/>      
                        </div>
                        <div class="col-6" style="padding: 3% 8%;">  
                            <div class="row ">
                                <div  class="col-5 text-subtitle1 titulo_crear">Nombre</div>
                                <div  class="col-5 text-subtitle1 titulo_crear">Ruta</div>
                                <div class="col-2 text-subtitle1 titulo_crear">Asignado</div>
                            </div>
                            <div
                            v-for="(dim) in rutas_guardar"
                            :key="dim.path"
                            class="row"
                            >
                                <div  class="col-5 texto_check" >{{dim.name}}</div>
                                <div  class="col-5 texto_check">{{dim.path}}</div>
                                <div class="col-2 texto_check" align="center" style="cursor: pointer;">
                                    <q-checkbox v-model="dim.value" color="accent"></q-checkbox>
                                </div>
                                <q-separator />
                            </div>
                        </div>      
                    </div>
            </q-card-section>
            <q-card-section align="center" v-else>
                <div class="row">
                    <div class="col-12">       
                        <q-input  dense standout required label='Nombre' v-model='editar_nombre' class="input-reg">
                        </q-input>
                        <q-input  dense standout required label='Descripción' v-model='editar_descripcion' class="input-reg">
                        </q-input>   
                        <q-select dense standout required v-model="editar_estado" :options="estados" label="Estado" class="input-reg"/>      
                    </div>
                    <div class="col-12" style="padding-bottom: 5%;">  
                        <div class="text-h6 titulo_crear" color="text">Rutas del Perfil</div>     
                    </div>     
                    <div class="col-12" >  
                        <div class="row ">
                            <div  class="col-4 text-subtitle1 titulo_crear">Nombre</div>
                            <div  class="col-4 text-subtitle1 titulo_crear">Ruta</div>
                            <div class="col-4 text-subtitle1 titulo_crear">Asignado</div>
                        </div>
                    </div>
                    <div class="col-12"> 
                        <div v-for="(dim) in rutas_guardar" :key="dim.path" class="row">
                            <div  class="col-4 " >{{dim.name}}</div>
                            <div  class="col-4 ">{{dim.path}}</div>
                            <div class="col-4 texto_check" align="center" style="cursor: pointer;">
                                <q-checkbox v-model="dim.value" color="accent"></q-checkbox>
                            </div>
                        </div>
                    </div>      
                </div>
            </q-card-section>
            <q-card-section align="center">
                <q-btn class="cancelar"  @click.native="modal_editar = false ">CANCELAR</q-btn>
                <q-btn class="bg-accent text-white" @click="guardar_editar()">CONFIRMAR</q-btn>
            </q-card-section>
            </q-card>
        </q-dialog>

        <q-dialog persistent width="800" v-model="modal_eliminar" >
            <q-card class="modales" style="width: 800px;">
                <q-card-section align="center">
                    <div class="text-h6 titulo_crear" color="text">Eliminar registro</div>
                </q-card-section>
                <q-card-section align="center" v-if="parametros_tabla.selected.length > 1">
                    <div class="text-h6 b_eliminar" color="text">
                        ¿Está seguro que desea eliminar estos {{parametros_tabla.selected.length}} registros?
                    </div>
                </q-card-section>
                <q-card-section align="center" v-if="parametros_tabla.selected.length == 1">
                    <div class="text-h6 b_eliminar" color="text">
                        ¿Está seguro que desea eliminar el registro
                        <div class="text-h6 n_eliminar" color="text">
                            {{parametros_tabla.selected[0].nombre}} 
                        </div>
                        ?
                    </div>
                    
                </q-card-section>
                <div class="q-mt-md q-pb-md q-pr-lg q-pl-lg" style="text-align: right;">
                    <q-btn class="cancelar"  @click.native="modal_eliminar = false ">CANCELAR</q-btn>
                    <q-btn class="bg-accent text-white" @click="guardar_eliminar()">CONFIRMAR</q-btn>
                </div>
            </q-card>
        </q-dialog>
    </div>
</template>

<script src="./index.js">
</script>

<style lang="stylus" >
	@import './index.styl'
</style>
