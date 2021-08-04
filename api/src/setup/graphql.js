// Imports
import config from '../config/config.json'
import { ApolloServer} from 'apollo-server-express'
import { PubSub } from 'apollo-server';
import fs ,{ createWriteStream, unlink } from 'fs'
// import { PubSub } from 'apollo-server-express';
let pubsub = new PubSub();
import mkdirp from 'mkdirp'
const UPLOAD_DIR = './public/banner';
const MESSAGE_DIR = './public/messages';
const AVATAR_DIR = './public/profile/avatar';
// App Imports
import schema from '../schema'
// Ensure upload directory exists.

if (!fs.existsSync(UPLOAD_DIR)){
	mkdirp.sync(UPLOAD_DIR);
}


const storeUpload = async (upload) => {
	try{
        console.log('upload',upload)
        debugger
		const { createReadStream, filename, mimetype } = await upload;
		var name = filename
		const stream = createReadStream();
		const carpet = `${UPLOAD_DIR}`;
		if (!fs.existsSync(carpet)){
			mkdirp.sync(carpet);
		}
		const path = `${carpet}/${name}`;
        const path_bd = `banner/${name}`;
		// Store the file in the filesystem.
		await new Promise((resolve, reject) => {
		// Create a stream to which the upload will be written.
		const writeStream = createWriteStream(path);

			// When the upload is fully written, resolve the promise.
			writeStream.on('finish', resolve);

			// If there's an error writing the file, remove the partially written file
			// and reject the promise.
			writeStream.on('error', (error) => {
				unlink(path, () => {
				reject(error);
				});
			});
			// In node <= 13, errors are not automatically propagated between piped
			// streams. If there is an error receiving the upload, destroy the write
			// stream with the corresponding error.
			stream.on('error', (error) => writeStream.destroy(error));
			// Pipe the upload into the write stream.
			stream.pipe(writeStream);
		});
		return path_bd;
	}
	catch (error) {
		console.error(error);
		// expected output: ReferenceError: nonExistentFunction is not defined
		// Note - error messages will vary depending on browser
		return error;
	}
	

};


const autoCall = async (fn, ...context) =>{
    if (typeof fn === 'function') {
        return fn(...context)
    }
    return fn
}
// Setup GraphQL
export default function (server, httpServer) {
    console.info('SETUP - GraphQL...')
    const graphQLServer = new ApolloServer({
        uploads: {
			// Limits here should be stricter than config for surrounding
			// infrastructure such as Nginx so errors can be handled elegantly by
			// graphql-upload:
			// https://github.com/jaydenseric/graphql-upload#type-processrequestoptions
			maxFileSize: 5000000000, // 10 MB
            maxFieldSize: 5000000000,
			maxFiles: 20,
		},
        schema,
        context: { storeUpload, pubsub },
        // playground: {
        //     endpoint: '/graphql',
        //     subscriptionEndpoint: `ws://localhost:${config.port}/subscriptions`,
        //     settings: {
        //         'editor.theme': 'dark',
        //     },
        // },
    });
	// const graphQLServer = new ApolloServer({
	// 	uploads: {
	// 		// Limits here should be stricter than config for surrounding
	// 		// infrastructure such as Nginx so errors can be handled elegantly by
	// 		// graphql-upload:
	// 		// https://github.com/jaydenseric/graphql-upload#type-processrequestoptions
	// 		maxFileSize: 10000000, // 10 MB
	// 		maxFiles: 20,
	// 	},
    //     schema,
    //     context: { storeUpload, avatarUpload },
    //     subscriptions: {
    //         path:'/subscriptions',
    //         onConnect: async (connectionParams, webSocket) => {
    //             console.log('connectionParams',connectionParams)
    //             console.log('ws',webSocket)
    //             let contextData = {}
    //             try {
    //                 contextData = await autoCall(context, {
    //                     connectionParams,
    //                     websocket,
    //                 })
    //                 contextData = Object.assign({}, contextData, { pubsub })
    //             } catch (e) {
    //                 console.error(e)
    //                 throw new Error('Error WS: '+e);
    //             }
    //             return contextData
    //         },
    //     },
        
    //     playground: {
    //         endpoint: '/graphql',
    //         subscriptionEndpoint: `ws://localhost:${config.port}/subscriptions`,
    //         subscriptions: {
    //             path:'/subscriptions',
    //             onConnect: async (connectionParams, webSocket) => {
    //                 console.log('connectionParams',connectionParams)
    //                 console.log('ws',webSocket)
    //                 let contextData = {}
    //                 try {
    //                     contextData = await autoCall(context, {
    //                         connectionParams,
    //                         websocket,
    //                     })
    //                     contextData = Object.assign({}, contextData, { pubsub })
    //                 } catch (e) {
    //                     console.error(e)
    //                     throw new Error('Error WS: '+e);
    //                 }
    //                 return contextData
    //             },
    //         },
    //         settings: {
    //             'editor.theme': 'dark',
    //         },
    //     },
	// });
	graphQLServer.applyMiddleware({
		app: server,
		path: '/graphql',
		cors: {
			// origin: config.client,
			// credentials: true,
			methods: ['POST'],
			allowedHeaders: [
				'X-Requested-With',
				'X-HTTP-Method-Override',
				'Content-Type',
				'Accept',
				'Authorization',
				'Access-Control-Allow-Origin',
			],
        },
        bodyParserConfig: {
            limit:"50mb"
        }
    });		
    graphQLServer.installSubscriptionHandlers(httpServer);
}
