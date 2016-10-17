'use strict';

const Joi = require('joi');
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
	mail: {
		settings: process.env.EMAIL_SETTINGS ? JSON.parse(process.env.EMAIL_SETTINGS) : {},
		fromAddress: process.env.EMAIL_FROM,
		templateFolder: process.env.EMAIL_TEMPLATE_FOLDER
	}
};

Joi.validate(
	config,
	Joi.object().keys({
		projectName: Joi.string().min(3).max(30).required(),
		db: Joi.object().keys({
			url: Joi.string().min(3).required()
		}).required(),
		web: Joi.object().keys({
			port: Joi.number().integer()
		}).required(),
		cookieSecret: Joi.string().required(),
		mail: Joi.object().keys({
			settings: Joi.object().required(),
			fromAddress: Joi.string().required(),
			templateFolder: Joi.string().required()
		}).required()

	}), (err) => {
		if (err) {
			console.log(err);
			process.exit(1);
		}
	})


module.exports = config;
