<template>
    <div>
        <div class="row" v-if="$q.platform.is.desktop">
            <div class="col-8" style="padding-right: 1.4%;">   
                <q-card class="gestionar_corte" >
                    <q-card-section align="center">
                        <div>
                            <div style="float:left;width: 86%;">
                                <div class="titulo_crear" style="padding-left: 15%;padding-bottom: 3%;">Gestor Cortes</div>
                            </div>
                            <div style="float:rigth;">
                                <div class="volumen_restante" v-if="generado">Volumen restante: {{area_plancha_restante}} ({{unidad_medida_nuevo.label}})</div>
                            </div>
                        </div>
                    </q-card-section>
                    <q-card-section align="center"  v-if="creado">
                        <q-avatar class="gestion_icono" size="200px">
                            <img :src="icono_sierra">
                        </q-avatar> 
                        <div class="titulo_crear" color="text">Ingrese los parámetros en el panel lateral, para comenzar a generar cortes.</div>
                        <i class="fab fa-buffer"></i>
                    </q-card-section>
                    <q-card-section align="center"  v-if="!generado">
                        <q-avatar class="gestion_icono" size="200px">
                            <img :src="icono_sierra">
                        </q-avatar> 
                        <div class="text-h6 titulo_texto" color="text">Ingrese los parámetros en el panel lateral, para comenzar a generar cortes.</div>
                        <q-avatar class="stack_icono" size="120px">
                             <i class="fab fa-buffer"></i>
                        </q-avatar> 
                       
                    </q-card-section>
                    <q-card-section class="area_comment" v-else>
                        <tabla :parametros="parametros_tabla" :funciones="funciones_tabla" />
                    </q-card-section>
                    <q-card-section class="area_comment" v-if="generado" align="center">
                        <q-btn class="desechar_corte" style="margin-right: 3%;" v-if="verificar_corte_guardado()" @click.native="limpiar_cache_cortes()">Desechar</q-btn>
                        <q-btn class="guardar" style="width: 150px;" @click="generar_corte()">Generar cortes</q-btn>
                    </q-card-section>
                </q-card> 
            </div>
            <div class="col-4">
                <q-card class="parametros gestionar_corte">
                    <q-card-section align="center" style="padding: 3% 2% 1% 2% !important;">
                        <div class="text-h6 titulo_crear" color="text">Parámetros corte</div>
                    </q-card-section>
                    <q-card-section class="area_comment" style="padding: 16px 30px 0px 16px;">
                        <q-select dense standout required v-model="material_corte_nuevo" :options="options_material_corte" label="Seleccione material de corte" class=" input_style"/>
                        <q-select dense standout required v-model="grosor_sierra_nuevo" :options="options_grosor_sierra" label="Seleccione grosor sierra" class="input_style"/>
                        <q-select dense standout required v-model="unidad_medida_nuevo" :options="options_unidad_medida" label="Seleccione Unidad de medida" class="input_style"/>
                        <div style="float:left;width: 50%;">
                                <q-input  dense standout required :label="'Ancho plancha (' + unidad_medida_nuevo.acronimo + ')'" v-model='ancho_plancha' @keypress="solo_numeros" class="q-ml-md">
                                </q-input>
                            </div>
                            <div style="float:rigth;">
                                <q-input  dense standout required :label="'Alto plancha (' + unidad_medida_nuevo.acronimo + ')'" v-model='alto_plancha' @keypress="solo_numeros" class="q-ml-md input_style" style="">
                                </q-input>
                            </div>
                    </q-card-section>
                    <q-card-section align="center" style="padding: 0% 2% 1% 2% !important;">
                        <div class="text-h6 titulo_crear" color="text">Cortes</div>
                    </q-card-section>
                    <q-card-section class="area_comment" style="padding: 16px 30px 0px 16px;">
                        <div>
                            <div style="float:left;width: 50%;">
                                <q-input  dense standout required label='Ancho' v-model='ancho_corte' @keypress="solo_numeros" class="q-ml-md">
                                    <template v-slot:append>
                                        {{unidad_medida_nuevo.acronimo}}
                                    </template>
                                </q-input>
                            </div>
                            <div style="float:rigth;">
                                <q-input  dense standout required label='Alto' v-model='alto_corte' @keypress="solo_numeros" class="q-ml-md input_style" style="">
                                    <template v-slot:append>
                                        {{unidad_medida_nuevo.acronimo}}
                                    </template>
                                </q-input>
                            </div>
                            <q-input  dense standout required label='Cantidad' v-model='cantidad_corte' @keypress="solo_numeros" class="q-ml-md" style=""/>

                        </div>
                    </q-card-section>
                    <q-card-section align="center" class="area_comment">
                        <q-btn class="guardar" style="width: 150px;" @click="anadir_corte()">Añadir</q-btn>
                    </q-card-section>
                </q-card>
            </div>
        </div>
        <div class="row" v-else>
            <div class="col-12">
                <q-card class="parametros gestionar_corte">
                    <q-card-section align="center" style="padding: 3% 2% 1% 2% !important;">
                        <div class="text-h6 titulo_crear" color="text">Parámetros corte</div>
                    </q-card-section>
                    <q-card-section class="area_comment" style="padding: 16px 30px 0px 16px;">
                        <q-select dense standout required v-model="material_corte_nuevo" :options="options_material_corte" label="Seleccione material de corte" class=" input_style"/>
                        <q-select dense standout required v-model="grosor_sierra_nuevo" :options="options_grosor_sierra" label="Seleccione grosor sierra" class="input_style"/>
                        <q-select dense standout required v-model="unidad_medida_nuevo" :options="options_unidad_medida" label="Seleccione Unidad de medida" class="input_style"/>
                        <div style="float:left;width: 50%;">
                                <q-input  type="number" dense standout required :label="'Ancho plancha (' + unidad_medida_nuevo.acronimo + ')'" v-model='ancho_plancha' @keyup="solo_numeros" class="q-ml-md">
                                </q-input>
                            </div>
                            <div style="float:rigth;">
                                <q-input   type="number" dense standout required :label="'Alto plancha (' + unidad_medida_nuevo.acronimo + ')'" v-model='alto_plancha' @keyup="solo_numeros" class="q-ml-md input_style" style="">
                                </q-input>
                            </div>
                    </q-card-section>
                    <q-card-section align="center" style="padding: 0% 2% 1% 2% !important;">
                        <div class="text-h6 titulo_crear" color="text">Cortes</div>
                    </q-card-section>
                    <q-card-section class="area_comment" style="padding: 16px 30px 0px 16px;">
                        <div>
                            <div style="float:left;width: 50%;">
                                <q-input  type="number" dense standout required label='Ancho' v-model='ancho_corte' @keyup="solo_numeros" class="q-ml-md">
                                    <template v-slot:append>
                                        {{unidad_medida_nuevo.acronimo}}
                                    </template>
                                </q-input>
                            </div>
                            <div style="float:rigth;">
                                <q-input  type="number" dense standout required label='Alto' v-model='alto_corte' @keyup="solo_numeros" class="q-ml-md input_style" style="">
                                    <template v-slot:append>
                                        {{unidad_medida_nuevo.acronimo}}
                                    </template>
                                </q-input>
                            </div>
                            <q-input  type="number" dense standout required label='Cantidad' v-model='cantidad_corte' @keyup="solo_numeros" class="q-ml-md" style=""/>

                        </div>
                    </q-card-section>
                    <q-card-section align="center" class="area_comment">
                        <q-btn class="guardar" style="width: 150px;" @click="anadir_corte()">Añadir</q-btn>
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-12" style="padding-top: 5%;" >   
                <q-card class="gestionar_corte" >
                    <q-card-section align="center">
                        <div>
                            <div style="float:left;width: 86%;">
                                <div class="titulo_crear" style="padding-left: 15%;padding-bottom: 3%;">Gestor Cortes</div>
                            </div>
                            <div style="float:rigth;">
                                <div class="volumen_restante" v-if="generado">Volumen restante: {{area_plancha_restante}} ({{unidad_medida_nuevo.label}})</div>
                            </div>
                        </div>
                    </q-card-section>
                    <q-card-section align="center"  v-if="creado">
                        <q-avatar class="gestion_icono" size="200px">
                            <img :src="icono_sierra">
                        </q-avatar> 
                        <div class="titulo_crear" color="text">Ingrese los parámetros en el panel superior, para comenzar a generar cortes.</div>
                        <i class="fab fa-buffer"></i>
                    </q-card-section>
                    <q-card-section align="center"  v-if="!generado">
                        <q-avatar class="gestion_icono" size="200px">
                            <img :src="icono_sierra">
                        </q-avatar> 
                        <div class="text-h6 titulo_texto" color="text">Ingrese los parámetros en el panel superior, para comenzar a generar cortes.</div>
                        <q-avatar class="stack_icono" size="120px">
                             <i class="fab fa-buffer"></i>
                        </q-avatar> 
                       
                    </q-card-section>
                    <q-card-section class="area_comment" v-else>
                        <tabla :parametros="parametros_tabla" :funciones="funciones_tabla" />
                    </q-card-section>
                    <q-card-section class="area_comment" v-if="generado" align="center">
                        <q-btn class="desechar_corte" style="margin-right: 3%;" v-if="verificar_corte_guardado()" @click.native="limpiar_cache_cortes()">Desechar</q-btn>
                        <q-btn class="guardar" style="width: 150px;" @click="generar_corte()">Generar cortes</q-btn>
                    </q-card-section>
                </q-card>  
            </div>
        </div>
        <q-dialog
            v-model="modal_cortes_listos"
            persistent
            :maximized="maximizedToggle"
            transition-show="slide-up"
            transition-hide="slide-down"
        >
            <MostrarCortes :parametros="parametros_graficar" :funciones="funciones_cortes" :btn_guardar="true"></MostrarCortes>
        </q-dialog>
        <q-dialog persistent width="800" v-model="modal_recuperar_corte" >
            <q-card class="modales" style="width: 800px;">
                <q-card-section align="center">
                    <div class="text-h6 titulo_crear" color="text">Cortes guardados</div>
                </q-card-section>
                <q-card-section align="center">
                    <div class="text-h6 b_recuperar" color="text">
                        Tiene cortes guardados desde la fecha {{fecha_corte_guardado}}
                        ¿Desea cargarlos?
                    </div>
                </q-card-section>
                <div class="q-mt-md q-pb-md q-pr-lg q-pl-lg" style="text-align: right;">
                    <q-btn class="cancelar"  @click.native="limpiar_cache_cortes()">deshacer</q-btn>
                    <q-btn class="guardar" @click="cargar_cortes()">cargar</q-btn>
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
