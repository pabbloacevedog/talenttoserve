// Imports
import express from 'express'
import https from 'https';
import http from 'http';

// App Imports
import setupLoadModules from './setup/loadModules.js'
import setupGraphQL from './setup/graphql.js'
import setupStartServer from './setup/startServer.js'
import settings from './config/config.json'

const environment = process.env.NODE_ENV;
let config; 
if(environment === 'production')  {
    config = settings.production
}
else{
    config = settings.development
}
console.log('config', config)
// Create express server
const server = express()

// Setup load modules
setupLoadModules(server)
// Setup GraphQL
let httpServer;
if (config.ssl) {
    // Assumes certificates are in a .ssl folder off of the package root.
    // Make sure these files are secured.
    httpServer = https.createServer(
        {
            key: fs.readFileSync(`./ssl/${environment}/server.key`),
            cert: fs.readFileSync(`./ssl/${environment}/server.crt`)
        },
        server,
    );
} else {
    httpServer = http.createServer(server);
}
// const httpServer = createServer(server);
setupGraphQL(server, httpServer)
// Start server
setupStartServer(httpServer, config)
