<template>
    <div class="row card-color">
        <div class="row viewer_card" style="width: 100%;max-height: 900px;width: 100%;">
            <div class="col-xs-12">
                <q-card-section style="padding: 0px;">
                    <div class="col-12 row barra_conv" >
                        <div class="col-1" @click="funciones.exitView()">
                            <i class="fas fa-arrow-circle-left fa-2x"></i>
                        </div>
                        <div class="col-11" align="center">
                            <q-avatar size="40px">
                                <img :src="user_avatar">
                            </q-avatar>
                            <label class="f_roboto_l" style="padding-left: 10px;">{{user_name}}</label> 
                        </div>
                    </div>
                </q-card-section>
                <q-card class="photo" style="margin-top: 35%;">
                    <q-card-section style="padding: 0px !important;" class="cursor-pointer">
                        <q-carousel
                        v-if="item.length > 1"
                        swipeable
                        arrows
                        animated
                        v-model="slide_viewer"
                        infinite
                        thumbnails
                        class="image_viewer_phone"
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
    </div>
</template>

<script src="./index.js">
</script>

<style lang="stylus" >
	@import './index.styl'
</style>
