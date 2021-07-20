<template>
    <div class="todo">
        <div class="todo" @click="funciones.moreRespComments()" style="padding-left: 8.5%;">
            <div  class="f_roboto text-h7 cursor-pointer color_text" style="font-size: 12px;" align="left" v-if="remaining > 1">
                Ver las {{remaining }} respuestas
            </div>
            <div  class="f_roboto text-h7 cursor-pointer color_text" style="font-size: 12px;" align="left" v-else>
                Ver {{remaining }} respuesta
            </div>
        </div>
    </div>
</template>

<script src="./index.js">
</script>

<style lang="stylus" >
@import './index.styl';
</style>
