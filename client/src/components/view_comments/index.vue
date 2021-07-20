<template>
    <div class="todo" :key="up_coms">
        <div class="todo" v-for="(com,icom) in commentsPost" :key="com.id_comment" align="left" style="padding-left: 1%;">
            <div v-if="icom < min_com" class="row" :id="'comment_'+com.id_comment">
                <Comments :com="com" :icom="icom"></Comments>
                <Reactions :item="com" :type="2"></Reactions>
            </div>
            <ViewRespComments :id_comment="com.id_comment" :remaining='com.n_resp_comments'> </ViewRespComments>
        </div>
        <div class="row justify-center q-my-md" v-if="remaining > 0">
            <MoreComments :remaining='remaining' :funciones="funciones"> </MoreComments>
        </div>
        <div class="todo row justify-center q-my-md" v-if="seeless">
            <div  class="f_roboto text-h7 cursor-pointer color_text" align="center" @click="see_less">
                Ver menos comentarios
            </div>
        </div>
    </div>
</template>

<script src="./index.js">
</script>

<style lang="stylus" >
@import './index.styl';
</style>
