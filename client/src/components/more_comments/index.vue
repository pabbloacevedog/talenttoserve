<template>
    <div class="todo" @click="funciones.moreC()" >
        <div  class="f_roboto text-h7 cursor-pointer color_text" align="center" v-if="remaining > 1">
            Ver {{remaining}} comentarios más
        </div>
        <div  class="f_roboto text-h7 cursor-pointer color_text" align="center" v-else>
            Ver {{remaining}} comentario más
        </div>
    </div>
</template>

<script src="./index.js">
</script>

<style lang="stylus" >
@import './index.styl';
</style>
