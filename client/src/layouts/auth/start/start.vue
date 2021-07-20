<template>
	<div v-if="!isLogin" id="app">
		<div class="contenedor_todo">
			<center>
				<q-card class="card-login login text-white">
						<q-card-section>
							<!-- <q-avatar size="100px">
								<img :src="avatar_default">
							</q-avatar> -->
							<div class="text-h2 f_robotto_t">Iniciar sesión</div>
						</q-card-section>
						<q-card-section style="padding-bottom: 0px;">
							<q-input  dense standout required label='Email' v-model='email' class="q-ml-md input-login">
								<template v-slot:before>
									<q-icon name="account_circle" />
								</template>
							</q-input>
							<q-input  dense standout required label='Password' v-model="password" class="q-ml-md input-login-2" :type="isPwd ? 'password' : 'text'">
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
							<span style="padding-top: 10px;">
								<p color="purple">¿No tienes una cuenta? <a  @click="$router.push('/registry')" style="color: aqua;">Regístrate</a></p>
							</span>
							<span>
								<p color="purple"><a  @click="$router.push('/forget')" style="color: aqua;">Olvide mi contraseña</a></p>
							</span>
						</q-card-section>

						<q-card-section style="padding-top: 0px;">
							<q-btn  color="info" rounded @click='authenticate'>Iniciar Sesión</q-btn>
						</q-card-section>
				</q-card>
			</center>
		</div>
	</div>
</template>


<script src="./start.js">
    export default {
        name: 'Auth',
    }
</script>

<style lang="stylus" >
    @import './start.styl'
</style>
