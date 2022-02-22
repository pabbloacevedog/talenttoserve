<template>
	<div style="height: 100vh;background-color: #000000;" class="borroso row">
		<div class="col-12" style="height: 20px;padding-top: 2%;">
			<div class="column flex-center">
				<div class="text-white column flex-center titulo-historia">
					Nuestros Clentes
				</div>
			</div>
		</div>
		<div class="col-12">
			<div class="q-px-xl">
				<q-btn
					push
					color="teal"
					label="Trigger"
					@click="trigger"
					class="q-mb-md"
				/>

				<div class="q-gutter-md q-px-xl row items-start">
					<q-img
						v-for="transition in transitions"
						:key="transition"
						:transition="transition"
						:src="url"
						style="width: 200px"
						ratio="1"
						spinner-color="white"
						class="rounded-borders"
					>
						<div class="absolute-bottom text-center text-body2">
							{{ transition }}
						</div>
					</q-img>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./index.js"></script>

<style lang="stylus">
@import './index.styl'
</style>
