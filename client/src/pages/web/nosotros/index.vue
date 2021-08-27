<template >
  <div class="fondo_nosotros row" :style="{ backgroundImage: 'url(' + src_fondo + ')' }">
    <div class="col-7" style="display: table;padding: 2%;">
        <div class="text-white column flex-center" style="font-size: 3em;">Nosotros</div>
        <q-carousel
        v-model="slide"
        vertical
        transition-prev="slide-down"
        transition-next="slide-up"
        swipeable
        animated
        control-color="white"
        navigation-icon="radio_button_unchecked"
        navigation
        padding
        arrows
        height="600px"
        >
            <q-carousel-slide name="style" class="column no-wrap flex-center" v-for="(item, index) in items" :key="index">
                <q-card class="my-card" style="border-radius: 25px;" flat bordered>
                <q-card-section horizontal>
                    <q-card-section class="q-pt-xs">
                    <div class="text-overline">{{item.nombre}}</div>
                    <div class="text-h6 q-mt-sm q-mb-xs">{{item.cargo}}</div>
                    <div class="text-caption text-grey">
                       {{item.descripcion}}
                    </div>
                    </q-card-section>

                    <q-card-section class="col-5 flex flex-center">
                    <q-img
                        class="rounded-borders"
                        :src="item.src"
                    ></q-img>
                    </q-card-section>
                </q-card-section>
                </q-card>

            </q-carousel-slide>
        </q-carousel>
      </div>
      <div class="col-5">
            <!-- <img :src="src_persona" style="width: 31vw !important;margin-left: 29%;"> -->
      </div>
      
  </div>
</template>

<script src="./index.js">
</script>

<style lang="stylus" >
	@import './index.styl'
</style>
