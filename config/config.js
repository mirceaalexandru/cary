'use strict';

const Dotenv = require('dotenv');

Dotenv.config({silent: true});

const config = {
	projectName: process.env.PROJECT_NAME || 'Server',
	db: {
		url: process.env.DB_URL
	},
	web: {
		port: process.env.WEB_PORT || 9090
	},
	cookieSecret: process.env.COOKIE_SECRET,
	mail: process.env.EMAIL_SETTINGS ? JSON.stringify(process.env.EMAIL_SETTINGS) : {},
	system: {
		fromAddress: {
			name: process.env.EMAIL_FROM
		}
	}
};

module.exports = config;
