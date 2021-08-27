<template >
  <div class="div_fondo row" :style="{ backgroundImage: 'url(' + src_fondo + ')' }">
      <div class="col-7">
            <img :src="src_persona" style="width: 31vw !important;margin-left: 29%;">
      </div>
      <div class="col-5" style="display: table;padding: 2%;">
          <div class="column flex-center" style="width: 80%;display: table-cell;vertical-align: middle;">
            <div class="text-white column flex-center" style="font-size: 3em;">La historia atrás del sueño</div>
            <div class="column flex-center" style="color: #ff5e00 !important;font-size: 2em;">NUESTROS INICIOS</div>
            <p class="text-white column flex-center" style="font-size: 1.2em;">En 2014 iniciamos nuestro sueño de crear una
            empresa de asesoría y capacitación, que nos
            permitiera desplegar nuestra trayectoria y pasión
            por la hotelería y el servicio.
            Llevamos 7 años de colaboración con cadenas
            nacionales y extranjeras, entregando todo nuestro
            potencial y dedicación.
            A partir de 2021 empezamos a ofrecer también
            nuestros servicios en México.
            </p>
          </div>
      </div>
      
  </div>
</template>

<script src="./index.js">
</script>

<style lang="stylus" >
	@import './index.styl'
</style>
