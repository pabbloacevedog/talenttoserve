// App Imports

import models from '../models/index'
import config from '../config/config.json'

import { PubSub } from 'apollo-server';
const pubsub = new PubSub();
const MESSAGE_CREATED = 'MESSAGE_CREATED';
// import schema from '../schema'
// import { execute, subscribe } from 'graphql';
// import { SubscriptionServer } from 'subscriptions-transport-ws';
// Sincronizando tablas de la base de datos e iniciar servidor
export default function (server) {
	console.info('SETUP - Sincronizando tablas de la base de datos...')

	// Crear tablas
	models.sequelize.sync({}).then(() => {
		console.info('INFO  - Base de datos sincronizada correctamente.')

		console.info('SETUP - Iniciando servidor...')
        // Inciar Servidor web
        server.listen({ port: config.port,bodyParserOptions: { limit: "10mb", type: "application/json" } }, (error) => {
            if (error) {
				console.error('ERROR - Incapaz de iniciar el servidor.' + error)
			} else {
                console.info(`INFO  - Apollo Server corriendo en el puerto ${ config.port }.`)
			}
        });
	})
	.catch((error) => {
		console.error('ERROR - Incapaz de sincronizar la base de datos.')
		console.error('ERROR - Servidor no iniciado.' + error)
	})
}
