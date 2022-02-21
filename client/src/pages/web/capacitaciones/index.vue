<template>
	<div
		class="div_fondo_op row"
		style="padding-top: 50px;background-size: cover;height: 100vh;"
		:style="{ backgroundImage: 'url(' + src_fondo + ')' }"
	>
		<q-dialog persistent v-model="modal_ver_mas">
			<q-card class="card-dialog">
				<q-img :src="mostrar_banner(info.banner)" :ratio="16 / 9" />
				<q-card-section class="q-pa-lg ">
					<div class="text-h6 text-white">
						{{ limpiar_cargo(info.titulo) }}
					</div>
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
				:card-container-class="cardContainerClass"
				title="Capacitaciones"
				class="tabla_capacitaciones"
				:data="parametros_tabla.data"
				:columns="parametros_tabla.columns"
				row-key="name"
				:filter="parametros_tabla.filter"
				hide-header
				:pagination.sync="parametros_tabla.pagination"
				:rows-per-page-options="rowsPerPageOptions"
			>
				<template v-slot:top-right>
					<q-input
						borderless
						dense
						debounce="300"
						v-model="filter"
						placeholder="Buscar"
					>
						<template v-slot:append>
							<q-icon name="search"></q-icon>
						</template>
					</q-input>
				</template>
				<template v-slot:top-row>
					top row
					<q-tr>
						<q-td colspan="100%">
							Top row
						</q-td>
					</q-tr>
				</template>
				<template v-slot:item="props">
					<div class="q-pa-xs col-xs-12 col-sm-6 col-md-3">
						<q-card class="my-card card-capacitacion">
							<q-img :src="mostrar_banner(props.row.banner)">
								<div class="absolute-bottom back_info">
									<div
										class="text-h7"
										style="font-weight: 600;"
									>
										{{ truncate_cargo(props.row.titulo) }}
									</div>
									<div
										class="text-subtitle2"
										style="font-size: 0.74rem;"
									>
										{{ truncate(props.row.descripcion) }}
									</div>
								</div>
							</q-img>

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
				</template>
			</q-table>
		</div>
	</div>
</template>

<script src="./index.js"></script>

<style lang="stylus">
@import './index.styl'
</style>
