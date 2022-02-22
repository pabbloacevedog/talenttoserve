<template>
	<div
		class="row"
		style="padding-top: 50px;"
		:style="{ backgroundImage: 'url(' + src_fondo + ')' }"
	>
		<div class="col-3">
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
							<q-card-section class="q-pb-none">
								<div class="text-overline">
									{{ truncate_hotel(props.row.hotel) }}
								</div>
							</q-card-section>
							<q-card-section class="q-pb-none q-pt-none">
								<div class="text-h6">
									{{ truncate_cargo(props.row.cargo) }}
								</div>
							</q-card-section>
							<q-card-section horizontal>
								<q-card-section class="col-12 flex flex-center">
									<q-img
										:src="mostrar_banner(props.row.banner)"
										style="border-radius: 25px; max-height: 230px;min-height: 230px;"
									/>
								</q-card-section>
							</q-card-section>
							<q-card-section class="q-pt-xs">
								<div class="text-caption">
									{{ truncate(props.row.descripcion) }}
								</div>
							</q-card-section>
							<q-card-section class="q-pt-xs">
								{{ props.row.link }}
							</q-card-section>
							<q-card-section class="q-pt-none">
								{{ props.row.hotel }}
							</q-card-section>
							<q-card-section class="q-pt-none">
								{{ props.row.web }}
							</q-card-section>
							<q-separator />

							<q-card-actions>
								<q-chip
									@click="mostrar_modal"
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
