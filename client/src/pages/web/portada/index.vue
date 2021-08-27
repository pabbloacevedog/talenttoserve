<template>
    <q-parallax style="height: 100vh;">
        <template v-slot:media>
            <img :src="src_fondo" style="width: 110vw !important;">
        </template>
        <template class="align-items: flex-start; !important;" v-slot:content>
            <div style="width: 88%;align-items: flex-start;">
                <div style="width: 52%;">
                    <img :src="src_logo" style="width: 12vw !important;margin-left: 35%;">
                    <div class="text-white column flex-center" style="font-size: 4em;">Talent to Serve</div>
                    <div class="column flex-center" style="color: #ff5e00 !important;font-size: 2em;">Capacitaciones y asesorías para hoteles</div>
                </div>
            </div>
        </template>
    </q-parallax>
</template>

<script src="./index.js">
</script>

<style lang="stylus" >
	@import './index.styl'
</style>
