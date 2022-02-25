<template>
	<div class="contenedor_todo">
		<div
			class="row q-pa-xl cont-forget"
		>
			<div class="col-9 bloq_der_for" >
				<center>
					<transition
						appear
						enter-active-class="animated slideInDown"
						leave-active-class="animated slideInUp"
					>
						<q-card class="sin_fondo">
							<q-card-section class="q-py-xl">
								<img :src="avatar_clean" style="width: 8em;" />
								<div class="f_robotto_t q-pb-sm" style="font-size:2.2em;">
									Recuperar contraseña
								</div>
								<div
									class="text-h6 f_robotto_t"
									style="color:#b3b3b3"
								>
									Ingresa tu email y te enviaremos la
									contraseña
								</div>
							</q-card-section>
							<q-card-section
								style="padding-bottom: 0px;"
								class="q-px-xl section-forget"
							>
								<q-input
									style="font-size:1em;"
									dark
									dense
									standout
									required
									label="Email"
									v-model="email"
									class="q-ml-md input-forget"
								>
									<template v-slot:before>
										<q-icon name="email" />
									</template>
								</q-input>
								<span>
									<p style="font-size:1.2em;">
										<a
											@click="$router.push('/login')"
											style="color: #ff8037;"
											>Ir al Login</a
										>
									</p>
								</span>
							</q-card-section>

							<q-card-section style="padding-top: 0px;">
								<q-btn
									class="btn-inicio"
									rounded
									@click="enviar"
									>Enviar</q-btn
								>
							</q-card-section>
						</q-card>
					</transition>
				</center>
			</div>
		</div>
	</div>
</template>

<script src="./forget.js">
export default {
    name: 'forget',
}
</script>

<style lang="stylus">
@import './forget.styl'
</style>
