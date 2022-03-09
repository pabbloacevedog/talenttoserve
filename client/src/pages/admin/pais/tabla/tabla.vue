<template>
	<q-table
		:title="parametros.tittle"
		:data="parametros.data"
		:columns="parametros.columns"
		:row-key="parametros.selectedkey"
		selection="multiple"
		:selected.sync="parametros.selected"
		:pagination.sync="parametros.pagination"
		:filter="parametros.filter"
		v-if="$q.platform.is.mobile"
		class="tabla_mobile"
		grid
	>
		<template v-slot:top-right>
			<q-input
				dense
				standout
				required
				v-model="parametros.filter"
				rounded
				placeholder="Buscar"
				class="buscar_mobile"
			>
				<template v-slot:append>
					<q-icon name="search" />
				</template>
			</q-input>
			<q-space />
			<q-btn
				size="md"
				class="color_icon_acciones"
				flat
				round
				dense
				icon="more_vert"
			>
				<q-tooltip>
					Acciones
				</q-tooltip>
				<q-menu
					content-class="bg-secondary m-accion"
					transition-show="jump-down"
					color="accent"
					transition-hide="jump-down"
				>
					<q-list bordered>
						<div v-for="(props, i) in parametros.acciones" :key="i">
							<q-item
								clickable
								v-ripple
								@click.native="funciones[props.cmd]()"
							>
								<q-item-section
									avatar
									style="min-width: 24px !important;"
								>
									<q-icon color="accent" :name="props.icon" />
								</q-item-section>

								<q-item-section color="accent">{{
									props.accion
								}}</q-item-section>
							</q-item>
						</div>
					</q-list>
				</q-menu>
			</q-btn>
			<q-space />
		</template>

		<template v-slot:item="props">
			<div
				class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
				:style="props.selected ? 'transform: scale(0.95);' : ''"
			>
				<q-card
					:class="
						props.selected
							? 'card_tabla_mobile_selected'
							: 'card_tabla_mobile'
					"
				>
					<q-card-section class="q-py-none q-px-xs">
						<q-checkbox
							size="sm"
							color="accent"
							v-model="props.selected"
						/>
					</q-card-section>
					<q-separator></q-separator>
					<q-list dense>
						<q-item
							v-for="col in props.cols.filter(
								col => col.name !== 'codigo'
							)"
							:key="col.name"
						>
							<q-item-section>
								<q-item-label>{{ col.label }}</q-item-label>
							</q-item-section>
							<q-item-section side>
								<q-item-label
									caption
									v-if="col.name !== 'estado'"
									>{{ col.value }}
									<q-tooltip>
										{{ col.value }}
									</q-tooltip>
								</q-item-label>
								<q-item-label caption v-else>
									<q-chip
										size="sm"
										v-if="col.value"
										class="activo"
										text-color="white"
									>
										Activo
									</q-chip>
									<q-chip
										size="sm"
										v-else
										class="inactivo"
										text-color="white"
									>
										Inactivo
									</q-chip>
								</q-item-label>
							</q-item-section>
						</q-item>
					</q-list>
				</q-card>
			</div>
		</template>
	</q-table>

	<q-table
		:title="parametros.tittle"
		:data="parametros.data"
		:columns="parametros.columns"
		:row-key="parametros.selectedkey"
		selection="multiple"
		class="tabla"
		:selected.sync="parametros.selected"
		:pagination.sync="parametros.pagination"
		:filter="parametros.filter"
		v-else
	>
		<template v-slot:top-right>
			<q-input
				dense
				standout
				required
				v-model="parametros.filter"
				rounded
				placeholder="Buscar"
			>
				<template v-slot:append>
					<q-icon name="search" />
				</template>
			</q-input>
			<q-space />
			<q-btn
				size="md"
				class="color_icon_acciones"
				flat
				round
				dense
				icon="more_vert"
			>
				<q-tooltip>
					Acciones
				</q-tooltip>
				<q-menu
					content-class="bg-secondary m-accion"
					transition-show="jump-down"
					color="accent"
					transition-hide="jump-down"
				>
					<q-list bordered>
						<div v-for="(props, i) in parametros.acciones" :key="i">
							<q-item
								clickable
								v-ripple
								@click.native="funciones[props.cmd]()"
							>
								<q-item-section
									avatar
									style="min-width: 24px !important;"
								>
									<q-icon color="accent" :name="props.icon" />
								</q-item-section>

								<q-item-section color="accent">{{
									props.accion
								}}</q-item-section>
							</q-item>
						</div>
					</q-list>
				</q-menu>
			</q-btn>
			<q-space />
		</template>
		<template v-slot:body="props">
			<q-tr
				:props="props"
				v-on:dblclick="funciones.editar_fila(props.row.codigo)"
			>
				<q-td auto-width>
					<q-checkbox
						size="sm"
						color="accent"
						v-model="props.selected"
					/>
				</q-td>
				<q-td key="titulo" :props="props"
					>{{ props.row.titulo
					}}<q-tooltip>{{ props.row.titulo }}</q-tooltip></q-td
				>
				<q-td key="descripcion" :props="props"
					>{{ props.row.descripcion }}
					<q-tooltip>{{ props.row.descripcion }}</q-tooltip></q-td
				>
				<q-td key="link" :props="props"
					>{{ props.row.link
					}}<q-tooltip>{{ props.row.link }}</q-tooltip></q-td
				>
				<q-td key="boton" :props="props"
					>{{ props.row.boton
					}}<q-tooltip>{{ props.row.boton }}</q-tooltip></q-td
				>
				<q-td key="banner" :props="props"
					>{{ props.row.banner
					}}<q-tooltip>{{ props.row.banner }}</q-tooltip></q-td
				>
				<q-td key="estado" :props="props" v-if="props.row.estado">
					<q-btn
						unelevated
						rounded
						class="activo"
						color="accent"
						size="xs"
						label="activo"
					/>
				</q-td>
				<q-td key="estado" :props="props" v-else>
					<q-btn
						unelevated
						rounded
						class="inactivo"
						color="accent"
						size="xs"
						label="Inactivo"
					/>
				</q-td>
			</q-tr>
		</template>
	</q-table>
</template>

<script src="./tabla.js"></script>
