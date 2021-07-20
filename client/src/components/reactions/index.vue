<template> 
    <div class="todo colores">
        <div style="width: 100%;" v-if="type === 1">
            <div style="float: left;">
                <q-btn flat :id="'like_post_' + item.id_post" :class="item.class_like_post" icon="fas fa-heart" @click="darlike(item.id_post, 'post')"></q-btn>
                <label :id="'cont_like_post_' + item.id_post" >{{item.likes}} </label>
                <q-btn flat round icon="far fa-comment-dots">
                </q-btn>
                <label :id="'cont_com_' + item.id_post" >{{item.n_comments}} </label>
            </div>
            <div style="float: right;">
                <q-btn flat round align="right" icon="share" class="share"></q-btn>
            </div>
        </div>
        <div v-else-if="type === 2" class="col-12 espacio-action-comment"  align="left" style="padding-left: 7%;">
            <q-btn flat :id="'like_comment_' + item.id_comment" :class="item.class_like_comment" icon="fas fa-heart" @click="darlike(item.id_comment, 'comment')" size="xs"></q-btn>
            <label :id="'cont_like_comment_' + item.id_comment" >{{item.likes}} </label>
            <q-btn flat round size="xs" icon="fas fa-comments">
            </q-btn>
            <label :id="'cont_com_' + item.id_comment" >{{item.n_resp_comments}} </label>
            <q-btn  rounded color="info" :id="'btn_comment_'+item.id_comment"  @click="respComment(item.id_comment)" size="sm" style="margin-left: 1%;">responder</q-btn>
        </div>
        <div  v-else class="col-12 espacio-action-respcomment" align="left" style="padding-left: 7%;">
            <q-btn flat :id="'like_resp_comment_' + item.id_resp_comment" :class="item.class_like_resp_comment" icon="fas fa-heart" @click="darlike(item.id_resp_comment, 'resp_comment')" size="xs"></q-btn>
            <label :id="'cont_like_resp_comment_' + item.id_resp_comment" >{{item.likes}} </label>
            <q-btn rounded color="info" :id="'btn_comment_'+item.id_resp_comment"  @click="respCommentUser(item.id_comment)" size="xs" style="margin-left: 1%;">responder</q-btn>
        </div>
    </div>
</template>

<script src="./index.js">
</script>

<style lang="stylus" >
@import './index.styl';
</style>

            // <q-btn flat round size="xs" icon="fas fa-at">
            // </q-btn>
