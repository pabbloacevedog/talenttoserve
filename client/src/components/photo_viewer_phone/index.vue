<template>
    <div class="row card-color">
        <div class="row viewer_card" style="width: 100%;max-height: 900px;width: 100%;">
            <div class="col-xs-12">
                <q-card-actions class="back" align="left" >
                    <div style="width: 100%;" class="row">                
                        <div class="row col-xs-12" style="padding-top: 2%;top: 0;">
                            <q-btn flat class="close_viewer" icon="highlight_off" color="primary" @click="funciones.closeViewer" />
                        </div>
                    </div>
                </q-card-actions>
                <q-card class="photo">
                    <q-card-section style="padding: 0px !important;" class="cursor-pointer">
                        <q-carousel
                        v-if="data_post.n_pics > 1"
                        swipeable
                        arrows
                        animated
                        v-model="slide_viewer"
                        infinite
                        thumbnails
                        class="image_viewer"
                        >
                            <q-carousel-slide v-for="slide in data_post.slides" :key="slide.id" :name="slide.id" :img-src="slide.url"></q-carousel-slide>
                        </q-carousel>
                        <div v-else>
                            <div v-if="data_post.n_pics > 0">
                                <div class="q-carousel q-panel-parent q-carousel--without-padding image_viewer">
                                    <div class="q-carousel__slide" :style="'background-image: url(' + data_post.img + ');'">
                                    </div>
                                </div>
                            </div>
                            <div v-else style="background-color: #ffffff; min-height: 100px; " class="image_viewer" >
                                <div class="todo text-h6 post-text vertical-middle" align="center">{{data_post.text}}</div>
                            </div>
                        </div>
                    </q-card-section >
                </q-card>
            </div>
            <div class="col-xs-12">
                <q-card  class="parent" style="padding-top: 4%;padding-right: 3%;background-color: $primary;">
                    <q-card-actions align="left" class="actions_card">
                        <Reactions :item="data_post" :type="1" :ss_u="ss_u"></Reactions>
                    </q-card-actions>
                    <q-card-actions align="left" class="comment-view" style="padding-bottom: 75px;">
                        <ViewComments :id_post="data_post.id_post" :n_comments="data_post.n_comments"></ViewComments>
                    </q-card-actions>
                    <q-card-actions class="add_comm">
                        <div style="width: 100%;" class="row">                
                            <div class="row col-xs-12" style="padding-top: 2%;bottom: 0;">
                                <AddComment  :id_post="data_post.id_post" :item="data_post" class="card-color"> </AddComment>
                            </div>
                        </div>
                    </q-card-actions>
                </q-card>
            </div>
        </div>
    </div>
</template>

<script src="./index.js">
</script>

<style lang="stylus" >
	@import './index.styl'
</style>
