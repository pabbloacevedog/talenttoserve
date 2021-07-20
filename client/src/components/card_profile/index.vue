<template>
    <div class="espacios_profile">
        <q-card class="card-home" :key="up_card">
            <q-card-section style="padding: 0px !important;" class="cursor-pointer">
                <q-carousel
                v-if="item.n_pics > 1"
                swipeable
                animated
                v-model="slide"
                arrows
                infinite
                style="border-radius: 20px; height: 210px;"
                >
                    <q-carousel-slide @click="funciones.openViewer(index)" v-for="slide in item.slides" :key="slide.id" :name="slide.id" :img-src="slide.url"></q-carousel-slide>
                </q-carousel>
                <!-- <div v-else :style="'height: ' + item.height + 'px; width:' + item.width + 'px;'"> -->
                <div v-else  @click="funciones.openViewer(index)">
                    <div v-if="item.n_pics > 0">
                        <img :src="item.img" class="img-unique_p">
                    </div>
                    <div v-else class="solo_texto" >
                        <div class="todo text-h6 post-text vertical-middle" align="center">{{item.text}}</div>
                    </div>
                </div>
            </q-card-section >
            <q-card-actions align="left" class="actions_card">
                <Reactions :item="item" :type="1"></Reactions>
            </q-card-actions>
        </q-card>
    </div>
</template>
<script src="./index.js">
</script>

<style lang="stylus" >
@import './index.styl';
</style>