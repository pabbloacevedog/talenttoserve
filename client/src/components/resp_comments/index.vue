<template>
    <div class=" todo row resp" :id="'action_respcomment_'+res_com.id_comment">
        <q-chat-message
            :name="res_com.username"
            :avatar="res_com.avatar"
            :text="['<b>'+ res_com.username + '</b> ' +res_com.text]"
            class="f_roboto"
            bg-color="rescom"
        >
        </q-chat-message>
    </div>
</template>

<script src="./index.js">
</script>

<style lang="stylus" >
@import './index.styl';
</style>