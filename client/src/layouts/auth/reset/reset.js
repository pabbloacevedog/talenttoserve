import Vue from 'vue'
import { mapGetters } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'

export default Vue.component('reset', {

    mixins: [validationMixin],
    validations: {
        confirmPassword: { required, minLength: minLength(8) },
        password: { required, minLength: minLength(8) }
    },
    data() {
        return {
            confirmPassword: '',
            password:''
        }

    },
    computed: {

    },
    methods: {


    },
    created() {

    },
})
