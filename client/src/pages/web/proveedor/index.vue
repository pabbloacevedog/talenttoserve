<template>
	<div class="div_fondo_op row" style="padding-top: 50px;">
		<q-dialog
			persistent
			v-model="modal_ver_mas"
			class="dialog-empleos"
			style="padding: 0 !important;"
		>
			<q-card class="my-card text-white card-dialog-empleos">
				<q-card-section class="q-pb-none q-px-xl">
					<div class="text-overline">
						{{ info.direccion }}
					</div>
				</q-card-section>
				<q-card-section horizontal v-if="$q.platform.is.desktop">
					<q-card-section class="q-pt-xs q-px-xl">
						<div class="text-h4 q-mt-sm q-mb-md">
							{{ info.proveedor }}
						</div>
						<div class="desc_empleo">
							{{ info.descripcion }}
						</div>
					</q-card-section>

					<q-card-section
						class="col-4 flex flex-center q-px-xl"
						style="b"
					>
						<q-img
							class=" contorno-img"
							:style="
								`border-radius: 24px; max-height: 20vh;min-height: 20vh; border: white 11px solid;    background: white;`
							"
							:src="mostrar_banner(info.banner)"
							:id="info.codigo"
						/>
					</q-card-section>
				</q-card-section>
				<q-card-section v-else class="q-py-xs">
					<q-card-section
						class="col-4 flex flex-center q-px-xs"
						style="b"
					>
						<q-img
							class=" contorno-img"
							:style="
								`border-radius: 24px; max-height: 20vh;min-height: 20vh; border: white 11px solid;    background: white;`
							"
							:src="mostrar_banner(info.banner)"
							:id="info.codigo"
						/>
					</q-card-section>
					<q-card-section class="q-pt-xs q-px-xs">
						<div class="text-h4 q-mt-sm q-mb-md">
							{{ info.proveedor }}
						</div>
						<div class="desc_empleo_mobile">
							{{ info.descripcion }}
						</div>
					</q-card-section>
				</q-card-section>
				<q-card-section class="q-pt-xs q-px-xl">
					<div style="color: #8ab4f8;">
						{{ info.email }}
					</div>
				</q-card-section>
				<q-card-section class="q-pt-none q-px-xl" :to="info.web">
					<q-chip
						@click="ir_web(info.web)"
						clickable
						color="info"
						text-color="white"
						icon-right="directions"
						v-if="info.web"
					>
						{{ info.web }}
					</q-chip>
				</q-card-section>
				<q-separator />

				<q-card-actions align="right">
					<q-chip
						@click.native="modal_ver_mas = false"
						clickable
						text-color="white"
						class="ver_mas"
						style="padding: 16px;"
					>
						Aceptar
					</q-chip>
				</q-card-actions>
			</q-card>
		</q-dialog>
		<div class="col-3 col-xs-12 col-md-3">
			<transition appear enter-active-class="animated fadeInLeft">
				<div class="q-pa-sm filtros_op">
					<template class="buscador">
						<div
							class="q-pl-xs"
							style="color: #ffffff; font-size: 1.6vw;"
							v-if="$q.platform.is.desktop"
						>
							{{ parametros_tabla.title }}
						</div>
						<div
							v-else
							class="q-pl-xs"
							style="color: #ffffff; font-size: 5.5vw;"
						>
							{{ parametros_tabla.title }}
						</div>
						<q-input
							dense
							standout
							required
							dark
							rounded
							v-model="parametros_tabla.filter"
							placeholder="Buscar"
							style="color: #ffffff;"
							class="q-py-lg"
						>
							<template v-slot:append class="">
								<q-icon class="icon-buscar" name="search" />
							</template>
						</q-input>
						<q-space />
						<p>Filtrar por:</p>
						<q-select
							dense
							standout
							dark
							rounded
							clearable
							v-model="filtro_proveedor"
							:options="proveedors"
							label="Proveedor"
							class="q-py-md"
							@input="filtrar(filtro_proveedor, 'proveedor')"
						/>
						<q-select
							dense
							standout
							dark
							rounded
							clearable
							v-model="filtro_direccion"
							:options="direcciones"
							label="Direccion"
							class="q-py-md"
							@input="filtrar(filtro_direccion, 'direccion')"
						/>
						<q-space />
						<q-select
							dense
							standout
							dark
							rounded
							clearable
							v-model="filtro_web"
							:options="webs"
							label="Web"
							class="q-py-md"
							@input="filtrar(filtro_web, 'web')"
						/>
						<q-select
							dense
							standout
							dark
							rounded
							clearable
							v-model="filtro_email"
							:options="emails"
							label="Email"
							class="q-py-md"
							@input="filtrar(filtro_email, 'email')"
						/>
					</template>
				</div>
			</transition>
		</div>
		<div class="col-9 col-xs-12 col-md-9">
			<transition appear enter-active-class="animated fadeInRight">
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
					:filter-method="filtrar_datos"
					style="margin-right: 1%"
				>
					<template v-slot:item="props">
						<div class="q-pa-sm col-xs-12 col-sm-12 col-md-12">
							<q-card
								class="my-card text-white card-empleos"
								flat
								bordered
							>
								<q-card-section
									horizontal
									v-if="$q.platform.is.desktop"
								>
									<!-- <div :style="{ background:  + props.row.color }"> -->
									<q-img
										:ref="props.row.codigo"
										class="col-2 contorno-img"
										:src="mostrar_banner(props.row.banner)"
										:style="
											`border-radius: 24px; max-height: 146px;min-height: 146px; border: white 11px solid;    background: white;`
										"
									/>
									{{ props.row.color }}
									<!-- </div> -->
									<q-card-section class="row q-px-md q-pb-xs" style="    padding-top: 8px;">
										<div
											class="col-12 text-h7"
											style="font-weight: 600;"
										>
											{{ truncate_proveedor(props.row.proveedor) }}
										</div>
										<div
											class="col-12" style="font-size: 0.8em;"
										>
											{{ props.row.direccion }}
										</div>
										<div
											class="col-12 q-py-xs"
											style="color: #9babc1;"
										>
											{{
												truncate(props.row.descripcion)
											}}
										</div>
										<div
											class="col-12 text-subtitle2"
											style="font-size: 0.74rem; color: #8ab4f8;"
										>
											{{ props.row.email }}
										</div>
									</q-card-section>
									<q-card-actions align="right">
										<q-chip
											@click="ir_web(props.row.web)"
											clickable
											color="info"
											text-color="white"
											icon-right="directions"
											v-if="props.row.web"
										>
											{{ truncate_web(props.row.web) }}
										</q-chip>
										<q-chip
											@click="ver_mas(props.row)"
											clickable
											text-color="white"
											class="ver_mas"
											style="padding: 16px;"
										>
											Ver más
										</q-chip>
									</q-card-actions>
								</q-card-section>
								<q-card-section v-else>
									<!-- <div :style="{ background:  + props.row.color }"> -->
									<q-img
										:ref="props.row.codigo"
										class="col-2 contorno-img"
										:src="mostrar_banner(props.row.banner)"
										:style="
											`border-radius: 24px; max-height: 146px;min-height: 146px; border: white 11px solid;    background: white;`
										"
									/>
									{{ props.row.color }}
									<!-- </div> -->
									<q-card-section class="row">
										<div
											class="col-12 text-h7"
											style="font-weight: 600;"
										>
											{{ props.row.direccion }}
										</div>
										<div
											class="col-12 q-py-xs"
											style="color: #9babc1;"
										>
											{{
												truncate(props.row.descripcion)
											}}
										</div>
										<div
											class="col-12 text-subtitle2"
											style="font-size: 0.74rem; color: #8ab4f8;"
										>
											{{ props.row.email }}
										</div>
									</q-card-section>
									<q-card-actions align="right">
										<q-chip
											@click="ir_web(props.row.web)"
											clickable
											color="info"
											text-color="white"
											icon-right="directions"
											v-if="props.row.web"
										>
											{{ truncate_web(props.row.web) }}
										</q-chip>
										<q-chip
											@click="ver_mas(props.row)"
											clickable
											text-color="white"
											class="ver_mas"
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
			</transition>
		</div>
	</div>
</template>

<script src="./index.js"></script>

<style lang="stylus">
@import './index.styl'
</style>
