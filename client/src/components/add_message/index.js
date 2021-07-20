import Vue from 'vue'
import { mapGetters } from 'vuex'
import $ from 'jquery'
export default Vue.component('AddMessage', {
	$validates: 1,
	data () {
		return {
			img:'/statics/login.jpg',
			text: '',
			base : process.env.BASE_URL,
            new_message: '',
            resp_comment: '',
            id_coment_responder: '',
			dense:'',
			username: '',
            src_avatar: localStorage.getItem('src_avatar'),
            avatar_default: '../../statics/user.png',
			con_fotos:[],
            items: [],
            comentarios: [],
			file: null,
            files: null,
            fab1: false,
            fab2: false,
            url: [],
        }
    },
    props: [
        'uuid_user',
        'uuid_user_addressee'
    ],
	computed: {
		...mapGetters({ 
            id_message: "Message/getMessage", 
            error: "Message/error",
        })
	},
	methods: {
        async add_message() {
            let message = {
                files: this.files,
                text: this.new_message,
                uuid_user: this.uuid_user,
                uuid_user_addressee: this.uuid_user_addressee
            }
            // console.log('message',message)
            await this.$store.dispatch("Message/createMessage", message).then(res => {
				this.$q.loading.hide()
				if(this.error){
					var message = this.error.message.replace('GraphQL error: ','')
					this.$q.notify({
						message: message,
						timeout: 3000,
						type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
						position: 'bottom',
						icon: 'report_problem'
					})
				}
				else{
                    var message = this.id_message
                    this.new_message = ''
                    console.log('id_message',this.id_message)
                    this.url =[]
                    // for (let index = 0; index < message.length; index++) {
                    //     var avatar = this.base + message[index].avatar_addressee
                    //     message[index].avatar_addressee = avatar 
					// }
                    // this.items = message
					// console.log('messages',this.items)
				}
			}).catch(err => {
				console.log(err)
			})
        },
        add_files(){
            document.getElementsByClassName('fileInput')[0].click();
        },
        onFileChange(e) {
            // const file = e.target.files[0];
            // this.url = URL.createObjectURL(file);
            const file = e.target.files;
            for (let index = 0; index < file.length; index++) {
                const element = URL.createObjectURL(file[index]);
                this.url.push(element)
            }
        },
        delete_file(item){
            console.log(this.url)
            var i = this.url.indexOf( item );
 
            if ( i !== -1 ) {
                this.url.splice( i, 1 );
            }
            console.log(item)
        },
        onClick(){
            console.log('click')
        }
	},
	components: {
	},
	created () {

        console.log('uuid_user',this.uuid_user)
        console.log('uuid_user_addressee',this.uuid_user_addressee)
	},
	mounted () {
	},
	updated () {
	},
    watch: {
        'type_comment': function () {
            this.validate()
        },
    }

})
