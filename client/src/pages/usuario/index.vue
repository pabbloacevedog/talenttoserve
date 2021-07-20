<template>
    <div>
        <!-- <q-breadcrumbs v-if="$q.platform.is.mobile" active-color="accent">

            <div class="flex items-center justify-end q-gutter-sm">
                <q-btn
                    rounded
                    icon="fas fa-user-plus"
                    color="primary"
                    size="md"
                    label="Nuevo Usuario"
                    class="btn_add"
                    @click="modal_nuevo = true"
                />
            </div>
        </q-breadcrumbs> -->
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
                
                <q-btn
                    rounded
                    icon="fas fa-user-plus"
                    color="primary"
                    size="md"
                    label="Nuevo Usuario"
                    class="btn_add"
                    @click="modal_nuevo = true"
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
            <q-card class="modales" style="width: 550px !important;" color="primary">
                <q-card-section align="center" style="padding: 2% 1% 1% 1%;">
                    <div class="text-h6 titulo_crear" color="text">Nuevo Usuario</div>
                </q-card-section>
                <q-card-section class="area_comment" style="padding: 16px 30px 16px 16px;">
					<div>
						<div style="float:left; width: 50%;">
							<q-input  dense standout required label='Nombre' v-model='nuevo_nombre' class="q-ml-md q-mr-md">
								<template v-slot:before>
									<q-icon name="account_circle" />
								</template>
							</q-input>
						</div>
						<div style="float:rigth;">
							<q-input  dense standout required label='Apellido' v-model='nuevo_apellido' class="q-ml-md q-mr-md  namelast" style=""/>
						</div>
					</div>
                    <q-input  
                        dense 
                        standout 
                        required 
                        v-model="nuevo_rut"
                        label="Rut"
                        maxlength="12"
                        @keyup="formatearRut" @blur="validarRut"
                        class="q-ml-md q-mr-md input-reg"
                    >
						<template v-slot:before>
							<q-icon name="recent_actors" />
						</template>
					</q-input>        
                    <q-input  
                        dense 
                        standout 
                        required 
                        v-model="nuevo_descripcion"
                        label="Descripción"
                        maxlength="1000"
                        class="q-ml-md q-mr-md input-reg"
                    >
						<template v-slot:before>
							<q-icon name="edit" />
						</template>
					</q-input>                
					<q-input  dense standout required label='Email' v-model='nuevo_email' class="q-ml-md q-mr-md input-reg">
						<template v-slot:before>
							<q-icon name="email" />
						</template>
					</q-input>
                    <div>
						<div style="float:left;width: 50%;">
                            <q-input  
                                dense 
                                standout 
                                required 
                                v-model="nuevo_telefono"
                                label="Telefono"
                                mask="(#) ##-##-##-##"
                                unmasked-value
                                hint="Ej: (9) 99-99-99-99"
                                class="q-ml-md q-mr-md"
                            >
                                <template v-slot:before>
                                    <q-icon name="phone" />
                                </template>
                            </q-input>
						</div>
						<div style="float:rigth;">
                            <q-select dense standout required v-model="nuevo_id_perfil" :options="perfiles" label="Tipo Perfil" class="q-ml-md q-mr-md namelast" />
						</div>
					</div>
                    <div>
						<div style="float:left;width: 50%;">
                            <q-input  dense standout required label='Usuario' v-model='nuevo_usuario' class="q-ml-md q-mr-md input-reg">
                                <template v-slot:before>
                                    <q-icon name="account_circle" />
                                </template>
                            </q-input>
						</div>
						<div style="float:rigth;">
                            <q-select dense standout required v-model="nuevo_estado" :options="estados" label="Estado" class="q-ml-md q-mr-md namelast"/>
						</div>
					</div>
					<q-input  dense standout required label='Password' v-model="nuevo_password" class="q-ml-md q-mr-md ultimo-input" :type="isPwd ? 'password' : 'text'">
						<template v-slot:before>
							<q-icon name="vpn_key" />
						</template>
						<template v-slot:append>
							<q-icon
								:name="isPwd ? 'visibility_off' : 'visibility'"
								class="cursor-pointer"
								@click="isPwd = !isPwd"
							/>
						</template>
					</q-input>
                </q-card-section>
                <div class="q-pb-md q-pr-lg q-pl-lg" style="text-align: center;">
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
            <q-card class="modales" style="width: 550px !important;">
                <q-card-section align="center">
                    <div class="text-h6 titulo_crear" color="text">Editar Usuario</div>
                </q-card-section>
                <q-card-section class="area_comment">
					<div>
						<div style="float:left;width: 50%;">
							<q-input  dense standout required label='Nombre' v-model='editar_nombre' class="q-ml-md q-mr-md">
								<template v-slot:before>
									<q-icon name="account_circle" />
								</template>
							</q-input>
						</div>
						<div style="float:rigth;">
							<q-input  dense standout required label='Apellido' v-model='editar_apellido' class="q-ml-md q-mr-md namelast" style=""/>
						</div>
					</div>
                    <q-input  
                        dense 
                        standout 
                        required 
                        v-model="editar_rut"
                        label="Rut"
                        maxlength="12"
                        @keyup="formatearRut_e" @blur="validarRut_e"
                        class="q-ml-md q-mr-md input-reg"
                    >
						<template v-slot:before>
							<q-icon name="recent_actors" />
						</template>
					</q-input>   
                    <q-input  
                        dense 
                        standout 
                        required 
                        v-model="editar_descripcion"
                        label="Descripción"
                        maxlength="1000"
                        class="q-ml-md q-mr-md input-reg"
                    >
						<template v-slot:before>
							<q-icon name="edit" />
						</template>
					</q-input>                        
					<q-input  dense standout required label='Email' v-model='editar_email' class="q-ml-md q-mr-md input-reg">
						<template v-slot:before>
							<q-icon name="email" />
						</template>
					</q-input>
                    <div>
						<div style="float:left;width: 50%">
                            <q-input  
                                dense 
                                standout 
                                required 
                                v-model="editar_telefono"
                                label="Telefono"
                                mask="(#) ##-##-##-##"
                                unmasked-value
                                hint="Ej: (9) 99-99-99-99"
                                class="q-ml-md q-mr-md"
                            >
                                <template v-slot:before>
                                    <q-icon name="phone" />
                                </template>
                            </q-input>
						</div>
						<div style="float:rigth;">
                            <q-select dense standout required v-model="editar_id_perfil" :options="perfiles" label="Tipo Perfil" class="q-ml-md q-mr-md namelast"/>
						</div>
					</div>
                    <div>
						<div style="float:left ;width: 50%">
                            <q-input  dense standout required label='Usuario' v-model='editar_usuario' class="q-ml-md q-mr-md">
                                <template v-slot:before>
                                    <q-icon name="account_circle" />
                                </template>
                            </q-input>
						</div>
						<div style="float:rigth;">
                            <q-select dense standout required v-model="editar_estado" :options="estados" label="Estado" class="q-ml-md q-mr-md namelast"/>
						</div>
					</div>
                </q-card-section>
                <div class="q-mt-md q-pb-md q-pl-lg" style="text-align: center;">
                    <q-btn @click.native="modal_editar = false" class="cancelar">Cancelar</q-btn>
                    <q-btn class="guardar" @click="guardar_editar()">Guardar</q-btn>
                </div>
            </q-card>
        </q-dialog>
        <q-dialog persistent width="800" v-model="modal_eliminar" >
            <q-card class="modales" style="width: 800px;">
                <q-card-section align="center">
                    <div class="text-h6 titulo_crear" color="text">Eliminar Usuario</div>
                </q-card-section>
                <q-card-section align="center" v-if="parametros_tabla.selected.length > 1">
                    <div class="text-h6 b_eliminar" color="text">
                        ¿Está seguro que desea eliminar estos {{parametros_tabla.selected.length}} registros?
                    </div>
                </q-card-section>
                <q-card-section align="center" v-if="parametros_tabla.selected.length == 1">
                    <div class="text-h6 b_eliminar" color="text">
                        ¿Está seguro que desea eliminar el usuario
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
