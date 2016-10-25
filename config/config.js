'use strict';

const Joi = require('joi');
const Dotenv = require('dotenv');

try {
	Dotenv.config({silent: true});
}catch (err) {
	// this is ignored, as in production we will not use dotenv
}

const config = {
	projectName: process.env.PROJECT_NAME || 'Server',
	db: {
		url: process.env.DB_URL
	},
	web: {
		port: process.env.WEB_PORT || 9090,
		internalPort: process.env.WEB_INTERNAL_PORT,
		url: process.env.WEB_URL || "http://localhost:9090"
	},
	cookieSecret: process.env.COOKIE_SECRET,
	mail: {
		settings: process.env.EMAIL_SETTINGS ? JSON.parse(process.env.EMAIL_SETTINGS) : {},
		fromAddress: process.env.EMAIL_FROM,
		templateFolder: process.env.EMAIL_TEMPLATE_FOLDER
	},
	aws: {
		settings: {
			region: process.env.AWS_REGION,
			accessKeyId: process.env.AWS_KEY,
			secretAccessKey: process.env.AWS_SECRET,
		},
		jobSNS: process.env.SNS_JOB_TOPIC,
		alertSNS: process.env.SNS_ALERT_TOPIC
	}
};

// validate configuration and prevent app to start if not fully-configured.
Joi.validate(
	config,
	Joi.object().keys({
		projectName: Joi.string().min(3).max(30).required(),
		db: Joi.object().keys({
			url: Joi.string().min(3).required()
		}).required(),
		web: Joi.object().keys({
			url: Joi.string().min(3).required(),
			port: Joi.number().integer().required(),
			internalPort: Joi.number().integer()
		}).required(),
		cookieSecret: Joi.string().required(),
		mail: Joi.object().keys({
			settings: Joi.object().required(),
			fromAddress: Joi.string().required(),
			templateFolder: Joi.string().required()
		}).required(),
		aws: Joi.object().keys({
			settings: Joi.object().keys({
				region: Joi.string().required(),
				accessKeyId: Joi.string().required(),
				secretAccessKey: Joi.string().required()
			}).required(),
			jobSNS: Joi.string().required(),
			alertSNS: Joi.string().required()
		}).required()
	}), (err) => {
		if (err) {
			console.log(err);
			process.exit(1);
		}
	})


module.exports = config;
