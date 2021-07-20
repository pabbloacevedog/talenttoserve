<template>
    <div class="row" :id="'action_comment_'+com.id_comment">
        <q-chat-message
            :name="com.username"
            :avatar="com.avatar"
            :text="['<b>'+ com.username + '</b> ' +com.text]"
            bg-color="comm"
            class="f_roboto"
        >
        </q-chat-message>
    </div>
</template>

<script src="./index.js">
</script>

<style lang="stylus" >
@import './index.styl';
</style>
