<template>
    <div class="row separation todo">                
        <div class="row col-md-12 col-lg-12 col-xl-12 add_comment todo" v-if="$q.platform.is.mobile || this.mb">
            <div class="col-2" style="padding-top: 2px;">
                <q-avatar size="40px">
                    <img :src="src_avatar">
                </q-avatar>
            </div>
            <div class="col-10" align="center"> 
                <q-input rounded outlined v-model="comment" color="info" bg-color="secondary" placeholder="Escribe un comentario..." class="add_me" v-on:keyup.enter="validateComment()" >
                </q-input>
            </div>  
        </div>
        <div class="row col-md-12 col-lg-12 col-xl-12 add_comment todo" v-else>
            <div class="col-1" style="padding-top: 2px;">
                <q-avatar size="40px">
                    <img :src="src_avatar">
                </q-avatar>
            </div>
            <div class="col-11" align="center"> 
                <q-input rounded outlined v-model="comment" color="info" bg-color="secondary" placeholder="Escribe un comentario..." class="add_me" v-on:keyup.enter="validateComment()" >
                </q-input>
            </div>  
        </div>
    </div>
</template>

<script src="./index.js">
</script>

<style lang="stylus" >
@import './index.styl';
</style>
