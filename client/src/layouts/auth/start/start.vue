<template>
	<div v-if="!isLogin" id="app">
		<div class="contenedor_todo">
            <div class="row q-pa-xl" style="padding-right: 150px;height: 100vh !important;padding-left: 150px;">
                <div class="col-6 bloq_iz">
                    <div class="contenedor_login_iz">
                        <div class="center">
                            <img :src="avatar_default" class="center-img">
                        </div>
                        
                    </div>
                </div>
                <div class="col-6 bloq_der">
                    <center>
                    <q-card class="sin_fondo">
                        <q-card-section>
                            <img :src="avatar_clean" style="width: 8em;">
                            <div bg-color="accent" class="text-h4 f_robotto_t">Bienvenido</div>
                        </q-card-section>
                        <q-card-section style="padding-bottom: 0px;">
                            <q-input dense standout required label='Email' v-model='email' class="q-ml-md input-login">
                                <template v-slot:before>
                                    <q-icon name="account_circle" />
                                </template>
                            </q-input>
                            <q-input dense standout required label='Password' v-model="password" class="q-ml-md input-login-2" :type="isPwd ? 'password' : 'text'">
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
                                <p>¿No tienes una cuenta? <a @click="$router.push('/registry')" style="color: #ff8037;">Regístrate</a></p>
                            </span>
                            <span>
                                <p><a @click="$router.push('/forget')" style="color: #ff8037;">Olvide mi contraseña</a></p>
                            </span>
                        </q-card-section>

                        <q-card-section style="padding-top: 0px;">
                            <q-btn color="accent" rounded @click='authenticate'>Iniciar Sesión</q-btn>
                        </q-card-section>
                    </q-card>
                    </center>
                </div>
            </div>
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
