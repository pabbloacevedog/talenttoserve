import gql from 'graphql-tag'


//espacio definido para las queries de graphql, las queries son consultas tipo "select"
// 			<-------------- QUERIES -------------->
export const GET_POSTS_QUERY = gql`
    query{
      users{
        id_user,
        name,
        email
      }
    }
`
export const GET_POST_QUERY = gql`
    query userLogin($email: String!, $password: String!){
        userLogin(email: $email, password: $password){
          token: token
        }
      }
`
export const POST_HOME_QUERY = gql`
    query dataHome ($uuid_user: String!, $offset: Int!){
		dataHome(uuid_user: $uuid_user, offset: $offset){
            posts{
                id_post,
                route_img,
                text,
                images,
                createdAt,
                user_username,
                user_avatar,
                user_post,
                n_comments,
                likes
            }
        }
    }
`
//espacio definido para las mutaciones, las mutaciones son consultas tipo "update o delete"
// 			<-------------- MUTACIONES -------------->

export const CREATE_POST_MUTATION = gql`
    mutation createMessage (
		$files: [Upload]
		$text:String!,
        $uuid_user: String!,
        $uuid_user_addressee: String!
    ) {
		createPost(
			files:$files,
			text: $text,
            uuid_user:$uuid_user,
            uuid_user_addressee:$uuid_user_addressee
      	){
			id_message
		}
    }
`

export const UPLOAD_POST_MUTATION = gql`
    mutation singleUpload ($file: Upload!) {
		singleUpload(file: $file){
			id
		}
    }
`
export const UPLOAD_MULTIPLE_MUTATION = gql`
    mutation multipleUpload ($files: [Upload]) {
		multipleUpload(files: $files){
			id
		}
    }
`
