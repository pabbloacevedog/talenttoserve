<template>
	<div
		class="row"
		style="padding-top: 50px;background-size: cover;height: 100%;min-height: 100vh !important;background-color: #121212  !important;"
	>
		<q-dialog persistent width="800" v-model="modal_ver_mas">
			<q-card class="card-dialog">
				<q-card-section class="q-pa-lg" align="center">
					<div class="text-h6 text-white">
						{{ info.titulo }}
					</div>
				</q-card-section>
				<q-card-section class="q-pa-lg " align="center">
					<div class="text-subtitle2 text-blue-grey-4">
						{{ info.descripcion }}
					</div>
				</q-card-section>
				<q-card-actions align="right" class="q-pa-lg ">
					<q-btn
						rounded
						@click.native="modal_ver_mas = false"
						class="btn_aceptar"
						text-color="white"
						>Aceptar</q-btn
					>
				</q-card-actions>
			</q-card>
		</q-dialog>
		<div class="back_cap">
			<q-table
				grid
				card-class="bg-primary text-white"
				title="Asesorias"
				style="color: #ffffff;"
				class="tabla_capacitaciones"
				:data="parametros_tabla.data"
				:columns="parametros_tabla.columns"
				row-key="name"
				:pagination.sync="parametros_tabla.pagination"
				:filter="parametros_tabla.filter"
				hide-header
			>
				<template v-slot:top-right class="row">
					<q-input
						dense
						standout
						required
						dark
						rounded
						v-model="parametros_tabla.filter"
						placeholder="Buscar"
						class="buscador-as"
					>
						<template v-slot:append class="">
							<q-icon class="icon-buscar" name="search" />
						</template>
					</q-input>
				</template>
				<template v-slot:item="props">
					<transition appear enter-active-class="animated fadeInLeft">
					<div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
						<q-card class="my-card card-capacitacion">
							<q-card-section>
								<div class="text-h6 q-px-sm">
									{{ truncate_cargo(props.row.titulo) }}
								</div>
							</q-card-section>
							<q-card-section class="q-px-lg q-py-xs">
								<div class="text-caption">
									{{ truncate(props.row.descripcion) }}
								</div>
							</q-card-section>

							<q-card-actions align="right">
								<q-chip
									@click="ver_mas(props.row)"
									clickable
									class="ver_mas"
									text-color="white"
									style="padding: 16px;"
								>
									Ver más
								</q-chip>
							</q-card-actions>
						</q-card>
					</div>
					</transition>
				</template>
			</q-table>
			<div class="row justify-center q-mt-md">
				<q-pagination
					v-model="parametros_tabla.pagination.page"
					color="secondary"
					:max="pagesNumber"
					size="md"
				/>
			</div>
		</div>
	</div>
</template>

<script src="./index.js"></script>

<style lang="stylus">
@import './index.styl'
</style>
