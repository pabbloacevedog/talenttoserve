<template>
    <div>
        <q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="$q.platform.is.mobile">
            <q-btn fab icon="add" color="accent" @click="modal_nuevo = true" />
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
                <q-chip clickable  @click="modal_nuevo = true" class="btn_add">
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
        transition-show="slide-up"
        transition-hide="slide-down"
        
        >
            <q-card class="modales" style="width: 700px; max-width: 80vw !important;" color="primary">
                <q-card-section align="center">
                    <div class="text-h6 titulo_crear" color="text">Nuevo Usuario</div>
                </q-card-section>
                <q-card-section class="area_comment">    
                    <div class="row">
                        <div class="col-6">
                            <q-input  dense standout required label='Nombre' v-model='nuevo_nombre' class="input-reg q-mx-lg">
                            </q-input>
                            <q-input dense standout required label='Password' v-model="nuevo_password" class="input-reg q-mx-lg" :type="isPwd ? 'password' : 'text'">
                                <template v-slot:append>
                                    <q-icon
                                        :name="isPwd ? 'visibility_off' : 'visibility'"
                                        class="cursor-pointer"
                                        @click="isPwd = !isPwd"
                                    />
                                </template>
                            </q-input>
                            <q-input  dense standout required label='Email' v-model='nuevo_email' class="input-reg q-mx-lg">
                            </q-input>
                            <q-select dense standout required v-model="nuevo_perfil" :options="select_perfil" label="Perfil" class="input-reg q-mx-lg"/>
                            <q-input  dense standout required label='Telefono' v-model='nuevo_telefono' class="input-reg q-mx-lg">
                            </q-input>
                            <q-select dense standout required v-model="nuevo_id_pais" :options="select_pais" label="País" class="input-reg q-mx-lg"/>
                        </div>
                        <div class="col-6">
                            <q-input  dense standout required label='Empresa' v-model='nuevo_nombre_empresa' class="input-reg q-mx-lg">
                            </q-input>
                            <q-select dense standout required v-model="nuevo_cargo" :options="select_cargo" label="Cargo" class="input-reg q-mx-lg"/>
                            <q-input  dense standout required label='Producto' v-model='nuevo_producto_empresa' class="input-reg q-mx-lg">
                            </q-input>
                            <q-input  dense standout required label='Universidad' v-model='nuevo_universidad' class="input-reg q-mx-lg">
                            </q-input>
                            <q-input  dense standout required label='Carrera' v-model='nuevo_carrera' class="input-reg q-mx-lg">
                            </q-input>
                            <q-select dense standout required v-model="nuevo_estado" :options="estados" label="Estado" class="input-reg q-mx-lg"/>
                        </div>               
					</div>         
                </q-card-section>
                <div class="q-pb-lg" style="text-align: center;">
                    <q-btn rounded @click.native="modal_nuevo = false" class="cancelar">Cancelar</q-btn>
                    <q-btn rounded class="bg-accent text-white" @click="guardar_nuevo()">Guardar</q-btn>
                </div>
            </q-card>
        </q-dialog>
        <q-dialog
        v-model="modal_editar"
        persistent
        transition-show="slide-up"
        transition-hide="slide-down"
        
        >
            <q-card class="modales" style="width: 700px; max-width: 80vw !important;">
                <q-card-section align="center">
                    <div class="text-h6 titulo_crear" color="text">Editar Usuario</div>
                </q-card-section>
                <q-card-section class="area_comment">    
                    <div class="row">
                        <div class="col-6">
                            <q-input  dense standout required label='Nombre' v-model='editar_nombre' class="input-reg q-mx-lg">
                            </q-input>
                            <q-input  dense standout required label='Email' v-model='editar_email' class="input-reg q-mx-lg">
                            </q-input>
                            <q-select dense standout required v-model="editar_id_perfil" :options="select_perfil" label="Perfil" class="input-reg q-mx-lg"/>
                            <q-input  dense standout required label='Telefono' v-model='editar_telefono' class="input-reg q-mx-lg">
                            </q-input>
                            <q-select dense standout required v-model="editar_id_pais" :options="select_pais" label="País" class="input-reg q-mx-lg"/>
                            <q-input  dense standout required label='Empresa' v-model='editar_nombre_empresa' class="input-reg q-mx-lg">
                            </q-input>
                        </div>
                        <div class="col-6">
                            <q-select dense standout required v-model="editar_cargo" :options="select_cargo" label="Cargo" class="input-reg q-mx-lg"/>
                            <q-input  dense standout required label='Producto' v-model='editar_producto_empresa' class="input-reg q-mx-lg">
                            </q-input>
                            <q-input  dense standout required label='Universidad' v-model='editar_universidad' class="input-reg q-mx-lg">
                            </q-input>
                            <q-input  dense standout required label='Carrera' v-model='editar_carrera' class="input-reg q-mx-lg">
                            </q-input>
                            <q-select dense standout required v-model="editar_suscrito_mail" :options="estados_suscrito" label="Suscrito Newsletter" class="input-reg q-mx-lg"/>
                            <q-select dense standout required v-model="editar_estado" :options="estados" label="Estado" class="input-reg q-mx-lg"/>
                        </div>               
					</div>         
                </q-card-section>
                <div class="q-pb-lg" style="text-align: center;">
                    <q-btn rounded @click.native="modal_editar = false" class="cancelar">Cancelar</q-btn>
                    <q-btn rounded class="bg-accent text-white" @click="guardar_editar()">Guardar</q-btn>
                </div>
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
                <div class="q-pb-lg" style="text-align: center;">
                    <q-btn rounded @click.native="modal_eliminar = false" class="cancelar">Cancelar</q-btn>
                    <q-btn rounded class="bg-accent text-white" @click="guardar_eliminar()">Guardar</q-btn>
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
