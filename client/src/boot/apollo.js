import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo3-cache-persist';
import { setContext as ST } from 'apollo-link-context'
import VueApollo from 'vue-apollo'
import fetch from 'node-fetch'
// import { createHttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error';
import { split } from "apollo-link";
import { ApolloLink, from } from "apollo-link";
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { createUploadLink } from 'apollo-upload-client'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

// const httpLink = createHttpLink({ uri: process.env.API_URL, fetch: fetch })
const httpLink = createUploadLink({ uri: process.env.API_URL, fetch: fetch })
// let wsClient = new SubscriptionClient(
//     process.env.API_WS_URL,
//     {
//         reconnect: true,
// 		connectionParams: () => {
// 			const token = localStorage.getItem('token')
// 			// return the headers to the context so httpLink can read them
// 			return {
// 				headers: {
// 					...headers,
// 					authorization: token ? `Bearer ${token}` : ''
// 				}
//             }
//         },
//     }
// )
// const wsLink = new WebSocketLink(wsClient)
const wsLink = new WebSocketLink({
	uri: process.env.API_WS_URL,
	options: {
		reconnect: true,
		// connectionParams: () => {
		// 	const token = localStorage.getItem('token')
		// 	// return the headers to the context so httpLink can read them
		// 	return {
		// 		headers: {
		// 			...headers,
		// 			authorization: token ? `Bearer ${token}` : ''
		// 		}
        //     }
        // },
	},
})
const authLink = ST((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = localStorage.getItem('token')
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : ''
		}
	}
})
const terminatingLink = split(
	// split based on operation type
	({ query }) => {
		const definition = getMainDefinition(query);
        // console.log(definition);
		return (
			definition.kind === "OperationDefinition" &&
			definition.operation === "subscription"
		);
	},
	wsLink,
	httpLink
);
// const omitTypename = (key, value) => {
//     return key === '__typename' ? undefined : value
// }

// const omitTypenameLink = new ApolloLink((operation, forward) => {
//     if (operation.variables) {
//         operation.variables = JSON.parse(
//         JSON.stringify(operation.variables),
//         omitTypename
//         )
//     }
//     return forward(operation)
// })
// const cache = new InMemoryCache()
// persistCache({
//     cache,
//     storage: window.localStorage,
// });
const apolloClient = new ApolloClient({
    // link,
	link:  ApolloLink.from([
        onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors)
                graphQLErrors.map(({ message, locations, path }) =>
                    console.log(
                        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                    ),
                );
            if (networkError) console.log(`[Network error]: ${networkError}`);
        }),
        authLink,
        // omitTypenameLink,
        terminatingLink
    ]),
	cache: new InMemoryCache({addTypename: false}),
	connectToDevTools: true
})


const apollo = new VueApollo({
	defaultClient: apolloClient,
	errorHandler ({ graphQLErrors, networkError }) {
		if (graphQLErrors) {
			graphQLErrors.map(({ message, locations, path }) =>
				console.log(
				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
				)
			)
		}
		if (networkError) {
			console.log(`[Network error]: ${networkError}`)
		}
	}
})

// window.__APOLLO_CLIENT__ = apollo
export default ({ app, Vue , store}) => {
	Vue.use(apollo)
	app.apolloProvider = apollo
    store.$apollo = apollo
    Vue.prototype.$apollo = apollo
}
