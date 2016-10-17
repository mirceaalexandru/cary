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
		register: require('./server/lib/db')
	},
	{
		register: require('server-auth')
	},
	{
		register: require('lout'), options: {apiVersion: require('./package.json').version}
	},
	{
		register: require('vision')
	}
];

exports.plugins = plugins;
