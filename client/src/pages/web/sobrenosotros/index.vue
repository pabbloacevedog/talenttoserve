<template>
	<div class="div_fondo_snosotros row" style="background-color: #000000;">
		<div
			class="col-12"
			style="height: 20px;padding-top: 2%;"
			v-if="$q.platform.is.desktop"
		>
			<div class="text-white column flex-center titulo-snosotros">
				Sobre nosotros
			</div>
		</div>
		<div class="col-6 col-md-6 col-xs-12">
			<div v-if="$q.platform.is.mobile" class="text-white column flex-center titulo-snosotros">
				Sobre nosotros
			</div>
			<img
				:src="src_persona"
				class="img-snosotros"
			/>
		</div>
		<div class="col-6 col-md-6 col-xs-12">
			<div class="column flex-center">
				<p
					class="text-white column flex-center p-snosotros"
				>
					Nuestro equipo está constituido por profesionales
					multidiciplinarios con más de 20 años de trayectoria en
					hotelería de cadenas internacionales y nacionales de cinco
					estrellas y en la docencia.
				</p>
				<p
					class="text-white column flex-center p-snosotros"
				>
					Desde nuestros inicios, asesoramos a empresas hoteleras y a
					empresarios del servicio en la implementación de las nuevas
					tecnologías, administración, comercialización, gestión de
					hoteles, calidad y servicio de excelencia en etapa de
					pre-apertura y en operación.
				</p>
				<p
					class="text-white column flex-center p-snosotros"
				>
					Ofrecemos varios cursos de inducción y capacitación
					acreditados por la Universidad Finis Terrae (Santiago,
					Chile), logrando un alto nivel de servicio con el fin de
					generar ventajas competitivas en un mercado actual de alta
					exigencia
				</p>
			</div>
		</div>
	</div>
</template>

<script src="./index.js"></script>

<style lang="stylus">
@import './index.styl'
</style>
