<template>

    <q-card class="modales" style="overflow: initial;" v-if="$q.platform.is.desktop">
        <!-- <q-bar>
            <q-space></q-space>
            <q-btn dense flat icon="close" v-close-popup style="color: #00b2ff !important;">
                <q-tooltip content-class="bg-white text-primary">Cerrar</q-tooltip>
            </q-btn>
        </q-bar> -->
        <q-card-section horizontal style="height: 100%;">
            <q-card-section class="col-8" align="center">
                <div class="row">
                    <div style="width: 4.3333%;padding-top: 2%;" id="medida_alto">
                    </div>
                    <div class="col-11" id="panel">
                        <div id="panelDiv" >
                        </div>
                    </div>
                </div>
            </q-card-section>
            <q-card-section class="col-4 fondo_datos" style="padding-top: 10px;">
                <div style="margin-left: 27%;padding-bottom: 2%;" class="row" id="infoDisplay">
                    <div id="infoPager">
                        <q-btn-group rounded v-if="panels.length > 1">
                            <q-btn rounded color="info" v-if="pagerIndex >= 1" icon="skip_previous" @click="ir_atras" size="sm"></q-btn>
                            <q-btn rounded color="info" v-else icon="skip_previous" @click="ir_atras" disable size="sm"></q-btn>
                            <q-btn rounded color="info" size="sm">panel {{pagerIndex + 1}} de {{panels.length}} </q-btn>
                            <q-btn rounded color="info" v-if="pagerIndex < panels.length - 1" icon="skip_next" @click="ir_adelante" size="sm"></q-btn>
                            <q-btn rounded color="info" v-else icon="skip_next" @click="ir_adelante" disable size="sm"> </q-btn>
                        </q-btn-group>
                    </div>
                </div>
                <div class="card_datos_corte">
                    <div align="center" style="padding: 0% 0% 5% 0%;">
                        <q-badge outline color="text" label="Datos de corte" style="font-size: 20px; padding: 10px;"/>
                    </div>
                    
                    <!-- <div class="text-h6 titulo_crear" align="center" style="font-size: 22px;padding-bottom: 1%;">Datos de corte</div> -->
                    <div class="row">
                        <table class="default">
                            <tr>
                                <th style="font-size: 12px !important; float: left;"><q-badge color="info" label="Material" style="font-size: 14px; padding: 5px;"/></th>
                                <td style="font-size: 12px !important;padding-left: 3%;">{{parametros.material_corte}}</td>
                            </tr>
                            <tr>
                                <th style="font-size: 12px !important; float: left;"><q-badge color="info" label="Unidad medida" style="font-size: 14px; padding: 5px;"/></th>
                                <td style="font-size: 12px !important;padding-left: 3%;">{{parametros.unidad_medida}}</td>
                            </tr>
                            <tr>
                                <th style="font-size: 12px !important; float: left;"><q-badge color="info" label="Grosor sierra" style="font-size: 14px; padding: 5px;"/></th>
                                <td style="font-size: 12px !important;padding-left: 3%;">{{parametros.grosor_sierra}} mm</td>
                            </tr>
                            <tr>
                                <th style="font-size: 12px !important; float: left;"><q-badge color="info" label="Alto plancha" style="font-size: 14px; padding: 5px;"/></th>
                                <td style="font-size: 12px !important;padding-left: 3%;">{{parametros.alto_plancha}} {{unidad}}</td>
                            </tr>
                            <tr>
                                <th style="font-size: 12px !important; float: left;"><q-badge color="info" label="Ancho plancha" style="font-size: 14px; padding: 5px;"/></th>
                                <td style="font-size: 12px !important;padding-left: 3%;">{{parametros.ancho_plancha}} {{unidad}}</td>
                            </tr>
                            <tr>
                                <th style="font-size: 12px !important; float: left;"><q-badge color="info" label="Area plancha" style="font-size: 14px; padding: 5px;"/></th>
                                <td style="font-size: 12px !important;padding-left: 3%;">{{parametros.area_plancha}} {{unidad}}</td>
                            </tr>
                            <tr>
                                <th style="font-size: 12px !important; float: left;"><q-badge color="info" label="Porcentaje de optimización" style="font-size: 14px; padding: 5px;"/></th>
                                <td style="font-size: 12px !important;padding-left: 3%;">{{porcentaje_op}} %</td>
                            </tr>
                            <tr>
                                <th style="font-size: 12px !important; float: left;"><q-badge color="info" label="Total cortes" style="font-size: 14px; padding: 5px;"/></th>
                                <td style="font-size: 12px !important;padding-left: 3%;">{{parametros.total_cortes}}</td>
                            </tr>
                        </table>
                        <div align="center" style="width: 100%;padding: 5% 1%;">
                            <q-table
                                :data="parametros_tabla.data"
                                :columns="parametros_tabla.columns"
                                :row-key="parametros_tabla.selectedkey"
                                class="tabla_grafico_cortes"
                                :pagination.sync="parametros_tabla.pagination"
                                :rows-per-page-options="[0]" 
                                align="center"
                            >
                                <template  v-slot:body="props" >
                                    <q-tr :props="props" class="tr_tabla_grafico">
                                        <q-td key="ancho" :props="props">{{ props.row.ancho }} ({{props.row.unidad}})</q-td>
                                        <q-td key="alto" :props="props">{{ props.row.alto }}  ({{props.row.unidad}})</q-td>
                                        <q-td key="cantidad" :props="props">{{ props.row.cantidad }} </q-td>
                                        <!-- <q-td key="area_corte" :props="props">{{ props.row.area_corte }}  ({{props.row.unidad}})</q-td> -->
                                    </q-tr>
                                </template>
                            </q-table>
                        </div>
                    </div>
                    <div id="contenedor">
                        <div align="center" style="padding: 3%;" v-if="btn_guardar">
                            <q-btn class="desechar_corte"  @click.native="funciones.desechar_corte()">Desechar</q-btn>
                            <q-btn class="guardar" @click="funciones.guardar_corte_bd()">guardar</q-btn>
                        </div>
                        <div align="center" style="padding: 3%;" v-else>
                            <q-btn class="guardar" @click="funciones.cerrar_grafico()">Aceptar</q-btn>
                        </div>
                    </div>
                </div>
            </q-card-section>
        </q-card-section>
    </q-card>
            

    <q-card class="modales" style="overflow: initial;" v-else>
        <q-bar>
            <q-space></q-space>
            <q-btn dense flat icon="close" v-close-popup style="color: #00b2ff !important;">
                <q-tooltip content-class="bg-white text-primary">Cerrar</q-tooltip>
            </q-btn>
        </q-bar>
        <q-card-section class="col-12" align="center" style="padding: 0% 0% 1% 0%;min-height: 330px;">
            <div class="row">
                <div style="width: 5.3333%;padding-top: 3%;" id="medida_alto">
                </div>
                <div class="col-11" id="panel">
                    <div id="panelDiv" >
                    </div>
                    <div class="row"  id="infoDisplay2" style="margin-left: 25vw;">
                        <div id="infoPager" >
                            <q-btn-group rounded v-if="panels.length > 1" >
                                <q-btn rounded color="info" v-if="pagerIndex >= 1" icon="skip_previous" @click="ir_atras" size="sm"></q-btn>
                                <q-btn rounded color="info" v-else icon="skip_previous" @click="ir_atras" disable size="sm"></q-btn>
                                <q-btn rounded color="info" size="sm">panel {{pagerIndex + 1}} de {{panels.length}} </q-btn>
                                <q-btn rounded color="info" v-if="pagerIndex < panels.length - 1" icon="skip_next" @click="ir_adelante" size="sm"></q-btn>
                                <q-btn rounded color="info" v-else icon="skip_next" @click="ir_adelante" disable size="sm"> </q-btn>
                            </q-btn-group>
                        </div>
                    </div>
                </div>
            </div>
        </q-card-section>
        <q-card-section class="col-12 fondo_datos" style="margin-top: 5px;min-height: 360px;padding: 2% 3% 0% 3%;width: 100% !important;">
            <div class="card_datos_corte " style="padding: 0 !important;">
                <div align="center">
                    <q-badge outline color="text" label="Datos de corte" style="font-size: 14px; padding: 10px;"/>
                </div>
                <!-- <div class="text-h6 titulo_crear" align="center" style="font-size: 22px;padding-bottom: 1%;">Datos de corte</div> -->
                <div class="row" style="padding: 2% 5%;">
                    <div align="center" style="width: 100%;" id="datos_corte">
                        <table class="default">
                            <tr>
                                <th style="font-size: 12px !important; float: left;">Material</th>
                                <td style="font-size: 12px !important;padding-left: 3%;">{{parametros.material_corte}}</td>
                            </tr>
                            <tr>
                                <th style="font-size: 12px !important; float: left;">Unidad medida</th>
                                <td style="font-size: 12px !important;padding-left: 3%;">{{parametros.unidad_medida}}</td>
                            </tr>
                            <tr>
                                <th style="font-size: 12px !important; float: left;">Grosor sierra</th>
                                <td style="font-size: 12px !important;padding-left: 3%;">{{parametros.grosor_sierra}} mm</td>
                            </tr>
                            <tr>
                                <th style="font-size: 12px !important; float: left;">Alto plancha</th>
                                <td style="font-size: 12px !important;padding-left: 3%;">{{parametros.alto_plancha}} {{unidad}}</td>
                            </tr>
                            <tr>
                                <th style="font-size: 12px !important; float: left;">Ancho plancha</th>
                                <td style="font-size: 12px !important;padding-left: 3%;">{{parametros.ancho_plancha}} {{unidad}}</td>
                            </tr>
                            <tr>
                                <th style="font-size: 12px !important; float: left;">Area plancha</th>
                                <td style="font-size: 12px !important;padding-left: 3%;">{{parametros.area_plancha}} {{unidad}}</td>
                            </tr>
                            <tr>
                                <th style="font-size: 12px !important; float: left;">porcentaje de optimización</th>
                                <td style="font-size: 12px !important;padding-left: 3%;">{{porcentaje_op}} %</td>
                            </tr>
                            <tr>
                                <th style="font-size: 12px !important; float: left;">Total cortes</th>
                                <td style="font-size: 12px !important;padding-left: 3%;">{{parametros.total_cortes}}</td>
                            </tr>
                        </table>
                        <q-btn id="btn_der" round size="sm"  icon="keyboard_arrow_right" color="accent" @click="mostrar_tabla()" />
                    </div>
                    <div align="center" style="width: 100%;" id="tabla_cortes">
                        
                        <q-table
                            :data="parametros_tabla.data"
                            :columns="parametros_tabla.columns"
                            :row-key="parametros_tabla.selectedkey"
                            v-if="$q.platform.is.mobile"
                            class="tabla_mobile"
                            :pagination.sync="parametros_tabla.pagination"
                            :rows-per-page-options="[0]" 
                            align="center"
                        >
                            <template  v-slot:body="props" >
                                <q-tr :props="props" class="tr_tabla_grafico">
                                    <q-td key="ancho" :props="props">{{ props.row.ancho }} ({{props.row.unidad}})</q-td>
                                    <q-td key="alto" :props="props">{{ props.row.alto }}  ({{props.row.unidad}})</q-td>
                                    <q-td key="cantidad" :props="props">{{ props.row.cantidad }} </q-td>
                                    <!-- <q-td key="area_corte" :props="props">{{ props.row.area_corte }}  ({{props.row.unidad}})</q-td> -->
                                </q-tr>
                            </template>
                        </q-table>
                        <q-table
                            :data="parametros_tabla.data"
                            :columns="parametros_tabla.columns"
                            :row-key="parametros_tabla.selectedkey"
                            class="tabla_grafico_cortes"
                            :pagination.sync="parametros_tabla.pagination"
                            :rows-per-page-options="[0]" 
                            align="center"
                            v-else
                        >
                            <template  v-slot:body="props" >
                                <q-tr :props="props" class="tr_tabla_grafico">
                                    <q-td key="ancho" :props="props">{{ props.row.ancho }} ({{props.row.unidad}})</q-td>
                                    <q-td key="alto" :props="props">{{ props.row.alto }}  ({{props.row.unidad}})</q-td>
                                    <q-td key="cantidad" :props="props">{{ props.row.cantidad }} </q-td>
                                    <!-- <q-td key="area_corte" :props="props">{{ props.row.area_corte }}  ({{props.row.unidad}})</q-td> -->
                                </q-tr>
                            </template>
                        </q-table>
                        <q-btn id="btn_iz" round size="sm"  icon="keyboard_arrow_left" color="accent" @click="mostrar_datos()"/>
                    </div>
                </div>
                <div id="contenedor">
                    <div align="center" style="padding: 3%;" v-if="btn_guardar">
                        <q-btn class="desechar_corte"  @click.native="funciones.desechar_corte()">Desechar</q-btn>
                        <q-btn class="guardar" @click="funciones.guardar_corte_bd()">guardar</q-btn>
                    </div>
                    <div align="center" style="padding: 3%;" v-else>
                        <q-btn class="guardar" @click="funciones.cerrar_grafico()">Aceptar</q-btn>
                    </div>
                </div>
            </div>
        </q-card-section>
    </q-card>
</template>

<script src="./index.js">
</script>

<style lang="stylus" >
	@import './index.styl'
</style>
