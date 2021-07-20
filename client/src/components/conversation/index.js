import Vue from 'vue'
import { mapGetters } from 'vuex'
import $ from 'jquery'
export default Vue.component('Conversation', {
	$validates: 1,
	data () {
		return {
			img:'/statics/login.jpg',
			text: '',
			base : process.env.BASE_URL,
            message: '',
			dense:'',
            username: '',
            lastMessage:'',
			ss_u: '',
            src_avatar: localStorage.getItem('src_avatar'),
            avatar_default: '../../statics/user.png',
			con_fotos:[],
			items: [],
			file: null,
            files: null,
            up_conversation: 2,
            days : ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
            contentStyle: {
                    color: '#555'
            },
    
            contentActiveStyle: {
                // backgroundColor: '#eee',
                color: 'black'
            },
    
            thumbStyle: {
                right: '2px',
                borderRadius: '5px',
                backgroundColor: '#027be3',
                width: '5px',
                opacity: 0.75
            },
            // permitido: false,
        }
    },
    props: [
        'conversation',
        'funciones',
        'permitido'
    ],
	computed: {
		...mapGetters({ 
            incomingMessage: "Message/getIncommingMessage",
            error: "Message/error",
        })
	},
	methods: {
        convertTime(time_ms){
            var date = new Date(time_ms * 1000);
            var day = date.getDay();
            var hours = date.getHours();
            var minutes = "0" + date.getMinutes();
            return 'El ' + this.days[day] + ' a las ' + hours + ':' + minutes.substr(-2);
        },
        updateScroll(){
            var div = document.getElementsByClassName("scrollingContainer");
            let aumentar = div[0].scrollHeight;
            // debugger
            $(".parent_conv .q-scrollarea .scroll").scrollTop(aumentar);
            // console.log(div[0].scrollHeight)
            console.log('updateScroll')
        },
        updateScrollMoreMessages(){
            var div = document.getElementsByClassName("scrollingContainer");
            let aumentar = (div[0].scrollHeight - (div[0].scrollHeight / 2 ));
            // debugger
            $(".parent_conv .q-scrollarea .scroll").scrollTop(aumentar);
            console.log(div[0].scrollHeight)
            console.log(aumentar)
            console.log('updateScrollMoreMessages')
        },

	},
	components: {
	},
	created () {
        
        console.log('c conversation', this.conversation)
        setTimeout(this.updateScroll, 100);
	},
	mounted () {
	},
	updated () {
	},
    watch: {
        'conversation': function () {
            // debugger
            if(this.permitido){
                setTimeout(this.updateScrollMoreMessages, 10);
            }
            
        },
        'incomingMessage': function () {
            if(this.conversation[0].uuid_user_addressee == this.incomingMessage.uuid_user_addressee || this.conversation[0].uuid_user == this.incomingMessage.uuid_user_addressee){
                setTimeout(this.updateScroll, 1);
                this.up_conversation++
            }
        },
    }

})
