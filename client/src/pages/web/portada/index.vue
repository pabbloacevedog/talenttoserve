<template>
	<div
		class="div_fondo_portada row"
		:style="{ backgroundImage: 'url(' + src_fondo + ')' }"
		v-if="$q.platform.is.desktop"
	>
		<div class="col-7" style="display: flex;align-items: center;">
			<div style="padding-left: 15%;">
				<div class="contenedor">
					<transition appear enter-active-class="animated fadeInDown">
						<div>
							<img
								:src="src_logo"
								class="column flex-center"
								style="width: 8vw !important;"
							/>
							<div
								class="titulo_bar text-white column flex-center"
								style="font-size: 2em;padding-top: 32%;"
							>
								Talent to Serve
							</div>
							<div
								class="titulo_bar text-white column flex-center"
								style="font-size: 1.4em;"
							>
								Portal Hotelero
							</div>
						</div>
					</transition>
					<transition appear enter-active-class="animated fadeInLeft">
						<div class="column flex-center text-portada">
							Capacitaciones y asesorías para hoteles
						</div>
					</transition>
					<transition appear enter-active-class="animated fadeInUp">
						<div class="q-mt-md column flex-center text-miembros">
							<q-chip
								style="font-size: 20px !important;"
								:label="
									'🎉 ¡Ya somos ' +
										total.total +
										' usuarios! 🥳'
								"
								text-color="white"
								color="red"
							/>
						</div>
					</transition>
					<transition appear enter-active-class="animated fadeInUp">
						<div class="q-mt-md column flex-center text-miembros">
							<q-chip
								size="md"
								label="Conózcanos"
								class="ver_mas"
								text-color="white"
								clickable
								@click="scrollToElement('#historia')"
							/>
						</div>
					</transition>
				</div>
			</div>
		</div>
		<div class="col-5" style="display: table;padding: 2%;"></div>
	</div>
	<div v-else class="div_fondo_portada row"
	style="background-color: #121212  !important;"
	>
		<div class="contenedor" style="width: 100vw;">
			<transition appear enter-active-class="animated fadeInDown">
				<div class="titulo-portada">
					<img
						:src="src_logo"
						class="column flex-center"
						style="width: 35vw !important;"
					/>
					<div
						class="titulo_bar text-white column flex-center"
						style="font-size: 2em;padding-top: 40%;"
					>
						Talent to Serve
					</div>
					<div
						class="titulo_bar text-white column flex-center"
						style="font-size: 1.4em;"
					>
						Portal Hotelero
					</div>
				</div>
			</transition>
			<transition appear enter-active-class="animated fadeInLeft">
				<div class="column flex-center text-portada titulo_bar">
					Capacitaciones y asesorías para hoteles
				</div>
			</transition>
			<transition appear enter-active-class="animated fadeInUp">
				<div class="q-mt-md column flex-center text-miembros">
					<q-chip
						style="font-size: 20px !important;"
						:label="'🎉 ¡Ya somos ' + total.total + ' usuarios! 🥳'"
						text-color="white"
						color="red"
					/>
				</div>
			</transition>
			<transition appear enter-active-class="animated fadeInUp">
				<div class="q-mt-md column flex-center text-miembros">
					<q-chip
						size="md"
						label="Conózcanos"
						class="ver_mas"
						text-color="white"
						clickable
						@click="scrollToElement('#historia')"
					/>
				</div>
			</transition>
		</div>
	</div>
</template>

<script src="./index.js"></script>

<style lang="stylus">
@import './index.styl'
</style>
