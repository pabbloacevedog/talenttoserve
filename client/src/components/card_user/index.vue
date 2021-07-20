<template>
    <div class="todo row cursor-pointer" style="height: 60px;">
        <q-card  flat class="todo fondo_card_user">
            <q-card-section style="padding: 15px 5px 5px 5px !important;">
                <div v-if="$q.platform.is.mobile">
                    <q-avatar size="150px">
                        <img :src="item.avatar_user" />
                    </q-avatar>
                    <div class="button-container-mb">
                        <q-btn
                            v-if="item.itsme"
                            icon="add"
                            color="info"
                            flat
                            round
                            class="text-white"
                            @click="openDialog"
                            style="background-color: aqua;"
                            size="md"
                        >
                            <q-tooltip
                                content-class="tooltip-menu"
                                :offset="[10, 10]"
                            >Cambiar foto de perfil</q-tooltip>
                        </q-btn>
                    </div>
                    <div class="text-h6 f_comfortaa mas_top">{{item.name}}</div>
                </div>
                <div v-else >
                    <div size="170px">
                        <img :src="item.avatar_user" class="avatar_user"/>
                    </div>
                    <div class="button-container">
                        <q-btn
                            v-if="item.itsme"
                            icon="add"
                            color="info"
                            flat
                            round
                            class="text-white"
                            @click="openDialog"
                            style="background-color: aqua;"
                        >
                            <q-tooltip
                                content-class="tooltip-menu"
                                :offset="[10, 10]"
                            >Cambiar foto de perfil</q-tooltip>
                        </q-btn>
                    </div>
                    <div class="text-h6 f_roboto_l text-username">@{{item.username}}</div>
                    <!-- <div class="text-h6 f_comfortaa mas_top">{{item.name}}</div> -->
                </div>
            </q-card-section>
            <q-card-section class="col-4 info-user" style="padding: 0px;">
                <div class="text-h6 f_comfortaa mas_top">{{item.name}}</div>
                <div class="row" style="max-width: 300px;">
                    <div class="col"  >
                        <div class="text-h6 q-mt-sm q-mb-xs text-bold f_big_john">{{item.n_posts}}</div>
                        <div class="text-h7 text-bold f_sofia">POST</div>
                    </div>
                    <div class="col cursor-pointer" @click="funciones.view_followers">
                        <div class="text-h6 q-mt-sm q-mb-xs text-bold f_big_john">{{item.followers}}</div>
                        <div class="text-h7 text-bold f_sofia">SEGUIDORES</div>
                    </div>
                    <div class="col cursor-pointer" @click="funciones.view_follows">
                        <div class="text-h6 q-mt-sm q-mb-xs text-bold f_big_john">{{item.follows}}</div>
                        <div class="text-h7 text-bold f_sofia">SEGUIDOS</div>
                    </div>
                </div>
                <div class="text-h6 mas_top f_sofia">{{item.review}}</div>
                <div class="mas_top" v-if="item.itsme">
                    <q-btn
                        icon="settings"
                        rounded
                        label="Editar perfil"
                        style="min-width: 130px;"
                        class="q-mr-sm text-white btn_settings"
                        @click="edit_profile"
                    />
                </div>
                <div v-else>
                    <div v-if="item.following">
                        <q-btn
                            rounded
                            color="info"
                            label="Dejar de seguir"
                            style="min-width: 130px;"
                            class="q-mr-sm text-white"
                            @click="funciones.unfollow"
                        />
                    </div>
                    <div v-else>
                        <q-btn
                            rounded
                            color="info"
                            label="Seguir"
                            style="min-width: 130px;"
                            class="q-mr-sm text-white"
                            @click="funciones.follow"
                        />
                    </div>
                </div>
            </q-card-section>
            <div></div>
            <q-card-section class="q-pt-xs"></q-card-section>
        </q-card>
    </div>
</template>

<script src="./index.js">
</script>

<style lang="stylus" >
@import './index.styl';
</style>
