<template>
    <div class="todo row cursor-pointer" style="height: 60px;">
        <div class="col-2">
            <q-avatar size="55px">
                <img :src="item.avatar_addressee">
            </q-avatar>
        </div>
        <div class="col-7 divition">
            <div class="column items-start">
                <label class="f_roboto name_list">{{item.name_addressee}} </label> 
            </div>
            <div class="column items-start">
                <label class="f_roboto_l last_message">{{item.text}}</label> 
            </div>
        </div>
        <div class="col-2 last_message divition_hour">
            <div class="column items-end">
                <label class="f_roboto name_list">{{convertTime(item.createdAt)}} </label> 
            </div>
        </div>
    </div>
</template>

<script src="./index.js">
</script>

<style lang="stylus" >
@import './index.styl';
</style>
