// Imports
import config from '../config/config.json'
import models from '../models/index.js'
import depthLimit from 'graphql-depth-limit'
import { createComplexityLimitRule } from 'graphql-validation-complexity';
import { ApolloServer, PubSub} from 'apollo-server-express'
// import { PubSub } from 'apollo-server';
import fs ,{ createWriteStream, unlink } from 'fs'
let pubsub = new PubSub();
import mkdirp from 'mkdirp'
import decode from 'jwt-decode'
const UPLOAD_DIR = './public/banner';
// App Imports
import schema from '../schema/index.js'
import plugins from './plugins.js'
// const ApolloServerOperationRegistry =
//   require('apollo-server-plugin-operation-registry');
// Ensure upload directory exists.

if (!fs.existsSync(UPLOAD_DIR)){
	mkdirp.sync(UPLOAD_DIR);
}

const ComplexityLimitRule = createComplexityLimitRule(config.limite_complejidad_querys, {
    createError(cost, documentNode) {
        const error = new GraphQLError('Error: ha excedido la complejidad configurada para la query.', [documentNode]);
        error.meta = { cost };
        return error;
    },
});
const storeUpload = async (upload) => {
	try{
		const { createReadStream, filename, mimetype } = await upload.file;
		var uuid_user = upload.uuid_user
		var id_post = upload.id_post
		var name = upload.name
		const stream = createReadStream();
		const carpet = `${UPLOAD_DIR}/${uuid_user}`;
		const carpetPost = `${UPLOAD_DIR}/${uuid_user}/${id_post}`;
		if (!fs.existsSync(carpet)){
			mkdirp.sync(carpet);
		}
		if (!fs.existsSync(carpetPost)){
			mkdirp.sync(carpetPost);
		}

		const path = `${carpetPost}/${name}`;
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
		return filename;
	}
	catch (error) {
		console.error(error);
		// expected output: ReferenceError: nonExistentFunction is not defined
		// Note - error messages will vary depending on browser
		return error;
	}
	

};
// Setup GraphQL
export default function (server, httpServer) {
    console.info('SETUP - GraphQL...')
    const graphQLServer = new ApolloServer({
        uploads: {
			maxFileSize: 10000000, // 10 MB
			maxFiles: 20,
		},
        debug: true,
        schema,
        tracing: true,
        validationRules: [ 
            depthLimit(config.limite_profundidad_querys) ,
            ComplexityLimitRule
            // costAnalysis({
            //     variables: req.body.variables,
            //     maximumCost: 1000,
            // }),
        ],
        context: ({ req }) => {
            let cliente = req.headers.origin
            console.log('ip',ip_cliente)
            if(req.headers.authorization){
                const token = req.headers.authorization || '';
                const usuario = decode(token)
                let auth = true
                return { cliente, auth, usuario, storeUpload, pubsub, models }
            }
            else{
                let auth = false
                return { cliente, auth ,storeUpload, pubsub, models }
            }
        },
        plugins: [
            /* This plugin is imported in-place. */
            plugins,
            /* This plugin is defined in-line. */
            {
                serverWillStart() {
                    console.log('\x1b[36m%s\x1b[0m', 'SHOT  - API SHOT partiendo...'); 
                },
                serverWillStop() {
                    console.log('\x1b[36m%s\x1b[0m', 'SHOT  - API SHOT se detuvo'); 
                },
                requestDidStart(requestContext) {
                    console.log('\x1b[36m%s\x1b[0m', 'SHOT  - API SHOT recibe consulta graphql',requestContext.request.query); 
                    /* Within this returned object, define functions that respond
                    to request-specific lifecycle events. */
                    return {
            
                        /* The `parsingDidStart` request lifecycle event fires
                            when parsing begins. The event is scoped within an
                            associated `requestDidStart` server lifecycle event. */
                        parsingDidStart(requestContext) {
                            console.log('\x1b[36m%s\x1b[0m', 'SHOT  - API SHOT analiza la consulta'); 
                        },
                    }
                },
                didEncounterErrors() {
                    console.log('\x1b[36m%s\x1b[0m', 'SHOT  - API SHOT ERROR!'); 
                },
                generateClientInfo: ({request}) => {
                    const headers = request.http && request.http.headers;
                    if(headers) {
                        return {
                            clientName: headers['apollographql-client-name'],
                            clientVersion: headers['apollographql-client-version'],
                        };
                    } else {
                        return {
                            clientName: "Unknown Client",
                            clientVersion: "Unversioned",
                        };
                    }
                },
                
            }
        ],
        onHealthCheck: () => {
            return new Promise((resolve, reject) => {
                // responde con 200 a los check del cliente
                if (true) {
                    resolve();
                } else {
                    reject();
                }
            });
        },
    });
	graphQLServer.applyMiddleware({
		app: server,
		path: '/graphql',
		cors: {
			// origin: config.client,
            origin: '*',
			credentials: true,
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
    });		
    graphQLServer.installSubscriptionHandlers(httpServer);
}
