<template>
    <div class="row">
        <!-- <div class="col col-4 col-md-4 text-h4 f_sofia" align="left" style="padding-bottom: 5%;">
            <q-avatar>
                <img :src="src_avatar" />
            </q-avatar>
        </div> -->
        <div
            class="col col-12 col-md-12 text-h4 f_sofia"
            align="center"
            style="padding-bottom: 4%; color:white;"
            color="white"
        >+ Crear Publicación</div>
        <div class="col col-12 col-md-12" >
            <q-card class="card-post nuevo_post" id="new_post">
                <q-card-section></q-card-section>

                <q-card-section>
                    <q-input
                        type="textarea"
                        rounded
                        outlined
                        dense
                        standout
                        required
                        label="Texto..."
                        v-model="text"
                        class="q-ml-md input-post"
                    />
                    <center>
                        <q-input
                            rounded
                            outlined
                            @input="val => { files = val }"
                            multiple
                            type="file"
                            class="q-ml-md input-file"
                        >
                            <template v-slot:append>
                                <q-icon name="attach_file" />
                            </template>
                        </q-input>
                    </center>
                </q-card-section>
                <q-card-actions vertical align="center" style="padding-bottom: 3%;">
                    <q-btn
                        rounded
                        outlined
                        v-close-popup
                        color="info"
                        label="Upload"
                        @click="upload"
                        style="width: 150px;"
                    />
                </q-card-actions>
            </q-card>
        </div>
    </div>
</template>

<script src="./index.js">
</script>

<style lang="stylus" >
@import './index.styl';
</style>
