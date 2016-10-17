'use strict'

var plugins = [
	{
		register: require('hapi-auth-cookie')
	},
	{
		register: require('bell')
	},
	{
		register: require('inert')
	},
	{
		register: require('hapi-pino')
	},
	{
		register: require('server-frame-auth')
	},
	{
		register: require('server-frame-mongo')
	},
	{
		register: require('lout'), options: {apiVersion: require('./package.json').version}
	},
	{
		register: require('vision')
	}
];

exports.plugins = plugins;
