
import Auth from '../layouts/auth/login.vue'


import {
    Loading,

    // optional!, for example below
    // with custom spinner
    QSpinnerBars,
    QSpinnerPie,
    QSpinnerBall,
    QSpinnerPuff,
} from 'quasar'

// customizable (all props available)
Loading.setDefaults({
    spinner: QSpinnerPie,
    message: 'Cargando...',
    messageColor: 'white',
    spinnerSize: 100, // in pixels
    spinnerColor: 'cyan',
    //customClass: 'bg-primary'
})

export default ({ Vue }) => {
    // Vue.use(general)
}
