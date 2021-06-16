// App Imports

import models from '../models/index.js'

export default function (server, config) {
	console.info('SETUP - Sincronizando tablas de la base de datos...')
	models.sequelize.sync({ alter: true }).then(() => {
		console.info('INFO  - Base de datos sincronizada correctamente.')
		console.info('SETUP - Iniciando servidor...')
        server.listen({ port: config.port }, (error) => {
            if (error) {
				console.error('ERROR - Incapaz de iniciar el servidor.' + error)
			} else {
                console.info(`INFO  - Apollo Server corriendo en el puerto ${ config.port }.`)
                console.log('\x1b[36m%s\x1b[0m', 'SHOT  - ¡API SHOT funcionando correctamente!'); 
			}
        });
	})
	.catch((error) => {
		console.error('ERROR - Incapaz de sincronizar la base de datos.')
		console.error('ERROR - Servidor no iniciado.' + error)
	})
}
