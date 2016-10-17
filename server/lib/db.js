'use strict';

var Config = require('./../../config/config');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var _ = require('lodash');

exports.register = function (server, options, next) {

	var internals = {
		db: null,
		insert: function (coll, doc, done) {
			var collection = internals.db.collection(coll);

			collection.insert(doc, function (err, result) {
				if (err) {
					return done(err);
				}
				if (result.insertedCount !== 1) {
					return done('db error');
				}
				result = result.ops[0];

				return done(err, result);
			});
		},

		findOne: function (coll, cond, done) {
			var collection = internals.db.collection(coll);

			cond = fixCondition(cond);

			collection.findOne(cond, done);
		},

		findByIdAndDelete: function (coll, cond, done) {
			var collection = internals.db.collection(coll);

			cond = fixCondition(cond);

			collection.findOne(cond, function (err, doc) {
				if (err) {
					return done(err);
				}

				if (!doc) {
					return done();
				}

				collection.deleteOne(cond, function (err) {
					return done(err, doc);
				})
			});
		},

		update: function (coll, cond, setValues, done) {
			var collection = internals.db.collection(coll);

			var cond = fixCondition(cond);

			delete setValues._id;

			collection.update(cond, setValues, function (err, doc) {
				if (err) {
					return done(err);
				}

				if (doc.result.n === 1) {
					return done();
				}
				return done();
			});
		}
	};

	function fixCondition(cond) {
		if (cond._id) {
			if (_.isObject(cond._id)) {
				_.keys(cond._id).forEach(function (key) {
					cond._id[key] = new ObjectID(cond._id[key]);
				})
			}
			else {
				cond._id = new ObjectID(cond._id);
			}
		}

		return cond;
	}


	function init(done) {
		MongoClient.connect(Config.get('db').url, function (err, dbInst) {
			if (err) {
				process.exit(1);
			}
			console.log("Connected correctly to server");
			internals.db = dbInst;
			done();
		});
	}

	server.expose('instance', internals);

	init(next);
}
;


exports.register.attributes = {
	name: 'db'
};
