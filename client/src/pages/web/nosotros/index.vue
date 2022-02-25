<template>
	<div
		class="fondo_nosotros row"
		:style="{ backgroundImage: 'url(' + src_fondo + ')' }"
	>
		<div
			class="col-7 col-md-7 col-xs-12"
			style="display: table; padding: 2%"
		>
			<div class="column flex-center titulo-areas text-white">
				NUESTRO EQUIPO
			</div>
			<q-carousel
				v-model="slide"
				transition-prev="slide-right"
				transition-next="slide-left"
				swipeable
				animated
				thumbnails
				infinite
				class="fondo_carousel"
				height="700px"
			>
				<q-carousel-slide
					:name="index"
					class="column no-wrap"
					v-for="(item, index) in items"
					:key="index"
					:img-src="item.src"
					:ratio="1"
					style="background-image: none; padding-top: 10vh;"
				>
					<q-card
						class="card-nosotros text-white"
						style="border-radius: 25px"
					>
						<q-card-section
							horizontal
							avatar
							class="row"
							style="padding-top: 5vh; padding-bottom: 0"
						>
							<a class="avatar has-story" >
								<img :src="item.src" :ratio="1" class="img-nosotros"/>
							</a>
							<q-card-section style="padding: 0 !important; margin:auto" align="center">
								<div class="nombre_nosotros">
									{{ item.nombre }}
								</div>
								<div class="cargo_nosotros">
									{{ item.cargo }}
								</div>
							</q-card-section>
						</q-card-section>

						<q-card-actions class="descp">
							<div class="desc_text">
								{{ item.descripcion }}
							</div>
						</q-card-actions>
					</q-card>
				</q-carousel-slide>
			</q-carousel>
		</div>
		<div class="col-5">
			<!-- <img :src="src_persona" style="width: 31vw !important;margin-left: 29%;"> -->
		</div>
	</div>
</template>

<script src="./index.js"></script>

<style lang="stylus">
@import './index.styl';
</style>
