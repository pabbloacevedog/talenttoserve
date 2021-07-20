import Vue from 'vue'
import { mapGetters } from 'vuex'
import $ from 'jquery'

export default Vue.component('ViewComments', {
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
            min_resp:1,
            min_com:1000,
            total_resp:0,
            n_com:0,
            n_resp:0,
            remaining: 0,
            total_com:0,
            moreComs :true,
            moreRespComs :true,
            seeless: false,
            commentsPost:[],

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
            funciones:{
                moreC: this.moreComments,
            }
            
        }
    },
    props: [
        'id_post',
        'n_comments'
    ],
	computed: {
		...mapGetters({ 
            error: "Global/error",
            comments: "Global/getCommentsPost",
            incomingComment: "Global/getIncommingComment"
        })
	},
	methods: {
        async bringComments(){
            let limit = 1
            if(this.remaining != 0){
                if(this.remaining <= 3){
                    limit = this.remaining
                }
                else{
                    limit = Math.round((this.remaining / 3))
                }
            }
            let obj = {
                offset: this.commentsPost.length,
                id_post: this.id_post,
                limit: limit
            }
            if(await this.$commentsPost(obj)){
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
                    let data = this.comments
                    if(this.comments.length > 0){
                        if(this.commentsPost.length > 0)
                        {
                            let new_posts = this.parseComment(data)
                            let old_posts = this.commentsPost
                            this.commentsPost = []
                            this.commentsPost = this.commentsPost.concat(old_posts, new_posts);
                            if(this.commentsPost.length == this.n_comments){
                                this.seeless = true
                            }
                        }
                        else{
                            this.commentsPost = this.parseComment(data)
                        }
                        this.remaining = this.comments[0].n_comments - this.commentsPost.length
                    }
                }
            }
            else{
                this.$q.notify({
                    message: "Error al traer los comentarios para el post: " + this.id_post,
                    timeout: 3000,
                    type: 'negative',// Available values: 'positive', 'negative', 'warning', 'info'
                    position: 'bottom',
                    icon: 'done_all'
                })
            }
        },
        see_less(){
            this.remaining = this.commentsPost.length -1
            this.commentsPost.splice(1,this.commentsPost.length - 1)
            
            this.seeless = false
        },
        parseComment(comments){
            let data = []
            for(let c = 0; c < comments.length; c++){
                var com = {
                    id_post: comments[c].id_post,
                    id_comment: comments[c].id_comment,
                    username: comments[c].username,
                    text:comments[c].text,
                    uuid_user: comments[c].uuid_user,
                    avatar: this.base + comments[c].avatar,
                    createdAt: comments[c].createdAt,
                    n_resp_comments: comments[c].n_resp_comments,
                    likes: comments[c].likes
                }
                data.push(com)
            }
            return data
        },
        newComment(id_comment){
            var action = document.getElementById('action_comment_'+id_comment);
            var user = document.getElementById('comment_user_'+id_comment);
            action.classList.remove("espacio-action-comment");
            action.classList.add("espacio-action-comment-active");
            user.classList.remove("comment_user");
            user.classList.add("comment_user-active");
        },
        newCommentUser(id_comment){
            var action = document.getElementById('action_respcomment_'+id_comment);
            var user = document.getElementById('respcomment_user_'+id_comment);
            action.classList.remove("espacio-action-respcomment");
            action.classList.add("espacio-action-respcomment-active");
            user.classList.remove("comment_user");
            user.classList.add("respcomment_user-active");
        },
        async moreComments(){
            setTimeout(() => {
                this.bringComments()  
            }, 1000)
        },
        addIncommingComment(comment){
            let av = this.base + comment.avatar
            comment.avatar = av
            this.commentsPost.push(comment)
        }
	},
	components: {
	},
	created () {
        if (this.n_comments > 0) {
            this.bringComments()
        }
	},
	mounted () {
	},
	updated () {
	},
    watch: {
        'incomingComment': function () {
            console.log('Nuevo comentario ', this.incomingComment)
            if(this.incomingComment.id_post == this.id_post){
                this.addIncommingComment(this.incomingComment)
            }
        },

    }

})
