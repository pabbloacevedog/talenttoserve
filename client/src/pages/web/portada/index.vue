<template >
  <div class="div_fondo_portada row" :style="{ backgroundImage: 'url(' + src_fondo + ')' }">
      <div class="col-7" style="display: flex;align-items: center;">
            <div style="padding-left: 15%;">
                <div class="contenedor">
                    <img :src="src_logo" class="column flex-center" style="width: 8vw !important;">
                    <div class="titulo_bar text-white column flex-center" style="font-size: 2em;padding-top: 32%;">Talent to Serve</div>
                    <div class="column flex-center text-portada">Capacitaciones y asesorías para hoteles</div>
                    <q-btn size="md" rounded color="accent" label="Conózcanos" class="btn-portada" @click="scrollToElement('#historia')"/>
                </div>
            </div>
      </div>
      <div class="col-5" style="display: table;padding: 2%;">

      </div>
      
  </div>
</template>

<script src="./index.js">
</script>

<style lang="stylus" >
	@import './index.styl'
</style>
