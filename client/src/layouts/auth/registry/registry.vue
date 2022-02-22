<template>
	<div class="contenedor_todo">
		<div
			class="row q-pa-lg"
			style="padding-right: 150px;height: 100vh !important;padding-left: 150px;backdrop-filter: blur(8px) !important;background: #00000045;"
		>
			<div class="col-6 bloq_iz">
				<center>
					<q-card class="sin_fondo">
						<q-card-section
							class="q-py-xs row"
							style="display: flex;align-items: center;"
						>
							<div
								bg-color="accent"
								class="col-8 text-h4 f_robotto_t"
							>
								Registro
							</div>
							<img
								:src="avatar_clean"
								class="col-4"
								style="width: 6em;"
								@click="$router.push('/')"
							/>
						</q-card-section>
						<q-card-section style="padding-bottom: 0px;">
							<q-input
								style="font-size:1vw;"
								dark
								dense
								standout
								required
								label="Nombre y Apellido"
								v-model="nombre"
								class="q-ml-md input-register"
							>
								<template v-slot:before>
									<q-icon name="account_circle" />
								</template>
							</q-input>
							<q-input
								style="font-size:1vw;"
								dark
								dense
								standout
								required
								label="Email"
								v-model="email"
								class="q-ml-md input-register"
							>
								<template v-slot:before>
									<q-icon name="email" />
								</template>
							</q-input>
							<div>
								<div style="float:left;width: 50%;">
									<q-select
										dark
										dense
										standout
										required
										v-model="id_perfil"
										:options="perfiles"
										label="Tipo Perfil"
										class="q-ml-md input-register-2"
										@change="perfil_view"
									>
										<template v-slot:before>
											<q-icon name="badge" />
										</template>
									</q-select>
								</div>
								<div>
									<q-input
										dark
										dense
										standout
										required
										v-model="telefono"
										label="Telefono"
										mask="(#) ##-##-##-##"
										unmasked-value
										hint="Ej: (9) 99-99-99-99"
										class="q-ml-md input-register-2"
									>
										<template v-slot:append>
											<q-icon name="phone" />
										</template>
									</q-input>
								</div>
							</div>

							<q-input
								style="font-size:1vw;"
								dark
								dense
								standout
								required
								label="Nombre empresa"
								v-model="nombre_empresa"
								v-if="id_perfil.value == '3'"
								class="q-ml-md input-register"
							>
								<template v-slot:before>
									<q-icon name="business" />
								</template>
							</q-input>
							<q-input
								style="font-size:1vw;"
								dark
								dense
								standout
								required
								label="Nombre hotel"
								v-model="nombre_hotel"
								v-if="id_perfil.value == '4'"
								class="q-ml-md input-register"
							>
								<template v-slot:before>
									<q-icon name="hotel" />
								</template>
							</q-input>
							<q-input
								style="font-size:1vw;"
								dark
								dense
								standout
								required
								label="Cargo"
								v-model="cargo"
								v-if="id_perfil.value == '4'"
								class="q-ml-md input-register"
							>
								<template v-slot:before>
									<q-icon name="work" />
								</template>
							</q-input>
							<q-select
								dark
								dense
								standout
								required
								v-model="producto_empresa"
								:options="perfiles"
								v-if="id_perfil.value == '3'"
								label="Seleccione producto o servicio"
								class="q-ml-md input-register"
								@change="perfil_view"
							>
								<template v-slot:before>
									<q-icon name="badge" />
								</template>
							</q-select>
							<q-select
								dark
								dense
								standout
								required
								v-model="id_cargo"
								:options="perfiles"
								label="Seleccione actual o último cargo"
								class="q-ml-md input-register"
								v-if="id_perfil.value == '1'"
								@change="perfil_view"
							>
								<template v-slot:before>
									<q-icon name="badge" />
								</template>
							</q-select>
							<div>
								<div style="float:left;width: 50%;">
									<q-input
										style="font-size:1vw;"
										dark
										dense
										standout
										required
										label="Password"
										v-model="password"
										class="q-ml-md input-register-2"
										:type="isPwd ? 'password' : 'text'"
									>
										<template v-slot:before>
											<q-icon name="vpn_key" />
										</template>
										<template v-slot:append>
											<q-icon
												:name="
													isPwd
														? 'visibility_off'
														: 'visibility'
												"
												class="cursor-pointer"
												@click="isPwd = !isPwd"
											/>
										</template>
									</q-input>
								</div>
								<div>
									<q-input
										style="font-size:1vw;"
										dark
										dense
										standout
										required
										label="Repetir password"
										v-model="repassword"
										class="q-ml-md input-register-2"
										:type="isPwd ? 'password' : 'text'"
									>
										<template v-slot:append>
											<q-icon
												:name="
													isPwd
														? 'visibility_off'
														: 'visibility'
												"
												class="cursor-pointer"
												@click="isPwd = !isPwd"
											/>
										</template>
									</q-input>
								</div>
							</div>

							<q-select
								dark
								dense
								standout
								required
								v-model="id_pais"
								:options="paises"
								label="Selecciones su País"
								class="q-ml-md input-register"
								@change="perfil_view"
							>
								<template v-slot:before>
									<q-icon name="badge" />
								</template>
							</q-select>
							<span class="danger">{{ error }}</span>
							<span>
								<p style="font-size:1.2vw;">
									<a
										@click="$router.push('/login')"
										style="color: #ff8037;"
										>Ir a Login</a
									>
								</p>
							</span>
						</q-card-section>

						<q-card-section style="padding-top: 0px;">
							<q-btn class="btn-inicio" rounded @click="register"
								>Registrarse</q-btn
							>
						</q-card-section>
					</q-card>
				</center>
			</div>
			<div class="col-6 bloq_der">
				<transition
					appear
					enter-active-class="animated slideInLeft"
					leave-active-class="animated slideInRight"
				>
					<div class="contenedor_login_iz">
						<div class="center">
							<img :src="avatar_default" class="center-img" />
						</div>
					</div>
				</transition>
			</div>
		</div>
	</div>
</template>

<script src="./registry.js">
export default {
	name: 'Registry',
}
</script>

<style lang="stylus">
@import './registry.styl';
</style>
