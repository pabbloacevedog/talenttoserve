<template>
	<q-layout view="hHh lpR fFf">
		<q-header>
			<q-toolbar
				:class="{ change_color: scrollPosition > 50 }"
				elevated
				style="padding-right: 0px; padding-left: 8px"
			>
				<q-btn
					dense
					flat
					round
					icon="menu"
					@click="mostrar_drawer()"
					v-if="$q.platform.is.mobile"
				/>
				<q-btn
					style="margin-left: 12px"
					flat
					round
					class="q-mr-sm"
					@click="irPublic"
				>
					<img
						style="max-height: 40px"
						:src="src_logo"
						@click="irPublic"
					/>
				</q-btn>
				<div class="titulo_bar" v-if="$q.platform.is.desktop">
					Talent to serve
				</div>
				<q-toolbar-title
					v-if="$q.platform.is.desktop"
					class="row justify-center"
				>
				</q-toolbar-title>
				<div v-for="(menuItem, index) in menu" :key="index">
					<q-item
						clickable
						v-ripple
						v-if="$q.platform.is.desktop"
						:active="link === menuItem.tag"
						:to="menuItem.tag"
						@click="scrollToElement(menuItem)"
						class="font_bar"
					>
						<q-item-section class="n_usuario font_bar">{{
							menuItem.name
						}}</q-item-section>
					</q-item>
				</div>
				<div v-if="isLogin" class="n_usuario">
					<q-chip
						v-if="isAdmin"
						outline
						@click="irAdmin"
						clickable
						color="green"
						text-color="white"
						class="chip-menu"
						icon="settings"
					>
						Administración
					</q-chip>
					<q-chip
						outline
						removable
						@remove="logout"
						color="deep-orange"
						text-color="white"
						class="chip-menu"
					>
						{{ nombre }}
					</q-chip>
				</div>
				<div v-else class="n_usuario">
					<q-chip
						outline
						@click="irRegistro"
						clickable
						color="green"
						text-color="white"
						class="chip-menu"
						icon="person_add"
					>
						Registrarse
					</q-chip>
					<q-chip
						@click="login"
						outline
						clickable
						color="deep-orange"
						text-color="white"
						class="chip-menu"
						icon="person"
					>
						Iniciar sesión
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
		<q-drawer
			v-if="$q.platform.is.mobile"
			v-model="mostrarDrawer"
			side="left"
			:width="200"
			:breakpoint="500"
			color="text"
			class="drawer_list_public"
			:mini="false"
		>
			<q-list class="menu_list_public">
				<div
					v-for="(menuItem, index) in menu"
					:key="index"
					class="menu_item"
				>
					<q-item
						clickable
						v-ripple
						:active="link === menuItem.tag"
						:to="menuItem.tag"
						@click="scrollToElement(menuItem)"
					>
						<q-item-section
							avatar
							style="min-width: 24px !important;"
						>
							<q-icon :name="menuItem.icon" />
						</q-item-section>
						<q-item-section class="n_usuario font_bar">{{
							menuItem.name
						}}</q-item-section>
					</q-item>
				</div>
			</q-list>
		</q-drawer>
		<q-page-container
			style="padding-top: 0px !important;padding-left:0px !important;"
		>
			<q-page>
				<router-view />
			</q-page>
		</q-page-container>
	</q-layout>
</template>

<script src="./index.js"></script>

<style lang="stylus">
@import './index.styl';
</style>
