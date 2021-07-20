<template>
    <div class="row separation contenedor-add">                
        <div v-if="$q.platform.is.mobile"  class="row col-md-12 col-lg-12 col-xl-12 add_message">
            <div class="col-10 input_message-mb"> 
                <q-input rounded outlined v-model="new_message" bg-color="primary" class="add_me" >
                    <template v-slot:prepend>
                        <q-btn round color="secondary" icon="fas fa-paperclip" size="md" @click="add_message()"/>
                    </template>
                </q-input>
                <input id="fileInput" @change="onFileChange" type="file" style="display:none;" @input="val => { files = val }" />

            </div>
            <div class="col-2 centrar" align="left"> 
                <q-btn round color="info" icon="fas fa-paper-plane" size="lg" @click="add_files()"/>
            </div>    
        </div>
        <div v-else  class="row col-md-12 col-lg-12 col-xl-12 add_message" align="center">
            <div class="col-10 input_message" align="center"> 
                <div v-if="url.length" class="contenedor-img">
                    <div v-for="(item) in url" :key="item" class="cont-img">
                        <img style="padding: 1%;"  :src="item" />
                        <q-btn class="delete_item" icon="highlight_off" @click="delete_file(item)" />
                    </div>
                </div>
                <q-input rounded outlined v-model="new_message" bg-color="primary" class="add_me" v-on:keyup.enter="add_message()" >
                    <template v-slot:prepend>
                       <q-fab
                            v-model="fab1"
                            color="secondary"
                            icon="add"
                            direction="right"
                            class="position_add"
                        >
                            <q-fab-action color="secondary" @click="add_files()" icon="far fa-image" />
                            <q-fab-action color="secondary" @click="onClick" icon="fas fa-paperclip" />
                            <q-fab-action color="secondary" @click="onClick" icon="fas fa-microphone" />
                            <q-fab-action color="secondary" @click="onClick" icon="room" />
                        </q-fab>
                        <!-- <q-btn round color="secondary" icon="fas fa-paperclip" size="md" @click="add_files()"/> -->
                    </template>
                </q-input>
                <!-- <input id="fileInput" type="file" multiple @change="onFileChange" style="display:none;" @input="val => { files = val }" /> -->
                <q-input
                    @input="val => { files = val }"
                    multiple
                    type="file"
                    class="fileInput"
                    style="display:none;"
                    @change="onFileChange" 
                >
                    <template v-slot:append>
                        <q-icon name="attach_file" />
                    </template>
                </q-input>
            </div>
            <div class="col-2 centrar" align="left"> 
                <q-btn round color="info" icon="fas fa-paper-plane" size="lg" class="fijo" @click="add_message()"/>
            </div>    
        </div>
    </div>
</template>

<script src="./index.js">
</script>

<style lang="stylus" >
@import './index.styl';
</style>
