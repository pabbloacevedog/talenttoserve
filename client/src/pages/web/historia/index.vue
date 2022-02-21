<template>
	<div
		class="div_fondo row"
		:style="{ backgroundImage: 'url(' + src_fondo + ')' }"
	>
		<div class="col-12" style="height: 20px;padding-top: 2%;">
			<transition appear enter-active-class="animated fadeInDownBig">
				<div class="column flex-center">
					<div class="text-white column flex-center titulo-historia">
						La historia atrás del sueño
					</div>
				</div>
			</transition>
		</div>
		<div class="col-6">
			<!-- <img :src="src_persona" style="width: 31vw !important;margin-left: 29%;"> -->
		</div>
		<div class="col-6">
			<transition appear enter-active-class="animated fadeInUpBig">
				<div class="column flex-center">
					<div
						class="column flex-center"
						style="color: #ff5e00 !important;font-size: 2em;padding-top: 2%;"
					>
						NUESTROS INICIOS
					</div>
					<p class="text-white column flex-center text-historia">
						En 2014 iniciamos nuestro sueño de crear una empresa de
						asesoría y capacitación, que nos permitiera desplegar
						nuestra trayectoria y pasión por la hotelería y el
						servicio. Llevamos 7 años de colaboración con cadenas
						nacionales y extranjeras, entregando todo nuestro
						potencial y dedicación. A partir de 2021 empezamos a
						ofrecer también nuestros servicios en México.
					</p>
				</div>
			</transition>
		</div>
	</div>
</template>

<script src="./index.js"></script>

<style lang="stylus">
@import './index.styl'
</style>
