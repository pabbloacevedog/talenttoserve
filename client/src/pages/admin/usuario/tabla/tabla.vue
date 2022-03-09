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
								col => col.name !== 'usuario_id'
							)"
							:key="col.name"
						>
							<q-item-section>
								<q-item-label>{{ col.label }}</q-item-label>
							</q-item-section>
							<q-item-section side>
								<q-item-label
									caption
									v-if="col.name == 'suscrito_mail'"
								>
									<q-chip
										size="sm"
										v-if="col.value"
										class="activo"
										text-color="white"
									>
										SI
									</q-chip>
									<q-chip
										size="sm"
										v-else
										class="inactivo"
										text-color="white"
									>
										NO
									</q-chip>
								</q-item-label>
								<q-item-label
									caption
									v-else-if="col.name !== 'estado'"
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
		<template v-slot:body="props">
			<q-tr
				:props="props"
				v-on:dblclick="funciones.editar_fila(props.row.usuario_id)"
			>
				<q-td auto-width>
					<q-checkbox
						size="sm"
						color="accent"
						v-model="props.selected"
					/>
				</q-td>
				<q-td key="nombre" :props="props"
					>{{ props.row.nombre
					}}<q-tooltip v-if="props.row.nombre">{{
						props.row.nombre
					}}</q-tooltip></q-td
				>
				<q-td key="email" :props="props"
					>{{ props.row.email }}
					<q-tooltip v-if="props.row.email">{{
						props.row.email
					}}</q-tooltip></q-td
				>
				<q-td key="perfil" :props="props"
					>{{ props.row.perfil
					}}<q-tooltip v-if="props.row.perfil">{{
						props.row.perfil
					}}</q-tooltip></q-td
				>
				<q-td key="telefono" :props="props"
					>{{ props.row.telefono
					}}<q-tooltip v-if="props.row.telefono">{{
						props.row.telefono
					}}</q-tooltip></q-td
				>
				<q-td key="pais" :props="props"
					>{{ props.row.pais
					}}<q-tooltip v-if="props.row.pais">{{
						props.row.pais
					}}</q-tooltip></q-td
				>
				<q-td key="nombre_empresa" :props="props"
					>{{ props.row.nombre_empresa
					}}<q-tooltip v-if="props.row.nombre_empresa">{{
						props.row.nombre_empresa
					}}</q-tooltip></q-td
				>
				<q-td key="cargo" :props="props"
					>{{ props.row.cargo
					}}<q-tooltip v-if="props.row.cargo">{{
						props.row.cargo
					}}</q-tooltip></q-td
				>
				<q-td key="producto_empresa" :props="props"
					>{{ props.row.producto_empresa
					}}<q-tooltip v-if="props.row.producto_empresa">{{
						props.row.producto_empresa
					}}</q-tooltip></q-td
				>
				<q-td key="universidad" :props="props"
					>{{ props.row.universidad
					}}<q-tooltip v-if="props.row.universidad">{{
						props.row.universidad
					}}</q-tooltip></q-td
				>
				<q-td key="carrera" :props="props"
					>{{ props.row.banner
					}}<q-tooltip v-if="props.row.carrera">{{
						props.row.carrera
					}}</q-tooltip></q-td
				>
				<q-td
					key="suscrito_mail"
					:props="props"
					v-if="props.row.suscrito_mail"
				>
					<q-btn
						unelevated
						rounded
						class="activo"
						color="accent"
						size="xs"
						label="Suscrito"
					/>
				</q-td>
				<q-td key="suscrito_mail" :props="props" v-else>
					<q-btn
						unelevated
						rounded
						class="inactivo"
						color="accent"
						size="xs"
						label="No"
					/>
				</q-td>
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
