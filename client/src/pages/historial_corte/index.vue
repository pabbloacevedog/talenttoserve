<template>
    <div>
        <!-- <q-breadcrumbs v-if="$q.platform.is.mobile" active-color="accent">
            <div class="flex items-center justify-end q-gutter-sm">
                <q-btn
                    rounded
                    icon="fas fa-ruler-combined"
                    color="primary"
                    size="md"
                    label="Gestor Cortes"
                    class="btn_add"
                    @click="ir_gestor_cortes()"
                />
            </div>
        </q-breadcrumbs> -->
        <q-breadcrumbs active-color="accent" v-if="$q.platform.is.desktop"  style="padding-bottom: 2%;">
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
                
                <q-btn
                    rounded
                    icon="fas fa-ruler-combined"
                    color="primary"
                    size="md"
                    label="Gestor Cortes"
                    class="btn_add"
                    @click="ir_gestor_cortes()"
                />
            </div>
        </q-breadcrumbs>
        <div class="row" v-if="$q.platform.is.desktop">
            <div class="col-9" style="padding-right: 1.4%;">   
                <q-card class="gestionar_corte" style="border-radius: 15px;">
                    <q-card-section align="center">
                        <div class="row">
                            <div class="col-4" style="padding-right: 2%;">  
                                <q-card class="my-card fondo_card" flat style="border-radius: 15px;">
                                    <q-card-section horizontal>
                                            <div style="background: rgba(0,0,0,0);width: 100%;" class="row">
                                                <div class="col-4">
                                                    <q-icon :name="icon_card_1" style="height: 5vw;width: 5vw;" />
                                                </div>
                                                <div class="col-8">
                                                    <div class="titulo_card" style="padding-top: 5%;" color="text">Total planchas</div>
                                                    <div class="valor_card" v-if="planchas_all" color="text">{{planchas_all[0].total_planchas}}</div>
                                                    <div class="valor_card" v-else color="text">0</div>
                                                </div>
                                            </div>
                                    </q-card-section>
                                </q-card>
                            </div>
                            <div class="col-4">  
                                <q-card class="my-card fondo_card" flat style="border-radius: 15px;">
                                    <q-card-section horizontal>
                                        <div style="background: rgba(0,0,0,0);width: 100%;" class="row">
                                            <div class="col-4">
                                                <q-icon :name="icon_card_2" style="height: 5vw;width: 5vw;" />
                                            </div>
                                            <div class="col-8">
                                                <div class="titulo_card" style="padding-top: 5%;font-size: 17px;text-shadow: 2px 3px 3px #156d19;" color="text">Material más utilizado</div>
                                                <div v-if="material_mas_usado" style="padding-top: 5%;">
                                                    <div color="text" class="material_usado">{{material_mas_usado[0].material_corte}}</div>
                                                    <div color="text" class="text_veces" >{{material_mas_usado[0].veces_usado}} veces</div>
                                                </div>
                                                <div color="text" v-else class="material_usado" style="padding-top: 5%;">
                                                    <div color="text" class="material_usado">sin datos</div>
                                                    <div color="text" class="text_veces" >.</div>
                                                </div>
                                            </div>
                                        </div>
                                    </q-card-section>
                                </q-card>
                            </div>
                            <div class="col-4" style="padding-left: 2%;">  
                                <q-card class="my-card fondo_card" flat style="border-radius: 15px;">
                                    <q-card-section horizontal align="center">
                                        <div style="background: rgba(0,0,0,0);width: 100%;" class="row">
                                            <div class="col-4">
                                                <q-icon :name="icon_card_3" style="height: 5vw;width: 5vw;" />
                                            </div>
                                            <div class="col-8">
                                                <div class="titulo_card" style="padding-top: 5%;" color="text">Total de cortes</div>
                                                <div class="valor_card" v-if="cortes_all" color="text">{{cortes_all[0].total_cortes}}</div>
                                                <div class="valor_card" v-else color="text">0</div>
                                            </div>
                                        </div>
                                    </q-card-section>
                                </q-card>
                            </div>
                        </div>

                    </q-card-section>
                    <q-card-section class="area_comment" style="padding: 0px 16px 16px 16px !important;border-radius: 15px;">
                        <tabla :parametros="parametros_tabla" :funciones="funciones"/>
                    </q-card-section>
                </q-card> 
            </div>
            <div class="col-3">
                <q-card class="parametros gestionar_corte" style="border-radius: 15px;">
                    <div class="row" style="padding: 8px;">
                        <div class="col-12">
                            <line-chart :styles="estilo_grafico" :chartdata="chartDataPlanchas" :options="chartOptions"/>
                        </div>
                        <div class="col-12">
                            <bar-chart :styles="estilo_grafico" :chartdata="chartDataCortes" :options="chartOptions"/>
                        </div>
                    </div>
                </q-card>
            </div>
        </div>
        <div class="row" v-else>
            <div class="col-12">   
                <q-card class="gestionar_corte" style="border-radius: 15px 15px 0 0;">

                    <q-card-section class="area_comment" style="padding: 0px 16px 16px 16px !important;border-radius: 15px;">
                        <tabla :parametros="parametros_tabla" :funciones="funciones"/>
                    </q-card-section>
                    <q-card-section align="center">
                        <div class="row">
                            <div class="col-12" style="padding-bottom: 2%;">  
                                <q-card class="my-card fondo_card_mobile" flat style="border-radius: 15px;">
                                    <q-card-section horizontal>
                                            <div style="background: rgba(0,0,0,0);width: 100%;" class="row">
                                                <div class="col-4">
                                                    <q-icon :name="icon_card_1" style="margin-top: 10%;height: 70%;width: 100%;" />
                                                </div>
                                                <div class="col-8">
                                                    <div class="titulo_card" style="padding-top: 5%;" color="text">Total planchas</div>
                                                    <div class="valor_card" v-if="planchas_all" color="text">{{planchas_all[0].total_planchas}}</div>
                                                    <div class="valor_card" v-else color="text">0</div>
                                                </div>
                                            </div>
                                    </q-card-section>
                                </q-card>
                            </div>
                            <div class="col-12" style="padding-bottom: 2%;">  
                                <q-card class="my-card fondo_card_mobile" flat style="border-radius: 15px;">
                                    <q-card-section horizontal>
                                        <div style="background: rgba(0,0,0,0);width: 100%;" class="row">
                                            <div class="col-4">
                                                <q-icon :name="icon_card_2" style="margin-top: 10%;height: 70%;width: 100%;" />
                                            </div>
                                            <div class="col-8">
                                                <div class="titulo_card" style="padding-top: 5%;font-size: 20px;text-shadow: 2px 3px 3px #156d19;" color="text">Material más utilizado</div>
                                                <div v-if="material_mas_usado" style="padding-top: 5%;">
                                                    <div color="text" class="material_usado_mobile">{{material_mas_usado[0].material_corte}}</div>
                                                    <div color="text" class="text_veces_mobile" >{{material_mas_usado[0].veces_usado}} veces</div>
                                                </div>
                                                <div color="text" v-else class="material_usado_mobile" style="padding-top: 5%;">
                                                    <div color="text" class="material_usado_mobile">sin datos</div>
                                                    <div color="text" class="text_veces_mobile" >.</div>
                                                </div>
                                            </div>
                                        </div>
                                    </q-card-section>
                                </q-card>
                            </div>
                            <div class="col-12">  
                                <q-card class="my-card fondo_card_mobile" flat style="border-radius: 15px;">
                                    <q-card-section horizontal align="center">
                                        <div style="background: rgba(0,0,0,0);width: 100%;" class="row">
                                            <div class="col-4">
                                                <q-icon :name="icon_card_3" style="margin-top: 10%;height: 70%;width: 100%;" />
                                            </div>
                                            <div class="col-8">
                                                <div class="titulo_card" style="padding-top: 5%;" color="text">Total de cortes</div>
                                                <div class="valor_card" v-if="cortes_all" color="text">{{cortes_all[0].total_cortes}}</div>
                                                <div class="valor_card" v-else color="text">0</div>
                                            </div>
                                        </div>
                                    </q-card-section>
                                </q-card>
                            </div>
                        </div>

                    </q-card-section>
                </q-card> 
            </div>
            <div class="col-12">
                <q-card class="parametros_mobile gestionar_corte" style="border-radius: 15px;">
                    <div class="row" style="padding: 8px;">
                        <div class="col-12">
                            <line-chart :styles="estilo_grafico" :chartdata="chartDataPlanchas" :options="chartOptions"/>
                        </div>
                        <div class="col-12">
                            <bar-chart :styles="estilo_grafico" :chartdata="chartDataCortes" :options="chartOptions"/>
                        </div>
                    </div>
                </q-card>
            </div>
        </div>
        <q-dialog persistent width="800" v-model="modal_eliminar" >
            <q-card class="modales" style="width: 800px;">
                <q-card-section align="center">
                    <div class="text-h6 titulo_crear" color="text">Eliminar registro</div>
                </q-card-section>
                <q-card-section align="center">
                    <div class="text-h6 b_eliminar" color="text">
                        El registro se eliminará permanentemente del sistema.<br>
                        ¿Está seguro que desea eliminar el registro?
                    </div>
                </q-card-section>
                <div class="q-mt-md q-pb-md q-pr-lg q-pl-lg" style="text-align: right;">
                    <q-btn class="cancelar"  @click.native="modal_eliminar = false ">CANCELAR</q-btn>
                    <q-btn class="guardar" @click="guardar_eliminar()">CONFIRMAR</q-btn>
                </div>
            </q-card>
        </q-dialog>
        <q-dialog
            v-model="modal_cortes_listos"
            persistent
            :maximized="maximizedToggle"
            transition-show="slide-up"
            transition-hide="slide-down"
        >
            <MostrarCortes :parametros="parametros_grafico" :funciones="funciones_cortes" :btn_guardar="false"></MostrarCortes>
        </q-dialog>
    </div>
</template>

<script src="./index.js">
</script>

<style lang="stylus" >
	@import './index.styl'
</style>
