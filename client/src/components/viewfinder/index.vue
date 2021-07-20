<template>
    <q-carousel
    v-if="item.n_pics > 1"
    swipeable
    animated
    arrows
    v-model="slide"
    infinite
    thumbnails
    class="alto-carousel"
    >
        <q-carousel-slide v-for="slide in item.slides" :key="slide.id" :name="slide.id" :img-src="slide.url" @click="funciones.openViewer(index)" ></q-carousel-slide>
    </q-carousel>
    <div v-else @click="funciones.openViewer(index)" >
        <div v-if="item.n_pics > 0">
            <!-- <q-img :src="item.src"> </q-img> -->
            <div class="q-carousel q-panel-parent q-carousel--without-padding" style="border-radius: 20px;">
                <q-img :src="item.img"> </q-img>
                <!-- <div class="q-carousel__slide">
                    <q-img :src="item.img"> </q-img>
                </div> -->
            </div>
        </div>
        <div v-else style="background-color: #ffffff; min-height: 100px; border-radius: 20px;" >
            
            <div class="todo text-h6 post-text vertical-middle" align="center">{{item.text}}</div>
        </div>
    </div>
</template>

<script src="./index.js">
</script>

<style lang="stylus" >
@import './index.styl';
</style>
