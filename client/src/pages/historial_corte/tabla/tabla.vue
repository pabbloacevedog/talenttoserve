<template>
    <q-table
        :title="parametros.tittle"
        :data="parametros.data"
        :columns="parametros.columns"
        :row-key="parametros.selectedkey"
        selection="multiple"
        :selected.sync="parametros.selected"
        :pagination.sync="parametros.pagination"
        :filter="parametros.filter"
        v-if="$q.platform.is.mobile"
        class="tabla_mobile"
        grid
        hide-header
    >
        <template v-slot:top-right>
            <q-input  
                dense 
                standout 
                required 
                v-model="parametros.filter"
                rounded 
                placeholder="Buscar"
                class="buscar_mobile"
            >
                <template v-slot:append>
                    <q-icon name="search" />
                </template>
            </q-input>
            <q-space/>
                <q-btn size="md" class="color_icon_acciones" flat round dense icon="more_vert">
                <q-tooltip>
                    Acciones
                </q-tooltip>
                <q-menu  content-class="bg-secondary m-accion" transition-show="jump-down" color="accent" transition-hide="jump-down">
                    <q-list bordered>
                        <div v-for="(props,i) in parametros.acciones" :key="i">
                            <q-item clickable v-ripple @click.native="funciones[props.cmd]()">
                                <q-item-section avatar style="min-width: 24px !important;">
                                <q-icon color="accent" :name="props.icon" />
                                </q-item-section>

                                <q-item-section color="accent">{{props.accion}}</q-item-section>
                            </q-item>
                        </div>
                    </q-list>
                </q-menu>
                </q-btn>
            <q-space/>

        </template>

        <template v-slot:item="props">
        <div
            class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
            :style="props.selected ? 'transform: scale(0.95);' : ''"
        >
            <q-card :class="props.selected ? 'card_tabla_mobile_selected' : 'card_tabla_mobile'" >
            <q-card-section>
                <q-checkbox dense v-model="props.selected" :label="'ID '+props.row.id_historial_corte"></q-checkbox>
            </q-card-section>
            <q-separator></q-separator>
            <q-list dense>
                <q-item v-for="col in props.cols.filter(col => col.name !== 'id_historial_corte')" :key="col.name">
                <q-item-section>
                    <q-item-label>{{ col.label }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                    <q-item-label caption v-if="col.name !== 'ver'">{{ col.value }}</q-item-label>
                    <q-item-label caption v-else><q-btn flat round color="accent" icon="remove_red_eye" @click="funciones.generar_grafico(props.row)" /></q-item-label>
                </q-item-section>
                </q-item>
            </q-list>
            </q-card>
        </div>
        </template>

    </q-table>
    <q-table
        :title="parametros.tittle"
        :data="parametros.data"
        :columns="parametros.columns"
        :row-key="parametros.selectedkey"
        selection="multiple"
        class="tabla_historial"
        style="border-radius: 15px;"
        :selected.sync="parametros.selected"
        :pagination.sync="parametros.pagination"
        :filter="parametros.filter"
        :visible-columns="parametros.visibleColumns"
        v-else
    >
        <template v-slot:top-right="props">
            <q-input  
                dense 
                standout 
                required 
                v-model="parametros.filter"
                rounded 
                placeholder="Buscar"
            >
                <template v-slot:append>
                    <q-icon name="search" />
                </template>
            </q-input>
            <q-btn
                flat round dense
                :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                @click="props.toggleFullscreen"
                class="q-ml-md"
                >
                <q-tooltip v-if="props.inFullscreen">
                    Minimizar tabla 
                </q-tooltip>
                <q-tooltip v-else>
                    Maximizar tabla
                </q-tooltip>
            </q-btn>
            <q-space/>
                <q-btn size="md" class="color_icon_acciones" flat round dense icon="more_vert">
                <q-tooltip>
                    Acciones
                </q-tooltip>
                <q-menu  content-class="bg-secondary m-accion" transition-show="jump-down" color="accent" transition-hide="jump-down">
                    <q-list bordered>
                        <div v-for="(props,i) in parametros.acciones" :key="i">
                            <q-item clickable v-ripple @click.native="funciones[props.cmd]()">
                                <q-item-section avatar style="min-width: 24px !important;">
                                <q-icon color="accent" :name="props.icon" />
                                </q-item-section>

                                <q-item-section color="accent">{{props.accion}}</q-item-section>
                            </q-item>
                        </div>
                    </q-list>
                </q-menu>
                </q-btn>
            <q-space/>

        </template>
        <template  v-slot:body="props" >
            <q-tr :props="props" v-on:dblclick="funciones.editar_fila(props.row)">
                <q-td auto-width>
                    <q-checkbox color="primary" v-model="props.selected" />
                </q-td>
                <q-td key="id_historial_corte" :props="props">{{ props.row.id_historial_corte }}</q-td>
                <q-td key="material_corte" :props="props">{{ props.row.material_corte }}</q-td>
                <q-td key="unidad_medida" :props="props">{{ props.row.unidad_medida }}</q-td>
                <q-td key="grosor_sierra" :props="props">{{ props.row.grosor_sierra }}</q-td>
                <q-td key="alto_plancha" :props="props">{{ props.row.alto_plancha }}</q-td>
                <q-td key="ancho_plancha" :props="props">{{ props.row.ancho_plancha }}</q-td>
                <q-td key="area_plancha" :props="props">{{ props.row.area_plancha }}</q-td>
                <q-td key="area_plancha_utilizada" :props="props">{{ props.row.area_plancha_utilizada }}</q-td>
                <q-td key="area_plancha_restante" :props="props">{{ props.row.area_plancha_restante }}</q-td>
                <q-td key="total_cortes" :props="props">{{ props.row.total_cortes }}</q-td>
                <q-td key="ver" :props="props">
                    <q-btn flat round color="accent" icon="remove_red_eye" @click="funciones.generar_grafico(props.row)" />
                    <!-- <q-btn class="guardar" @click="generar_grafico()">Ver gráfico</q-btn> -->
                </q-td>
            </q-tr>
        </template>
    </q-table>
</template>

<script src="./tabla.js">
</script>
<style lang="stylus" >
	@import './tabla.styl'
</style>