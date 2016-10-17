'use strict'

const Config = require('./config/config');
const Path = require('path');
const relativePath = Path.join(__dirname, 'public/');

// Our hapi server
const Hapi = require('hapi');
const ClientRoutes = require('./server/api/index');

const Plugins = require('./plugins');

var Server = new Hapi.Server({
	app: Config
});
var port = Config.web.port;

Server.connection({port: port});
Server.log(['error', 'database', 'read']);

Server.register(Plugins.plugins, (err) => {
	endIfErr(err);

//	Server.bind({config: Config});
	Server.realm.settings.files.relativeTo = relativePath;

	const cache = Server.cache({segment: 'sessions', expiresIn: 3 * 24 * 60 * 60 * 1000});
	Server.app.cache = cache;

	Server.auth.strategy('session', 'cookie', true, {
		password: 'password-should-be-32-characters',
		isSecure: false,
		validateFunc: function (request, session, callback) {
			cache.get(session.sid, (err, cached) => {
				if (err) {
					return callback(err, false);
				}

				if (cached) {
					return callback(null, true, cached.account);
				}

				var Session = Server.plugins.session.instance;
				Session.get(session.sid, (err, data) => {
					if (err) {
						return callback(err, false);
					}

					if (data) {
						cache.set(session.sid, { account: data })
						return callback(null, true, data);
					}

					return callback(null, false);
				})
			});
		}
	});

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
