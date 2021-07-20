<template>
    <div class="todo" reveal elevated>
            <q-tabs
            v-model="tab"
            inline-label
            shrink
            stretch
            >
                <q-tab v-for="tab in tabs" :key="tab.name" v-bind="tab" class="fondo_tab"></q-tab>
            </q-tabs>
        <!-- <div align="left" class="categorias"> 
            <label class="cat_title f_roboto_l">Categorias</label>
            <div class="carousel-frame">
                <ul >
                    <li v-for="(item) in items_cabecera" :key="item" class="card_tamano carousel-item">
                        <q-card class=" carousel-item wow animated bounceInLeft" style="height: 90px;display: flex;justify-content: center;align-items: center; background: linear-gradient(0deg, rgba(0,77,163,1) 0%, rgba(16,173,232,1) 49%, rgba(0,212,255,1) 100%);">
                            <q-card-section style="padding: 0px !important;" class="cursor-pointer">
                                <div  style="font-size: 25px;color: $text;">
                                    {{item}}
                                </div>
                            </q-card-section >
                        </q-card>
                    </li>
                </ul>
            </div>
        </div> -->
    </div>
</template>

<script src="./index.js">
</script>

<style lang="stylus" >
@import './index.styl';
</style>

            // <q-btn flat round size="xs" icon="fas fa-at">
            // </q-btn>
