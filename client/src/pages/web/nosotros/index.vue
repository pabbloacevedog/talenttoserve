<template >
    <div
        class="fondo_nosotros row"
        :style="{ backgroundImage: 'url(' + src_fondo + ')' }"
    >
        <div class="col-7" style="display: table; padding: 2%">
            <div class="column flex-center titulo-areas text-white">
                Nosotros
            </div>
            <q-carousel
                v-model="slide"
                transition-prev="slide-right"
                transition-next="slide-left"
                swipeable
                animated
                thumbnails
                infinite
                class="fondo_carousel"
                height="600px"
            >
                <q-carousel-slide
                    :name="index"
                    class="column no-wrap"
                    v-for="(item, index) in items"
                    :key="index"
                    :img-src="item.src"
                    style="background-image: none; padding-top: 13%"
                >
                    <q-card
                        class="my-card bg-dark text-white"
                        style="border-radius: 25px"
                    >
                        <q-card-section
                            avatar
                            style="padding-top: 10px; padding-bottom: 0"
                        >
                            <a class="avatar has-story">
                                <img :src="item.src" />
                            </a>
                        </q-card-section>
                        <q-card-section class="sect_nosotros">
                            <div class="nombre_nosotros">{{ item.nombre }}</div>
                        </q-card-section>
                        <q-card-section style="padding: 0 !important">
                            <div class="cargo_nosotros">{{ item.cargo }}</div>
                        </q-card-section>
                        <q-card-actions class="descp">
                            <div class="desc_text">
                                {{ item.descripcion }}
                            </div>
                        </q-card-actions>
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
@import './index.styl';
</style>
