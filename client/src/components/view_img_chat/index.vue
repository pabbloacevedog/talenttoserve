<template>
    <div class="row tama_view">
        <div class="col-12">
            <q-card-actions class="back" align="center" >
                <div style="width: 100%;" class="row"> 
                    <div class="row col-xs-12" style="padding-top: 5%;top: 0;">
                        <q-btn flat class="close_viewer" icon="highlight_off" color="primary" @click="funciones.exitView()" />
                    </div>
                </div>
            </q-card-actions>
            <q-card class="photo alinear">
                <q-card-section style="padding: 0px !important;" class="cursor-pointer">
                    <q-carousel
                    v-if="item.length > 1"
                    swipeable
                    arrows
                    animated
                    v-model="slide_viewer"
                    infinite
                    thumbnails
                    class="image_viewer"
                    >
                        <q-carousel-slide v-for="slide in item" :key="slide.id" :name="slide.id" :img-src="slide.url"></q-carousel-slide>
                    </q-carousel>
                    <div v-else>
                        <div class="q-carousel q-panel-parent q-carousel--without-padding image_viewer">
                            <div class="q-carousel__slide" :style="'background-image: url(' + item[0].url+ ');'">
                            </div>
                        </div>
                    </div>
                </q-card-section >
            </q-card>
        </div>
    </div>
</template>

<script src="./index.js">
</script>

<style lang="stylus" >
@import './index.styl';
</style>
