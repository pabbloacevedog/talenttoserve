<template>
    <div>
        <q-breadcrumbs active-color="accent">
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
                    icon="add"
                    color="primary"
                    size="md"
                    label="Agregar Item"
                    class="btn_add"
                    @click="modal_nuevo = true"
                />
            </div>
        </q-breadcrumbs>
        <div style="padding-top: 2%;">
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
                    <div class="text-h6 titulo_crear" color="text">Nuevo Grosor Sierra</div>
                </q-card-section>
                <q-card-section class="area_comment">
                    <q-input  
                        dense 
                        standout 
                        required 
                        v-model="nuevo_grosor"
                        label="Grosor"
                        class="input-reg"
                        clearable
                        @keypress="solo_numeros"
                        hint="En pulgadas"
                    >
					</q-input>                        
					<q-input  dense standout required label='Nombre' v-model='nuevo_nombre' class="input-reg">
					</q-input>
					<q-input  dense standout required label='Descripción' v-model='nuevo_descripcion' class="input-reg">
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
                    <div class="text-h6 titulo_crear" color="text">Editar Grosor Sierra</div>
                </q-card-section>
                <q-card-section class="area_comment">
                    <q-input  
                        dense 
                        standout 
                        required 
                        v-model="editar_grosor"
                        label="Grosor"
                        class="input-reg"
                        clearable
                        @keypress="solo_numeros"
                    >
					</q-input>                        
					<q-input  dense standout required label='Nombre' v-model='editar_nombre' class="input-reg">
					</q-input>
					<q-input  dense standout required label='Descripción' v-model='editar_descripcion' class="input-reg">
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
                    <q-btn class="guardar" @click="guardar_eliminar()">CONFIRMAR</q-btn>
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
