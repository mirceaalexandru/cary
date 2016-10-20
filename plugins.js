'use strict'

exports.register = function (server, options, next) {
	server.register([
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
			register: require('server-frame-utils')
		},
		{
			register: require('lout'), options: {apiVersion: require('./package.json').version}
		},
		{
			register: require('vision')
		}
	], next);
};

exports.register.attributes = {
	name: 'default-plugins'
};
