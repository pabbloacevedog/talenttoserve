<template>
    <div style="max-width: 100%">
        <center>
            <div v-for="(item, index) in items" :key="item.id_post">
                <CardPost :item="item" :index="index" :ss_u="ss_u" :funciones="funciones"></CardPost>
            </div>
        </center>
    </div>
</template>

<script src="./index.js">
</script>

<style lang="stylus" >
	@import './index.styl'
</style>
