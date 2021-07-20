import Vue from 'vue'
import { mapGetters } from 'vuex'
import $ from 'jquery'
export default Vue.component('ViewRespComments', {
	$validates: 1,
	data () {
		return {
			base : process.env.BASE_URL,
            src_avatar: localStorage.getItem('src_avatar'),
            avatar_default: '../../statics/user.png',
            icom: 2,
            iresp: 2,
            up_coms:1,
            responder_comentario: false,
            responder_comentario_user: false,
            min_resp:100,
            min_com:2,
            // total_resp:0,
            n_com:0,
            n_resp:0,
            total_com:0,
            moreComs :true,
            moreRespComs :true,
            resp_commentsPost:[],
            // incomingRespComment: '',
            contentStyle: {
                    color: '#555'
            },
            resp_comments:[],
            remaining_:0,
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
            funciones: {
                moreRespComments: this.moreRespComments
            }
        }
    },
    props: [
        'id_comment',
        'remaining'
    ],
	computed: {
		...mapGetters({ 
            error: "Global/error",
            respcomments: "Global/getRespCommentsComments",
            // incomingComment: "Global/getIncommingComment",
            incomingRespComment: "Global/getIncommingRespComment"
        })
	},
	methods: {
        async bringRespComments(){
            let limit = 1
            if(this.remaining != 0){
                if(this.remaining < 3){
                    limit = this.remaining
                }
                else{
                    limit = Math.round((this.remaining / 3))
                }
            }
            let obj = {
                offset: this.resp_comments.length,
                id_comment: this.id_comment,
                limit: limit
            }
            if(await this.$resp_commentsComment(obj)){
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
                    let data = this.respcomments
                    if(this.respcomments.length > 0){
                        if(this.resp_commentsPost)
                        {
                            let new_posts = this.parseComment(data)
                            let old_posts = this.resp_commentsPost
                            this.resp_commentsPost = []
                            this.resp_commentsPost = this.resp_commentsPost.concat(old_posts, new_posts);
                        }
                        else{
                            this.resp_commentsPost = this.parseComment(data)
                        }
                        this.remaining = this.respcomments[0].n_resp_comments - this.resp_commentsPost.length
                    }
                }
            }
            else{
                this.$q.notify({
                    message: "Error al traer las respuestas para el comentario: " + this.id_comment,
                    timeout: 3000,
                    type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
                    position: 'bottom',
                    icon: 'done_all'
                })
            }
        },
        parseComment(comments){
            let data = []
            for(let c = 0; c < comments.length; c++){
                var com = {
                    id_post: comments[c].id_post,
                    uuid_user_comment: comments[c].uuid_user,
                    id_comment: comments[c].id_comment,
                    id_resp_comment: comments[c].id_resp_comment,
                    username: comments[c].username,
                    text:comments[c].text,
                    uuid_user: comments[c].uuid_user,
                    avatar: this.base + comments[c].avatar,
                    createdAt: comments[c].createdAt,
                    likes: comments[c].likes
                }
                data.push(com)
            }
            return data
        },
        newCommentUser(id_comment){
            var action = document.getElementById('action_respcomment_'+id_comment);
            var user = document.getElementById('respcomment_user_'+id_comment);
            action.classList.remove("espacio-action-respcomment");
            action.classList.add("espacio-action-respcomment-active");
            user.classList.remove("comment_user");
            user.classList.add("comment_user-active");
        },
        moreRespComments(){
            setTimeout(() => {
                this.bringRespComments()  
                done()
            }, 1000)
        },
        addIncommingRespComment(comment){
            let av = this.base + comment.avatar
            comment.avatar = av
            this.resp_comments.push(comment)
        },
        async moreRespComments(){
            setTimeout(() => {
                this.bringComments()  
            }, 1000)
        },
	},
	components: {
	},
	created () {
        if(this.remaining > 0){
            this.bringRespComments()
            // console.log(this.total_resp)
        }
        
        // console.log(this.total_resp)
        // console.log(this.id_comment)
        // this.$root.$on('update_coms', (data) => {
        //     console.log('update_coms',data)
        //     if(data){
        //         this.up_coms++;
        //         this.min_resp++
        //         this.up_coms++;
        //     }
        //     else{
        //         this.up_coms--
        //     }
            
        // });
        // debugger
        // if(this.item.n_comments > 0){
        //     this.total_com = (this.item.n_comments - this.min_com)
        //     this.n_com = this.item.n_comments
        //     for (let index = 0; index < this.item.comments.length; index++) {
        //         const element = this.item.comments[index];
        //         this.total_resp = (element.n_resp_comments - this.min_resp)
        //         this.n_resp = element.n_resp_comments
        //     }
        // }

        // console.log(this.total_com)
	},
	mounted () {
	},
	updated () {
	},
    watch: {
        'incomingRespComment': function () {
            if(this.incomingRespComment.id_comment == this.id_comment){
                this.addIncommingRespComment(this.incomingRespComment)
            }
        },

    }

})
