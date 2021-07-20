// import Auth from '../layouts/auth/auth.vue'
// import Registry from '../layouts/auth/registry/registry.vue'
import Auth from '../layouts/auth/login.vue'
import MostrarCortes from '../components/mostrar_cortes/index.vue'
// import PhotoView from '../components/photo_view/index.vue'
// import PhotoViewer from '../components/photo_viewer/index.vue'
// import PhotoViewerPhone from '../components/photo_viewer_phone/index.vue'
// import NewPost from '../components/new_post/index.vue'
// import CardPost from '../components/card_post/index.vue'
// import AddComment from '../components/add_comment/index.vue'
// import AddMessage from '../components/add_message/index.vue'
// import MessageList from '../components/message_list/index.vue'
// import Reactions from '../components/reactions/index.vue'
// import ViewComments from '../components/view_comments/index.vue'
// import ViewRespComments from '../components/view_resp_comments/index.vue'
// import Comments from '../components/comments/index.vue'
// import RespComments from '../components/resp_comments/index.vue'
// import ViewFinder from '../components/viewfinder/index.vue'
// import ViewImgChat from '../components/view_img_chat/index.vue'
// import ViewImgChatPhone from '../components/view_img_chat_phone/index.vue'
// import MoreComments from '../components/more_comments/index.vue'
// import MoreRespComments from '../components/more_resp_comments/index.vue'
// import PostHome from '../components/post_home/index.vue'
// import Conversation from '../components/conversation/index.vue'
// import Sections from '../components/sections/index.vue'
// import CardProfile from '../components/card_profile/index.vue'
// import CardUser from '../components/card_user/index.vue'
// import Followers from '../components/followers/index.vue'
// import Follows from '../components/follows/index.vue'

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
