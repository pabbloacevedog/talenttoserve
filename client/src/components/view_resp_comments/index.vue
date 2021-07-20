<template>
    <div class="todo">
        <div class="todo" v-for="(res_com,iresp) in resp_commentsPost" :key="res_com.id_resp_comment" align="left">
            <div v-if="iresp < min_resp"  class="espacio-respcomment_ul row">
                <RespComments :res_com="res_com" :iresp="iresp"></RespComments>
                <Reactions :item="res_com" :type="3" :ss_u="$ss_u"></Reactions>
            </div>
        </div>
        <div class="row justify-center q-my-md" v-if="remaining > 0">
            <MoreRespComments :remaining='remaining_' :funciones="funciones"> </MoreRespComments>
        </div>
    </div>

</template>

<script src="./index.js">
</script>

<style lang="stylus" >
@import './index.styl';
</style>
