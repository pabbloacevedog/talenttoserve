<template>
    <q-table
        :title="parametros.tittle"
        :data="parametros.data"
        :columns="parametros.columns"
        :row-key="parametros.selectedkey"
        selection="multiple"
        class="tabla"
        :selected.sync="parametros.selected"
        :pagination.sync="parametros.pagination"
        :filter="parametros.filter"
    >
        <template v-slot:top-right>
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
            <q-tr :props="props" v-on:dblclick="funciones.editar_fila(props.row.id_grosor_sierra)">
                <q-td auto-width>
                    <q-checkbox size="sm"  color="accent" v-model="props.selected"/>
                </q-td>
                <q-td key="grosor" :props="props">{{ props.row.grosor }}"</q-td>
                <q-td key="nombre" :props="props">{{ props.row.nombre }}</q-td>
                <q-td key="descripcion" :props="props">{{ props.row.descripcion }}</q-td>
                <q-td key="estado" :props="props" v-if="props.row.estado">
                    <q-chip color="green" text-color="white">
                        Activo
                    </q-chip>
                </q-td>
                <q-td key="estado" :props="props" v-else>
                    <q-chip color="red" text-color="white">
                        Inactivo
                    </q-chip>
                </q-td>
            </q-tr>
        </template>
    </q-table>
</template>

<script src="./tabla.js">
</script>
