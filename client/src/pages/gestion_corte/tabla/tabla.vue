<template>
    <q-table
        :data="parametros.data"
        :columns="parametros.columns"
        :row-key="parametros.selectedkey"
        class="tabla"
        :pagination.sync="parametros.pagination"
        :filter="parametros.filter"
        
    >
        <template  v-slot:body="props" >
            <q-tr :props="props">
                <q-td key="ancho" :props="props">{{ props.row.ancho }} ({{props.row.unidad}})</q-td>
                <q-td key="alto" :props="props">{{ props.row.alto }}  ({{props.row.unidad}})</q-td>
                <q-td key="cantidad" :props="props">{{ props.row.cantidad }} </q-td>
                <q-td key="area_corte" :props="props">{{ props.row.area_corte }}  ({{props.row.unidad}})</q-td>
                <q-td key="quitar" :props="props">
                    <q-btn dense flat icon="close" style="color: #00b2ff !important;" @click="funciones.eliminar_fila(props.row)">
                        <q-tooltip content-class="bg-white text-primary">Eliminar fila</q-tooltip>
                    </q-btn>
                </q-td>
            </q-tr>
        </template>
    </q-table>
</template>

<script src="./tabla.js">
</script>
