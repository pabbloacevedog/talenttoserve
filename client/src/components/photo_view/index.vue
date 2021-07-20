<template>
    <div class="row tamano_viewer">
        <div class="col-md-12 col-lg-12 col-xl-12 card-color" style="border-radius: 28px 28px 28px 28px;">
            <div class="row viewer_card" style="width: 100%;max-height: 900px;width: 100%;">
                <div class="col-md-8 col-lg-8 col-xl-8">
                    <q-card class="photo">
                        <q-card-section style="padding: 4px !important;" class="cursor-pointer">
                            <q-carousel
                            v-if="data_post.n_pics > 1"
                            swipeable
                            arrows
                            animated
                            v-model="slide_viewer"
                            infinite
                            thumbnails
                            class="image_view"
                            >
                                <q-carousel-slide v-for="slide in data_post.slides" :key="slide.id" :name="slide.id" :img-src="slide.url"></q-carousel-slide>
                            </q-carousel>
                            <div v-else>
                                <div v-if="data_post.n_pics > 0">
                                    <div class="q-carousel q-panel-parent q-carousel--without-padding image_view">
                                        <div class="q-carousel__slide" :style="'background-image: url(' + data_post.img + ');'">
                                        </div>
                                    </div>
                                </div>
                                <div v-else style="background-color: #ffffff; min-height: 100px; " class="image_view" >
                                    <div class="todo text-h6 post-text vertical-middle" align="center">{{data_post.text}}</div>
                                </div>
                            </div>
                        </q-card-section >
                    </q-card>
                    <div class="col-md-12 col-lg-12 col-xl-12 more_post">
                        <div class="scrolling">
                            <ul >
                                <li v-for="(item, index) in twenty_post" :key="item.id_post" class="card_tamano scrolling-item">
                                    <q-card class="card-color scrolling-item" style="border-radius: 25px;">
                                        <q-card-section style="padding: 0px !important;" class="cursor-pointer">
                                            <q-carousel
                                            v-if="item.n_pics > 1"
                                            swipeable
                                            animated
                                            arrows
                                            v-model="slide"
                                            infinite
                                            class="other_view"
                                            >
                                                <q-carousel-slide v-for="slide in item.slides" :key="slide.id" :name="slide.id" :img-src="slide.url" @click="changePost(index)" ></q-carousel-slide>
                                            </q-carousel>
                                            <div v-else @click="changePost(index)" >
                                                <div v-if="item.n_pics > 0">
                                                    <div class="q-carousel q-panel-parent q-carousel--without-padding other_view">
                                                        <div class="q-carousel__slide" :style="'background-image: url(' + item.img + ');'">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div v-else style="background-color: #ffffff;" class="other_view">
                                                    <div class="q-carousel q-panel-parent q-carousel--without-padding other_view">
                                                        <div class="q-carousel__slide" :style="'background-image: url(' + item.img + ');'">
                                                            <div class="todo text-h6 post-text vertical-middle" align="center">{{item.text}}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </q-card-section >
                                    </q-card>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-lg-4 col-xl-4">
                    <q-card  class="parent" style="padding-top: 4%;padding-right: 3%;background-color: $primary;">
                        <q-scroll-area
                            :thumb-style="thumbStyle"
                            :content-style="contentStyle"
                            :content-active-style="contentActiveStyle"
                            style="height: 100%; max-width: 100%;"
                            
                        >
                            <q-card-actions align="left" class="comment-view">
                                <div align="left" style="width: 100%;" >
                                    <div  class="espacio-comment_first" >
                                        <q-avatar size="40px">
                                            <img :src="data_post.avatar">
                                        </q-avatar>
                                        <label class="f_roboto cursor-pointer" style="color:#147dff; padding-left: 5px;">@{{data_post.user_username}} </label>
                                        <label class="f_roboto_l cursor-pointer">{{data_post.text}}</label> 
                                    </div>
                                </div>
                                <div class="todo" v-for="com in data_post.comments" :key="com.id_comment" align="left">
                                    <div v-if="data_post.n_comments > 1" class="espacio-comment row" style="font-size: 1.0rem;" :id="'comment_'+com.id_comment">
                                        <div class="col-12 color-comments">
                                            <q-avatar size="40px">
                                                <img :src="com.avatar">
                                            </q-avatar>
                                            <label class="f_roboto cursor-pointer comment_user" :id="'comment_user_'+com.id_comment" style="padding-left: 5px;" @click="goProfile(com.username)">@{{com.username}} </label> 
                                            <label class="f_roboto_l cursor-pointer">{{com.text}}</label> 
                                        </div>
                                        <div class="col-12 espacio-action-comment"  align="right" >
                                            <q-btn flat :id="'like_' + data_post.id_post" :class="data_post.like_class" icon="fas fa-heart" @click="darlike(data_post.id_post)" size="xs"></q-btn>
                                            <label :id="'cont_like_' + data_post.id_post" >{{data_post.likes}} </label>
                                            <q-btn flat round size="xs" icon="far fa-comment-dots">
                                            </q-btn>
                                            <label :id="'cont_com_' + data_post.id_post" >{{data_post.n_comments}} </label>
                                            <q-btn outline rounded color="accent" class="comment_user" :id="'btn_comment_'+com.id_comment"  @click="respComment(com.id_comment)" size="xs" style="box-shadow: none;">responder</q-btn>
                                        </div>
                                    </div>
                                    <div  class="espacio-respcomment_ul row">
                                        <div class="col-12 color-comments">
                                            <q-avatar size="30px">
                                                <img :src="com.avatar">
                                            </q-avatar>
                                            <label class="f_roboto cursor-pointer" style="color:#147dff; padding-left: 5px;" @click="goProfile(com.username)">@{{com.username}} </label> 
                                            <label class="f_roboto_l cursor-pointer">{{com.text}}</label> 
                                        </div>
                                        <div class="col-12 espacio-action-respcomment" align="right">
                                            <q-btn flat :id="'like_' + data_post.id_post" :class="data_post.like_class" icon="fas fa-heart" @click="darlike(data_post.id_post)" size="xs"></q-btn>
                                            <label :id="'cont_like_' + data_post.id_post" >{{data_post.likes}} </label>
                                            <q-btn outline rounded color="accent" class="comment_user" :id="'btn_comment_'+com.id_comment"  @click="respComment(com.id_comment)" size="xs" style="box-shadow: none;">responder</q-btn>
                                        </div>
                                    </div>
                                </div>
                                <div :id="'add_comment_'+data_post.id_post" class="todo">
                                </div>
                            </q-card-actions>
                        </q-scroll-area>
                        <q-card-actions class="area_comment">
                            <div style="width: 100%;" class="row">                
                                <div style="width: 100%;" class="col-md-12 col-lg-12 col-xl-12">
                                    <div style="float: left;">
                                        <q-btn flat :id="'like_' + data_post.id_post" :class="data_post.like_class" icon="fas fa-heart" @click="darlike(data_post.id_post)"></q-btn>
                                        <label :id="'cont_like_' + data_post.id_post" >{{data_post.likes}} </label>
                                        <q-btn flat round style="color: #9c9c9c !important;" icon="far fa-comment-dots">
                                        </q-btn>
                                        <label :id="'cont_com_' + data_post.id_post" >{{data_post.n_comments}} </label>
                                    </div>
                                    <div style="float: right;">
                                        <q-btn flat round style="color: #9c9c9c !important;" align="right" icon="share" class="share"></q-btn>
                                    </div>
                                </div>
                                <div class="row col-md-12 col-lg-12 col-xl-12" style="padding-top: 2%;bottom: 0;">
                                    <div class="col-xs-1">
                                        <q-avatar size="40px">
                                            <img :src="src_avatar">
                                        </q-avatar>
                                    </div>
                                    <div class="col-xs-8" style="padding-left: 6%;" > 
                                        <q-input rounded outlined bottom-slots v-model="comment" label="Agregar un comentario..." maxlength="200" :dense="dense"/>
                                    </div>
                                    <div class="col-xs-3" align="right">
                                        <q-btn rounded color="accent" style="height: 65%;width: 80%;font-size: 12px;" @click="newComment(data_post.id_post)">comentar</q-btn>
                                    </div>
                                </div>
                            </div>
                        </q-card-actions>
                    </q-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./index.js">
</script>

<style lang="stylus" >
	@import './index.styl'
</style>
