<template>
	<q-layout view="hHh lpR fFf">

		<q-header >
			<q-toolbar  :class="{change_color: scrollPosition > 50}" elevated style="padding-right: 0px; padding-left:8px" >
				<q-btn style="margin-left: 12px;" flat round class="q-mr-sm">
					<img style="max-height: 40px;" :src="src_logo" @click="ir_home"/>
				</q-btn>
                <div class="titulo_bar">Talent to serve</div>
				<q-toolbar-title v-if="$q.platform.is.desktop" class="row justify-center">
				</q-toolbar-title>
                <div v-for="(menuItem, index) in menu" :key="index" >
                        <q-item
                            clickable
                            v-ripple
                            :active="link === menuItem.tag"
                            :to="menuItem.tag"
                            @click="scrollToElement(menuItem.tag)"
                            class="font_bar"
                            >
                        <q-item-section class="n_usuario font_bar">{{ menuItem.name }}</q-item-section>
                    </q-item>
                </div>
                <div v-if="isLogin" class="n_usuario" style="right: 15px;position: absolute;">
                    <q-chip removable @remove="logout" color="red" text-color="white" style="padding: 16px;">
                        {{nombre}}
                    </q-chip>
                </div>
                <div class="espacio-derecho-menu">
                    <!-- <q-btn icon="close" color="red" dark flat round @click="logout">
                        <q-tooltip content-class="tooltip-menu" :offset="[10, 10]">
                            Salir
                        </q-tooltip>
                    </q-btn> -->
                </div>
			</q-toolbar>
		</q-header>

        <q-page-container style="padding-top: 0px !important;">
            <q-page>
                <router-view />
            </q-page>
		</q-page-container>

		</q-layout>
</template>

<script src="./index.js">
</script>

<style lang="stylus" >
	@import './index.styl'
</style>
