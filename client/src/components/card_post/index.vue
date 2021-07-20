<template>
    <div class="espacios">
        <q-card class="card-home" :key="up_card">
            <q-card-section align="left" style="padding: 4% 2% 1% 2% !important;" class="cursor-pointer">
                <q-chat-message
                    :avatar="item.avatar"
                    :text="['<b>'+ item.user_username + '</b> ']"
                    :stamp="convertTime(item.createdAt)"
                    bg-color="head_post"
                    class="f_roboto avatar_head"
                >
                </q-chat-message>
            </q-card-section >
            <q-card-section style="padding: 0px !important;" class="cursor-pointer">
                <ViewFinder :item="item" :index="index" :funciones="funciones"></ViewFinder>
            </q-card-section >
            <q-card-actions align="left" class="actions_card">
                <Reactions :item="item" :type="1"></Reactions>
            </q-card-actions>
            <q-card-actions style="padding: 1%;">
                <q-chat-message
                    :avatar="item.avatar"
                    :text="['<b>'+ item.user_username + '</b> ' +item.text]"
                    bg-color="primary"
                    class="f_roboto desc_post"
                >
                </q-chat-message>
            </q-card-actions>
            <q-card-actions align="left" class="comment-home" v-if="$q.platform.is.desktop">
                <ViewComments :id_post="item.id_post" :n_comments="item.n_comments"></ViewComments>
            </q-card-actions>
            <q-card-actions align="left" style="width: 100%;padding: 0 0 0 0;" v-if="$q.platform.is.desktop">
                <AddComment  :id_post="item.id_post" :item="item"> </AddComment>
            </q-card-actions>
        </q-card>
    </div>
</template>

<script src="./index.js">
</script>

<style lang="stylus" >
@import './index.styl';
</style>
