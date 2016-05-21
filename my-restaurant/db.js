var mongodb = require('mongodb');
//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

var config = require('./config');
// Connection URL. This is where your mongodb server is running.
var url = config.mongoConfig.url;

//done
//For single insertion operation.
function addRestaurant(restaurant, cb) {
	MongoClient.connect(url, function (err, db) {
		if (err) {
			console.log('Unable to connect to the mongoDB server. Error: ', err);
			return cb(err, null);
		}
		//We are connected successfully.
		console.log('Connection established to ', url);
		var collection = db.collection('restaurants');
		collection.insertOne(restaurant, function (err, result) {
			console.log('Connection closed...');
			db.close();

			if (err) {
				console.log('err' + err);
				return cb(err, null);
			} else if (result.insertedCount) {
				console.log('Restaurant added successfully...');
				return cb(null, result);
			}
		});
	});
}

//For inserting data in bulk.
function addRestaurants(restaurant, cb) {
	MongoClient.connect(url, function (err, db) {
		if (err) {
			console.log('Unable to connect to the mongoDB server. Error: ', err);
			cb(err, null);
		}
		//We are connected successfully.
		console.log('Connection established to ', url);
		var collection = db.collection('restaurants');
		collection.insertMany(restaurant, function (err, result) {
			console.log('Connection closed...');
			db.close();

			if (err) {
				console.log('err' + err);
				return cb(err, null);
			} else if (result.insertedCount) {
				console.log('Restaurant added successfully...');
				return cb(null, result);
			}
		});
	});
}

function updateRestaurant() {
	MongoClient.connect(url, function (err, db) {
		if (err) {
			console.log('Unable to connect to the mongoDB server. Error: ', err);
			cb(err, null);
		}
		//We are connected successfully.
		console.log('Connection established to ', url);
		var collection = db.collection('restaurants');
		collection.updateOne(restaurant, function (err, result) {
			console.log('Connection closed...' );
			db.close();

			if (err) {
				console.log('err' + err);
				return cb(err, null);
			} else if (result.insertedCount) {
				console.log('Restaurant updated successfully...');
				return cb(null, result);
			}
		});
	});
}

function updateRestaurants() {
	MongoClient.connect(url, function (err, db) {
		if (err) {
			console.log('Unable to connect to the mongoDB server. Error: ', err);
			cb(err, null);
		}
		//We are connected successfully.
		console.log('Connection established to ', url);
		var collection = db.collection('restaurants');
		collection.updateMany(restaurant, function (err, result) {
			console.log('Connection closed...' );
			db.close();

			if (err) {
				console.log('err' + err);
				return cb(err, null);
			} else if (result.insertedCount) {
				console.log('Restaurant updated successfully...');
				return cb(null, result);
			}
		});
	});
}

//done
function deleteRestaurant(id, cb) {
	MongoClient.connect(url, function (err, db) {
		if (err) {
			console.log('Unable to connect to the mongoDB server. Error: ', err);
			return cb(err, null);
		}
		//We are connected successfully.
		console.log('Connection established to ', url);
		var collection = db.collection('restaurants');
		collection.deleteOne({'restaurant_id' : id}, function (err, result) {
			console.log('Connection closed...');
			db.close();
			if (err) {
				console.log('err' + err);
				return cb(err, null);
			} else if (result) {

				console.log('Restaurant with id:' + id +' deleted successfully...');
				return cb(null, result);
			}
		});
	});
}

//done
function findRestaurant(id, cb) {
	MongoClient.connect(url, function (err, db) {
		if (err) {
			console.log('Unable to connect to the mongoDB server. Error: ', err);
			cb(err, null);
		}
		//We are connected successfully.
		console.log('Connection established to ', url);
		var collection = db.collection('restaurants');
		collection.find({'restaurant_id' : id}).toArray(function (err, result) {
			console.log('Connection closed...' + id);
			db.close();

			if (err) {
				console.log('err' + err);
				return cb(err, null);
			} else if (result.length) {
				console.log('result : ' + result);
				return cb(null, result);
			} else {
				console.log('No data found...');
				return cb(null, null);
			}
		});
	});
}

//done
function findAllRestaurants(cb) {
	MongoClient.connect(url, function (err, db) {
		if (err) {
			console.log('Unable to connect to the mongoDB server. Error: ', err);
			cb(err, null);
		}
		//We are connected successfully.
		console.log('Connection established to ', url);
		var collection = db.collection('restaurants');
		collection.find().limit(10).toArray(function (err, result) {
			if (err) {
				console.log('err' + err);
				console.log('Connection closed...');
				db.close();
				return cb(err, null);
			} else if (result.length) {
				console.log('result : ' + result);
				console.log('Connection closed...');
				db.close();
				return cb(null, result);
			} else {
				console.log('No data found...');
				console.log('Connection closed...');
				db.close();
				return cb(null, null);
			}
		});
	});
}


exports.findAllRestaurants = findAllRestaurants;
exports.findRestaurant = findRestaurant;
exports.addRestaurant = addRestaurant;
exports.updateRestaurant = updateRestaurant;
exports.deleteRestaurant = deleteRestaurant;
