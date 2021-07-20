<template>
	<div class="contenedor_todo">
		<center>
			<q-card class="card-login login text-white">
				<q-card-section>
					<div class="text-h4 f_robotto_t">Registro</div>
				</q-card-section>
				<q-card-section style="padding-bottom: 0px;">
					<div>
						<div style="float:left">
							<q-input  dense standout required label='Nombre' v-model='nombre' class="q-ml-md">
								<template v-slot:before>
									<q-icon name="account_circle" />
								</template>
							</q-input>
						</div>
						<div style="float:rigth;">
							<q-input  dense standout required label='Apellido' v-model='apellido' class="q-ml-md namelast" style=""/>
						</div>
					</div>
                    <q-input  
                        dense 
                        standout 
                        required 
                        v-model="rut"
                        label="Rut"
                        @keyup="formatearRut" @blur="validarRut"
                        class="q-ml-md input-reg"
                    >
						<template v-slot:before>
							<q-icon name="recent_actors" />
						</template>
					</q-input>                        
					<q-input  dense standout required label='Usuario' v-model='usuario' class="q-ml-md input-reg">
						<template v-slot:before>
							<q-icon name="account_circle" />
						</template>
					</q-input>
					<q-input  dense standout required label='Email' v-model='email' class="q-ml-md input-reg">
						<template v-slot:before>
							<q-icon name="email" />
						</template>
					</q-input>
                    <div>
						<div style="float:left">
                            <q-input  
                                dense 
                                standout 
                                required 
                                v-model="telefono"
                                label="Telefono"
                                mask="(#) ##-##-##-##"
                                unmasked-value
                                hint="Ej: (9) 99-99-99-99"
                                class="q-ml-md"
                            >
                                <template v-slot:before>
                                    <q-icon name="phone" />
                                </template>
                            </q-input>
						</div>
						<div style="float:rigth;">
                            <q-select dense standout required v-model="id_perfil" :options="perfiles" label="Tipo Perfil" class="q-ml-md namelast" @change="perfil_view"/>
						</div>
					</div>
					<q-input  dense standout required label='Password' v-model="password" class="q-ml-md ultimo-input" :type="isPwd ? 'password' : 'text'">
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
					<!-- <span class='danger' style="padding: 10px;">{{error}}</span> -->
					<span>
						<p color="purple">¿Tienes una cuenta? <a href="/login" style="color: aqua;">Log In</a></p>
					</span>
					</q-card-section>

					<q-card-section style="padding-top: 0px;">
						<q-btn color="info" rounded @click='register'>Registrarse</q-btn>
                        <q-btn color="info" rounded @click='UpdatePass'>Get password</q-btn>
                        <q-btn color="info" rounded @click='SetNewPass'>Update password</q-btn>
					</q-card-section>
			</q-card>
		</center>
	</div>
</template>

<script src="./registry.js">
	export default {
		name: 'Registry',
	}
</script>

<style lang="stylus" >
@import './registry.styl';
</style>
