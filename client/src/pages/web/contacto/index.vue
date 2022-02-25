<template>
	<div id="app">
		<div class="contenedor_cont_todo">
			<div
				class="row "
				style="
                    height: 100% !important;
                "
			>
				<div class="col-4 col-md-4 col-xs-12 bloq_cont_iz">
					<div class="q-pa-lg">
						<q-toolbar>
							<div class="titulo_contacto">Contacto</div>
							<img style="max-height: 50px" :src="src_logo" />
						</q-toolbar>
						<div style="padding-top: 10%;">
							<q-img
								:src="img_contacto"
								spinner-color="white"
								style="max-width: 500px"
								img-class="my-custom-image"
								class="rounded-borders"
							>
							</q-img>
						</div>
					</div>
				</div>
				<div class="col-8 col-md-8 col-xs-12  bloq_cont_der">
					<div class="row q-pa-md">
						<div class="col-3 col-md-3 col-xs-12 "></div>
						<div class="col-5 col-md-5 col-xs-4">
							<q-img
								:src="bandera_chile"
								spinner-color="white"
								style="width: 150px"
								img-class="my-custom-image"
								class="rounded-borders"
							>
							</q-img>
						</div>
						<div class="col-4 col-md-4 col-xs-4">
							<q-img
								:src="bandera_mexico"
								spinner-color="white"
								style="width: 150px"
								img-class="my-custom-image"
								class="rounded-borders"
							>
							</q-img>
						</div>
					</div>
					<div>
						<q-table
							:data="data"
							:columns="columns"
							row-key="name"
							class="tabla_contacto"
							hide-bottom
							separator="none"
							dark
						/>
					</div>
				</div>
				<div class="col-12 borroso">
					<center>
						<div class="buscanos">
							Buscanos en redes sociales
						</div>
						<div class="row" style="max-width: 400px;">
							<div class="col">
								<q-img
									:src="icono_whatsapp"
									spinner-color="white"
									style="max-width: 48px"
									img-class="my-custom-image"
									class="rounded-borders"
								>
								</q-img>
							</div>
							<div class="col">
								<q-img
									:src="icono_gmail"
									spinner-color="white"
									style="max-width: 48px"
									img-class="my-custom-image"
									class="rounded-borders"
								>
								</q-img>
							</div>
							<div class="col">
								<q-img
									:src="icono_linkedin"
									spinner-color="white"
									style="max-width: 48px"
									img-class="my-custom-image"
									class="rounded-borders"
								>
								</q-img>
							</div>
							<div class="col">
								<q-img
									:src="icono_instagram"
									spinner-color="white"
									style="max-width: 48px"
									img-class="my-custom-image"
									class="rounded-borders"
								>
								</q-img>
							</div>
							<div class="col">
								<q-img
									:src="icono_facebook"
									spinner-color="white"
									style="max-width: 48px"
									img-class="my-custom-image"
									class="rounded-borders"
								>
								</q-img>
							</div>
						</div>
					</center>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./index.js">
export default {
    name: "Auth",
};
</script>

<style lang="stylus">
@import './index.styl';
</style>
