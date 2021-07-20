<template>
    <div>
        <!-- <q-breadcrumbs v-if="$q.platform.is.mobile" active-color="accent">
            <div class="flex items-center justify-end q-gutter-sm">
                <q-btn
                    rounded
                    icon="fab fa-whmcs"
                    color="primary"
                    size="md"
                    label="Configurar U. Base"
                    class="btn_conf"
                    @click="show_conf()"
                />
                <q-btn
                    rounded
                    icon="add"
                    color="primary"
                    size="md"
                    label="Agregar Item"
                    class="btn_add"
                    @click="show_modal_nuevo()"
                />
            </div>
        </q-breadcrumbs> -->
        <q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="$q.platform.is.mobile">
            <q-fab
            icon="add"
            direction="up"
            color="accent"
            label-position="left"
            >
                <q-fab-action color="primary" label-position="left" external-label @click="show_modal_nuevo()" label="Agregar unidad de medida" icon="add"/>
                <q-fab-action color="primary" label-position="left" external-label @click="show_conf()" label="Configurar unidad base" icon="fab fa-whmcs" />
            </q-fab>
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

            <div class="flex items-center justify-end q-gutter-sm">
                <q-btn
                    rounded
                    icon="fab fa-whmcs"
                    color="primary"
                    size="md"
                    label="Configurar U. Base"
                    class="btn_conf"
                    @click="show_conf()"
                />
                <q-btn
                    rounded
                    icon="add"
                    color="primary"
                    size="md"
                    label="Agregar Item"
                    class="btn_add"
                    @click="show_modal_nuevo()"
                />
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
            <q-card class="modales" style="width: 500px !important;" color="primary">
                <q-card-section align="center">
                    <div class="text-h6 titulo_crear" color="text">Nuevo Unidad de Medida</div>
                </q-card-section>
                <q-card-section class="area_comment">
                    <q-input  
                        dense 
                        standout 
                        required 
                        v-model="nuevo_unidad_base"
                        label="Unidad_base"
                        class="input-reg"
                        clearable
                        @keypress="solo_numeros"
                        :hint="'En ' +nuevo_nombre_unidad_base + 's'"
                        disabled
                        readonly
                    >
					</q-input>  
                    <q-input  
                        dense 
                        standout 
                        required 
                        v-model="nuevo_unidad_conversion"
                        label="Unidad de Conversión"
                        class="input-reg"
                        clearable
                        @keypress="solo_numeros"
                        :hint="'Equivalente en ' +nuevo_nombre_unidad_base + 's de la nueva unidad de medida'"
                    >
					</q-input>                       
					<q-input  dense standout required label='Nombre' v-model='nuevo_nombre' class="input-reg">
					</q-input>
					<q-input  dense standout required label='Descripción' v-model='nuevo_descripcion' class="input-reg">
					</q-input>
                    <q-input  dense standout required label='Acrónimo' v-model='nuevo_acronimo' class="input-reg" maxlength="3">
					</q-input>
                    <q-select dense standout required v-model="nuevo_estado" :options="estados" label="Estado" class="input-reg"/>
                </q-card-section>
                <div class="q-mt-md q-pb-md q-pr-lg q-pl-lg" style="text-align: right;">
                    <q-btn @click.native="modal_nuevo = false" class="cancelar">Cancelar</q-btn>
                    <q-btn class="guardar" @click="guardar_nuevo()">Guardar</q-btn>
                </div>
            </q-card>
        </q-dialog>
        <q-dialog
        v-model="modal_editar"
        persistent
        transition-show="slide-up"
        transition-hide="slide-down"
        
        >
            <q-card class="modales" style="width: 500px !important;">
                <q-card-section align="center">
                    <div class="text-h6 titulo_crear" color="text">Editar Unidad de Medida</div>
                </q-card-section>
                <q-card-section class="area_comment">
                    <q-input  
                        dense 
                        standout 
                        required 
                        v-model="editar_unidad_base"
                        label="Unidad_base"
                        class="input-reg"
                        clearable
                        @keypress="solo_numeros"
                        disabled
                        readonly
                        :hint="'En ' +nuevo_nombre_unidad_base + 's'"
                    >
                    </q-input>   
                    <q-input  
                        dense 
                        standout 
                        required 
                        v-model="editar_unidad_conversion"
                        label="Unidad de Conversión"
                        class="input-reg"
                        clearable
                        @keypress="solo_numeros"
                        :hint="'Equivalente en ' +nuevo_nombre_unidad_base + 's de la nueva unidad de medida'"
                    >
					</q-input>                        
					<q-input  dense standout required label='Nombre' v-model='editar_nombre' class="input-reg">
					</q-input>
					<q-input  dense standout required label='Descripción' v-model='editar_descripcion' class="input-reg">
					</q-input>
                    <q-input  dense standout required label='Acrónimo' v-model='editar_acronimo' class="input-reg" maxlength="3">
					</q-input>
                    <q-select dense standout required v-model="editar_estado" :options="estados" label="Estado" class="input-reg"/>
                </q-card-section>
                <div class="q-mt-md q-pb-md q-pr-lg q-pl-lg" style="text-align: right;">
                    <q-btn @click.native="modal_editar = false" class="cancelar">Cancelar</q-btn>
                    <q-btn class="guardar" @click="guardar_editar()">Guardar</q-btn>
                </div>
            </q-card>
        </q-dialog>
        <q-dialog persistent width="800" v-model="modal_eliminar" >
            <q-card class="modales text" style="width: 800px;">
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
                    <q-btn class="guardar" @click="guardar_eliminar()">CONFIRMAR</q-btn>
                </div>
            </q-card>
        </q-dialog>
        <q-dialog persistent style="width: 1400px; max-width: 80vw;" v-model="modal_unidad_base" >
            <q-card class="modales" style="max-width: 1200px !important;width: 800px !important;">
                <q-card-section align="center">
                    <div class="text-h6 titulo_crear" color="text">Configurar Unidad base</div>
                </q-card-section>
                <q-card-section align="center" v-if="$q.platform.is.mobile">
                        <div class="col-12" style="padding: 1%">  
                            <div class="row ">
                                <div  class="col-2 col-xs-6 text-subtitle2 titulo_crear">Nombre</div>
                                <div  class="col-2 col-xs-6 text-subtitle2 titulo_crear">Abreviatura</div>
                            </div>
                            <div class="row">
                                <div  class="col-2 col-xs-6 texto_check" style="padding-top: 1%;">{{selected_ub.nombre}}</div>
                                <div  class="col-2 col-xs-6 texto_check" style="padding-top: 1%;">{{selected_ub.acronimo}}</div>
                            </div>
                            <div class="row " style="padding: 3%">
                                <div  class="col-2 col-xs-6 text-subtitle2 titulo_crear">Unidad Min</div>
                                <div  class="col-2 col-xs-6 text-subtitle2 titulo_crear">Unidad En (milímetros)</div>
                            </div>
                            <div class="row">
                                <div  class="col-2 col-xs-6 texto_check" style="padding-top: 1%;">1</div>
                                <div  class="col-2 col-xs-6 texto_check" style="padding-top: 1%;">{{selected_ub.unidad}}</div>
                            </div>
                            <div class="row " style="padding: 3%">
                                <div class="col-12 text-subtitle2 titulo_crear">Asignado</div>
                            </div>
                            <div class="row">
                                <div class="col-12 texto_check" align="center" style="padding: 0 4%;">
                                    <q-select dense standout required v-model="selected_ub" :options="options_ub"/>
                                </div>
                            </div>
                        </div>
                </q-card-section>
                <q-card-section align="center" v-else>
                        <div class="col-12" style="padding: 1%">  
                            <div class="row ">
                                <div  class="col-2 text-subtitle2 titulo_unidad">Nombre</div>
                                <div  class="col-2 text-subtitle2 titulo_unidad">Abreviatura</div>
                                <div  class="col-2 text-subtitle2 titulo_unidad">Unidad Min</div>
                                <div  class="col-2 text-subtitle2 titulo_unidad">Unidad En (milímetros)</div>
                                <div class="col-4 text-subtitle2 titulo_unidad">Asignado</div>
                            </div>
                            <div class="row">
                                <div  class="col-2 texto_check" style="padding-top: 1%;">{{selected_ub.nombre}}</div>
                                <div  class="col-2 texto_check" style="padding-top: 1%;">{{selected_ub.acronimo}}</div>
                                <div  class="col-2 texto_check" style="padding-top: 1%;">1</div>
                                <div  class="col-2 texto_check" style="padding-top: 1%;">{{selected_ub.unidad}}</div>
                                <div class="col-4 texto_check" align="center" style="padding: 0 4%;">
                                    <q-select dense standout required v-model="selected_ub" :options="options_ub"/>
                                </div>
                            </div>
                        </div>
                </q-card-section>
                <div class="q-mt-md q-pb-md q-pr-lg q-pl-lg" style="text-align: center;">
                    <q-btn class="cancelar"  @click.native="modal_unidad_base = false ">CANCELAR</q-btn>
                    <q-btn class="guardar" @click="guardar_unidad_base()">CONFIRMAR</q-btn>
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
