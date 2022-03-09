<template>
	<q-layout view="hHh lpR fFf">
		<q-header>
			<q-toolbar
				:class="{ change_color: scrollPosition > 50 }"
				elevated
				style="padding-right: 0px; padding-left:8px"
			>
				<q-btn
					dense
					flat
					round
					icon="menu"
					@click="mostrarDrawer = !mostrarDrawer"
				/>
				<q-btn style="margin-left: 12px;" flat round class="q-mr-sm">
					<img
						style="max-height: 40px;"
						:src="src_logo"
						@click="ir_home"
					/>
				</q-btn>
				<div class="titulo_bar" v-if="$q.platform.is.desktop">Talent to serve</div>
				<q-toolbar-title
					v-if="$q.platform.is.desktop"
					class="row justify-center"
				>
				</q-toolbar-title>
				<div class="n_usuario" style="right: 15px;position: absolute;">
					<q-chip
						@click="irPublic"
						clickable
						icon="home"
						color="green"
						text-color="white"
						style="padding: 14px;"
					>
						Home
					</q-chip>
					<q-chip
						removable
						@remove="logout"
						color="red"
						text-color="white"
						style="padding: 14px;"
					>
						{{ nombre }}
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
			v-model="mostrarDrawer"
			side="left"
			:width="200"
			:breakpoint="500"
			color="text"
			class="drawer_list_public"
			show-if-above
			:mini="miniState"
			@mouseover="miniState = false"
			@mouseout="miniState = true"
		>
			<q-list class="menu_list">
				<div
					v-for="(menuItem, index) in menuList"
					:key="index"
					class="menu_item_public"
				>
					<q-item
						clickable
						v-ripple
						:active="link === menuItem.path"
						:to="menuItem.path"
						@click="link = menuItem.path"
					>
						<q-item-section
							avatar
							style="min-width: 24px !important;"
						>
							<q-icon :name="menuItem.icon" />
						</q-item-section>
						<q-item-section class="n_usuario">{{
							menuItem.name
						}}</q-item-section>
					</q-item>
				</div>
			</q-list>
		</q-drawer>
		<q-page-container class="color-container">
			<q-page padding>
				<router-view />
			</q-page>
		</q-page-container>
	</q-layout>
</template>
<script src="./menu.js"></script>
<style lang="stylus">
@import './menu.styl'
</style>
