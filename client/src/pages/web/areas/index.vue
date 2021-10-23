<template>
    <div class="div_fondo_areas row">
        <div class="col-6 div_cont">
            <div class="column flex-center titulo-areas text-white">
                ÁREAS DE SERVICIO
            </div>
            <div class="row">
                <div class="col-6">
                    <q-card class="my-card card-areas text-white">
                        <q-card-section class="card-titulo">
                            <div>OPORTUNIDADES LABORALES</div>
                        </q-card-section>
                        <q-card-section class="q-pt-none">
                            <ul className="p-none">
                                <li className="li_areas">
                                    Encuentra en esta sección todos los avisos
                                    que los hoteles publican.
                                </li>
                            </ul>
                        </q-card-section>
                    </q-card>
                </div>
                <div class="col-6">
                    <q-card class="my-card card-areas text-white">
                        <q-card-section class="card-titulo">
                            <div>HEADHUNTING</div>
                        </q-card-section>
                        <q-card-section class="q-pt-none">
                            <ul className="p-none">
                                <li className="li_areas">
                                    Reclutamiento y Headhunting especializado en
                                    el sector hotelero
                                </li>
                            </ul>
                        </q-card-section>
                    </q-card>
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <q-card class="my-card card-areas text-white">
                        <!--                         <q-card-section class="avatar-sect">
                            <q-avatar class="avatar-cont">
                                <img :src="icon_consultoria" size="md">
                            </q-avatar>
                        </q-card-section> -->
                        <q-card-section class="card-titulo">
                            <div>CONSULTORIA INTEGRAL HOTELERA</div>
                        </q-card-section>
                        <q-card-section class="q-pt-none">
                            <ul className="p-none">
                                <li className="li_areas">Habitaciones</li>
                                <li className="li_areas">
                                    Alimentos y Bebidas
                                </li>
                                <li className="li_areas">
                                    Finanzas, Compras y Costos
                                </li>
                                <li className="li_areas">
                                    Gestión de Personas
                                </li>
                                <li className="li_areas">Análisis Técnico</li>
                                <li className="li_areas">
                                    Ventas, Marketing y Revenue Management
                                </li>
                                <li className="li_areas">Gestión de Calidad</li>
                            </ul>
                        </q-card-section>
                    </q-card>
                </div>
                <div class="col-6">
                    <q-card class="my-card card-areas text-white">
                        <q-card-section class="card-titulo">
                            <div>CLIENTE INCÓGNITO</div>
                        </q-card-section>
                        <q-card-section class="q-pt-none">
                            <ul className="p-none">
                                <li className="li_areas">Mistery Guest</li>
                                <li className="li_areas">
                                    Evaluación de Estándares
                                </li>
                                <li className="li_areas">
                                    Entrega de Evidencia
                                </li>
                            </ul>
                        </q-card-section>
                    </q-card>
                </div>
            </div>
        </div>
        <div class="col-6">
            <img :src="src_persona" style="height: 111vh" />
        </div>
    </div>
    <!-- <q-parallax style="height: 100vh;">
        <template v-slot:media>
            <img :src="src_fondo">
        </template>

        <template v-slot:>

        </template>
    </q-parallax> -->
</template>

<script src="./index.js">
</script>

<style lang="stylus" >
@import './index.styl';
</style>
