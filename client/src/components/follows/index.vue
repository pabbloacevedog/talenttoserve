<template>
    <div class="todo">
        <q-card style="width: 300px">
            <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">Siguiendo</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>
            <q-card-section v-for="us in list_follow" :key="us.uuid_user" class="cursor-pointer">
                <q-avatar>
                    <img v-if="us.avatar" :src="base + us.avatar" @click="funciones.goProfile(us.username)">
                    <img v-else :src="avatar_default" @click="funciones.goProfile(us.username)">
                </q-avatar>
                <label class="espacio-izquierdo" @click="funciones.goProfile(us.username)">{{us.username}}</label>
            </q-card-section>
        </q-card>
    </div>
</template>

<script src="./index.js">
</script>

<style lang="stylus" >
@import './index.styl';
</style>

            // <q-btn flat round size="xs" icon="fas fa-at">
            // </q-btn>
