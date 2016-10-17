'use strict'

module.exports = [
	{
		method: 'GET',
		path: '/{path*}',
		config: {
			auth: false,
			plugins: {
				lout: false
			}
		},
		handler: {
			directory: {
				path: './',
				redirectToSlash: true,
				index: false
			}
		}
	},
	{
		method: 'GET',
		path: '/',
		config: {
			auth: false,
			plugins: {
				lout: false
			}
		},
		handler: {
			file: {
				path: './index.html'
			}
		}
	}
]
