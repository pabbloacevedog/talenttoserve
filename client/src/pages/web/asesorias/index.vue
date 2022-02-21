<template>
	<div
		class="div_fondo_op row"
		style="padding-top: 50px;padding-left: 5px;;background-size: cover;height: 100vh;"
		:style="{ backgroundImage: 'url(' + src_fondo + ')' }"
	>
		<q-dialog persistent width="800" v-model="modal_ver_mas">
			<q-card
				class="my-card text-white card-empleos modales"
				style=" max-width: 60vw; max-height:90vh"
			>
				<q-card-section horizontal>
					<q-card-section class="q-pt-xs">
						<div class="text-h5 q-mt-sm q-mb-xs">{{ info.titulo }}</div>
						<div class="text-h7 text-grey">
							{{ info.descripcion }}
						</div>
					</q-card-section>
				</q-card-section>
				<q-separator />
				<q-card-actions>
					<q-btn
						rounded
						@click.native="modal_ver_mas = false"
						color="accent"
						>Aceptar</q-btn
					>
				</q-card-actions>
			</q-card>
		</q-dialog>
		<div class="col-3">
			<div class="q-pa-sm filtros">
			<template class="buscador">
				<q-input
					dense
					standout
					required
					v-model="parametros_tabla.filter"
					rounded
					placeholder="Buscar"
				>
					<template v-slot:append>
						<q-icon name="search" />
					</template>
				</q-input>
				<q-space />
			</template>
			</div>
		</div>
		<div class="col-9">
			<q-table
				grid
				:card-container-class="cardContainerClass"
				:data="parametros_tabla.data"
				:columns="parametros_tabla.columns"
				:row-key="parametros_tabla.selectedkey"
				hide-header
				:rows-per-page-options="rowsPerPageOptions"
				:selected.sync="parametros_tabla.selected"
				:pagination.sync="parametros_tabla.pagination"
				:filter="parametros_tabla.filter"
			>
				<template v-slot:item="props">
					<div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
						<q-card class="my-card text-white card-empleos">
							<q-card-section class="q-pb-none q-pt-none">
								<div class="text-h6">
									{{ truncate_cargo(props.row.titulo) }}
								</div>
							</q-card-section>
							<q-card-section class="q-pt-xs">
								<div class="text-caption">
									{{ truncate(props.row.descripcion) }}
								</div>
							</q-card-section>
							<q-separator />

							<q-card-actions>
								<q-chip
									@click="ver_mas(props.row)"
									clickable
									color="green"
									text-color="white"
									style="padding: 16px;"
								>
									Ver más
								</q-chip>
							</q-card-actions>
						</q-card>
					</div>
				</template>
			</q-table>
		</div>
	</div>
</template>

<script src="./index.js"></script>

<style lang="stylus">
@import './index.styl'
</style>
