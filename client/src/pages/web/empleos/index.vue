<template>
	<div
		class="div_fondo_op row"
		style="padding-top: 50px;padding-left: 5px;"
	>
		<q-dialog persistent width="800" v-model="modal_ver_mas">
			<q-card
				class="my-card text-white card-empleos modales"
				style=" max-width: 60vw; max-height:90vh"
			>
				<q-card-section class="q-pb-none">
					<div class="text-overline">
						{{ info.hotel }}
					</div>
				</q-card-section>
				<q-card-section horizontal>
					<q-card-section class="q-pt-xs">
						<div class="text-h5 q-mt-sm q-mb-xs">
							{{ info.cargo }}
						</div>
						<div class="text-h7 text-grey">
							{{ info.descripcion }}
						</div>
					</q-card-section>

					<q-card-section class="col-4 flex flex-center" style="b">
						<q-img
							class="rounded-borders"
							:src="mostrar_banner(info.banner)"
							:id="info.codigo"
						/>
					</q-card-section>
				</q-card-section>
				<q-card-section class="q-pt-xs">
					{{ info.link }}
				</q-card-section>
				<q-card-section class="q-pt-none">
					{{ info.hotel }}
				</q-card-section>
				<q-card-section class="q-pt-none" :to="info.web">
					{{ info.web }}
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
			<div class="q-pa-sm filtros_op">
				<template class="buscador">
					<div class="text-h5 q-pl-xs" style="color: #ff4d24;">
						{{ parametros_tabla.title }}
					</div>
					<q-input
						dense
						standout
						required
						v-model="parametros_tabla.filter"
						rounded
						placeholder="Buscar"
						class="q-py-lg"
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
				:selected.sync="parametros_tabla.selected"
				:pagination.sync="parametros_tabla.pagination"
				:filter="parametros_tabla.filter"
			>
				<template v-slot:item="props">
					<div class="q-pa-sm col-xs-12 col-sm-12 col-md-12">
						<q-card
							class="my-card text-white card-empleos"
							flat
							bordered
						>
							<q-card-section horizontal>

								<!-- <div :style="{ background:  + props.row.color }"> -->
									<q-img
										:ref="props.row.codigo"
										class="col-2 contorno-img"
										:src="mostrar_banner(props.row.banner)"
										:style="
											`border-radius: 24px; max-height: 146px;min-height: 146px; border: white 11px solid;    background: white;`
										"
									/>
									{{props.row.color}}
								<!-- </div> -->
								<q-card-section class="row">
									<div
										class="col-12 text-h7"
										style="font-weight: 600;"
									>
										{{ props.row.hotel }}
									</div>
									<div
										class="col-12 q-py-xs"
										style="color: #98b1b9;"
									>
										{{ truncate(props.row.descripcion) }}
									</div>
									<div
										class="col-12 text-subtitle2"
										style="font-size: 0.74rem; color: cyan;"
									>
										{{ props.row.link }}
									</div>
								</q-card-section>
								<q-card-actions align="right">
									<q-chip
										@click="ir_web(props.row.web)"
										clickable
										dense
										color="primary"
										text-color="white"
										icon-right="directions"
									>
										{{ props.row.web }}
									</q-chip>
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
							</q-card-section>
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
