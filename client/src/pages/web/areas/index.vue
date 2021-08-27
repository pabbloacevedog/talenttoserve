<template>
  <div class="div_fondo_areas row" :style="{ backgroundImage: 'url(' + src_fondo + ')' }">
      <div class="col-6">
            <div class="column flex-center" style="font-size: 4em;">ÁREAS DE SERVICIO</div>
            <div class="row" >
                <div class="col-6">
                    <q-card
                    class="my-card text-white"
                    style="background: radial-gradient(circle, #ff8235 0%, #de3b11 100%);width: 280px;margin-left: 5%;margin-top: 5%;border-radius: 25px;"
                    >
                    <q-card-section style="padding-bottom: 0px;">
                        <div class="text-h6">CONSULTORIA INTEGRAL HOTELERA</div>
                    </q-card-section>
                    <q-card-section class="q-pt-none">
                        <ul className='p-none'>
                            <li className='li_areas'>Habitaciones</li>
                            <li className='li_areas'>Alimentos y Bebidas</li>
                            <li className='li_areas'>Finanzas, Compras y Costos</li>
                            <li className='li_areas'>Gestión de Personas</li>
                            <li className='li_areas'>Análisis Técnico</li>
                            <li className='li_areas'>Ventas, Marketing y Revenue Management</li>
                            <li className='li_areas'>Gestión de Calidad</li>
                        </ul>
                    </q-card-section>
                    </q-card>
                </div>
                <div class="col-6">
                    <q-card
                    class="my-card text-white"
                    style="background: radial-gradient(circle, #ff8235 0%, #de3b11 100%);width: 280px;margin-left: 5%;margin-top: 5%;border-radius: 25px;"
                    >
                    <q-card-section style="padding-bottom: 0px;">
                        <div class="text-h6">HEADHUNTING</div>
                    </q-card-section>
                    <q-card-section class="q-pt-none">
                        <ul className='p-none'>
                            <li className='li_areas'>Reclutamiento y Headhunting especializado en el sector hotelero</li>
                        </ul>
                    </q-card-section>
                    </q-card>
                </div>
            </div>
            <div class="row" >
                <div class="col-6">
                    <q-card
                    class="my-card text-white"
                    style="background: radial-gradient(circle, #ff8235 0%, #de3b11 100%);width: 280px;margin-left: 5%;margin-top: 5%;border-radius: 25px;"
                    >
                    <q-card-section style="padding-bottom: 0px;">
                        <div class="text-h6">OPORTUNIDADES LABORALES</div>
                    </q-card-section>
                    <q-card-section class="q-pt-none">
                        Encuentra en esta sección todos los avisos que los hoteles publican.
                    </q-card-section>
                    </q-card>
                </div>
                <div class="col-6">
                    <q-card
                    class="my-card text-white"
                    style="background: radial-gradient(circle, #ff8235 0%, #de3b11 100%);width: 280px;margin-left: 5%;margin-top: 5%;border-radius: 25px;"
                    >
                    <q-card-section style="padding-bottom: 0px;">
                        <div class="text-h6">CLIENTE INCÓGNITO<</div>
                    </q-card-section>
                    <q-card-section class="q-pt-none">
                        <ul className='p-none'>
                            <li className='li_areas'>Mistery Guest</li>
                            <li className='li_areas'>Evaluación de Estándares</li>
                            <li className='li_areas'>Entrega de Evidencia</li>
                        </ul>
                    </q-card-section>
                    </q-card>
                </div>
            </div>
      </div>
        <div class="col-6">
            <img :src="src_persona" style="width: 12vw !important;margin-left: 35%;">
      </div>
  </div>
    <!-- <q-parallax style="height: 100vh;">
        <template v-slot:media>
            <img :src="src_fondo">
        </template>

        <template v-slot:>

        </template>
    </q-parallax> -->
</template>

<script src="./index.js">
</script>

<style lang="stylus" >
	@import './index.styl'
</style>
