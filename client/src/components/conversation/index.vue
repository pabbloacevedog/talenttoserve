<template>
    <div class="scrollingContainer todo" :key="up_conversation">
        <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px"></q-spinner-dots>
        </div>
        <q-infinite-scroll @load="funciones.onLoad" reverse class="scroll_conv">
            <div v-for="(item) in conversation" :key="item.id_message" id="conversation_div">
                <div v-if="item.uuid_user == $ss_u" class="casi-todo" align="right">
                    <div v-if="item.text != ''">
                        <q-chat-message
                            :name="item.name"
                            :avatar="item.avatar"
                            :text="[item.text]"
                            bg-color="bg-send"
                            sent
                        >
                        <div v-if="item.images != ''" @click="funciones.openView(item.slides)">
                            <q-img
                                v-for="(img) in item.slides" 
                                :key="img.id"
                                transition="slide-up"
                                :src="img.url" 
                                style="width: 180px; margin: 1%;"
                                ratio="1"
                                spinner-color="white"
                                class="rounded-borders cursor-pointer"
                            >
                            </q-img>
                        </div>
                        </q-chat-message>
                        <div>
                            <span  class="text-time">{{convertTime(item.createdAt)}}</span>
                            <span v-if="item.viewed" class="material-icons viewved text-color">
                            done_all
                            </span>
                        </div>
                    </div>
                    <div v-else>
                        <q-chat-message
                            :name="item.name"
                            :avatar="item.avatar"
                            bg-color="bg-send"
                            sent
                        >
                        <div v-if="item.images != ''" @click="funciones.openView(item.slides)">
                            <q-img
                                v-for="(img) in item.slides" 
                                :key="img.id"
                                transition="slide-up"
                                :src="img.url" 
                                style="width: 180px; margin: 1%;"
                                ratio="1"
                                spinner-color="white"
                                class="rounded-borders cursor-pointer"
                            >
                            </q-img>
                        </div>
                        </q-chat-message>
                        <div>
                            <span  class="text-time">{{convertTime(item.createdAt)}}</span>
                            <span v-if="item.viewed" class="material-icons viewved text-color">
                            done_all
                            </span>
                        </div>
                    </div>
                </div>
                <div v-else class="casi-todo" align="left">
                    <div v-if="item.text != ''">
                        <q-chat-message
                            :name="item.name"
                            :avatar="item.avatar"
                            :text="[item.text]"
                            bg-color="mess"
                            text-color="text-color"
                            >
                        
                            <div v-if="item.images != ''" style="width: -webkit-fill-available;" @click="funciones.openView(item.slides)" >
                                <q-img
                                    v-for="(img) in item.slides" 
                                    :key="img.id"
                                    transition="slide-up"
                                    :src="img.url" 
                                    style="width: 160px; margin: 1%;"
                                    ratio="1"
                                    spinner-color="white"
                                    class="rounded-borders cursor-pointer"

                                >
                                </q-img>
                            </div>
                        </q-chat-message>
                        <span  class="text-time " style="padding-left: 50px;">{{convertTime(item.createdAt)}}</span>
                    </div>
                    <div v-else>
                         <q-chat-message
                            :name="item.name"
                            :avatar="item.avatar"
                            bg-color="mess"
                            text-color="text-color"
                            >
                        
                            <div v-if="item.images != ''" style="width: -webkit-fill-available; cursor:pointer;" @click="funciones.openView(item.slides)">
                                <q-img
                                    v-for="(img) in item.slides" 
                                    :key="img.id"
                                    transition="slide-up"
                                    :src="img.url" 
                                    style="width: 160px; margin: 1%;"
                                    ratio="1"
                                    spinner-color="white"
                                    class="rounded-borders cursor-pointer"
                                >
                                </q-img>
                            </div>
                        </q-chat-message>
                        <span  class="text-time " style="padding-left: 50px;">{{convertTime(item.createdAt)}}</span>
                    </div>
                </div>
            </div>
        </q-infinite-scroll>
    </div>
</template>

<script src="./index.js">
</script>

<style lang="stylus" >
@import './index.styl';
</style>
