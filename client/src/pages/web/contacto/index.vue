<template>
    <div id="app">
        <div class="contenedor_cont_todo">
            <div
                class="row q-pa-xl"
                style="
                    padding-right: 150px;
                    height: 100vh !important;
                    padding-left: 150px;
                "
            >
                <div class="col-6 bloq_cont_iz">
                    <div class="contenedor_contacto_iz">
                        <div class="center">
                            <iframe
                                width="100%"
                                height="100%"
                                frameborder="0"
                                scrolling="no"
                                marginheight="0"
                                marginwidth="0"
                                style="border-radius: 25px;"
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6660.828640774345!2d-70.580622!3d-33.412441!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf22050497b1%3A0xc0cfbcec227d6fed!2sAv.+Apoquindo+4700%2C+Las+Condes%2C+Regi%C3%B3n+Metropolitana%2C+Chile!5e0!3m2!1ses-419!2scl!4v1456348255701"
                            >
                            </iframe>
                        </div>
                    </div>
                </div>
                <div class="col-6 bloq_cont_der">
                    <center>
                        <q-card class="sin_fondo">
                            <q-card-section>
                                <div class="column flex-center titulo-areas text-white">
                                    Contacto
                                </div>
                            </q-card-section>
                            <q-card-section style="padding-bottom: 0px">
                                <q-input
                                    dense
                                    standout
                                    required
                                    label="Nombre"
                                    v-model="nombre"
                                    class="q-ml-md input-login"
                                >
                                </q-input>
                                <q-input
                                    dense
                                    standout
                                    required
                                    label="Email"
                                    v-model="email"
                                    class="q-ml-md input-login"
                                >
                                </q-input>
                                <q-input
                                    dense
                                    standout
                                    required
                                    label="Teléfono"
                                    v-model="telefono"
                                    class="q-ml-md input-login"
                                >
                                </q-input>
                                <q-input
                                    type="textarea"
                                    dense
                                    standout
                                    required
                                    label="Mnesaje"
                                    v-model="mensaje"
                                    class="q-ml-md input-login-2"
                                >
                                </q-input>
                            </q-card-section>

                            <q-card-section style="padding-top: 0px">
                                <q-btn
                                    color="accent"
                                    rounded
                                    @click="enviar"
                                    >Enviar</q-btn
                                >
                            </q-card-section>
                        </q-card>
                    </center>
                </div>
            </div>
        </div>
    </div>
</template>


<script src="./index.js">
export default {
    name: "Auth",
};
</script>

<style lang="stylus" >
@import './index.styl';
</style>
