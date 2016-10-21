'use strict'

const Config = require('./config/config');
const Path = require('path');
const relativePath = Path.join(__dirname, 'public/');

// Our hapi server
const Hapi = require('hapi');
const Nes = require('nes');
const ClientRoutes = require('./server/api/index');

var Server = new Hapi.Server({
	app: Config
});
var port = Config.web.port;

Server.connection({port: port, labels: 'default'});
Server.connection({port: Config.web.internalPort, labels: 'internal'});


Server.log(['error', 'database', 'read']);

Server.register(
	[
		{
			register: Nes
		},
		{
			register: require('./plugins')
		},
		{
			register: require('server-frame-mongo')
		},
		{
			register: require('server-frame-dummy-service')
		}
	], (err) => {
		endIfErr(err);

		Server.realm.settings.files.relativeTo = relativePath;

		Server.route(ClientRoutes);

		Server.app.logger.info(`Using config: ${JSON.stringify(Config, null, 2)}`);
		Server.start(endIfErr);
		Server.app.logger.info(`Server started at ${port}`);
	});

function endIfErr(err) {
	if (err) {
		console.error(err);
		process.exit(1);
	}
};
