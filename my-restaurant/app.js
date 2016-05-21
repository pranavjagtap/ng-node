var express = require('express');
var db = require('./db');
var bodyParser = require('body-parser');
var path = require('path');
var config = require('./config');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : config.mysqlConfig.host,
  user     : config.mysqlConfig.user,
  password : config.mysqlConfig.password,
  database : config.mysqlConfig.database
});

var app = express();

app.set('superSecret', config.authenConfig.secret); // secret variable

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.use(express.static(path.join(__dirname, 'public')));

// // view engine setup
// app.set('views', path.join(__dirname, 'public'));

//to accept cross origin requests.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  next();
});


/*
  Authentication code start
*/
// get an instance of the router for api routes
var apiRoutes = express.Router();

// route to authenticate a user using Mysql (start)
apiRoutes.post('/login/:userdata' , function (req, res, next) {
	var user = JSON.parse(req.params.userdata);
  console.log(user);
  var query = "SELECT * from testlogin where name='"+ user.email+"' and password='"+ user.password +"'";
  console.log('user :' + query);

  connection.query(query, function(err, rows, fields) {
    if (err) throw err;
    console.log('The data is: \n', rows);
    console.log('The data length is: \n', rows.length);
    if (rows.length === 1) {
      console.log('rows[0] : ' + rows[0]);

      // create a token
      var token = jwt.sign(user, app.get('superSecret'), {
        //expiresInMinutes: 1440 // expires in 24 hours
      });

      // return the information including token as JSON
      res.json({
        success: true,
        message: 'Enjoy your token!',
        token: token,
        data: rows[0]
      });
    }
  });

});
// authenticate a user using Mysql (end)

// route middleware to verify a token
// apiRoutes.use(function(req, res, next) {
//   // check header or url parameters or post parameters for token
//   var token = req.body.token || req.query.token || req.headers['x-access-token'];
//
//   // decode token
//   if (token) {
//
//     // verifies secret and checks exp
//     jwt.verify(token, app.get('superSecret'), function(err, decoded) {
//       if (err) {
//         return res.json({ success: false, message: 'Failed to authenticate token.' });
//       } else {
//         // if everything is good, save to request for use in other routes
//         req.decoded = decoded;
//         next();
//       }
//     });
//
//   } else {
//
//     // if there is no token
//     // return an error
//     return res.status(403).send({
//         success: false,
//         message: 'No token provided.'
//     });
//   }
// });
//

// // apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);

/*
  Authentication code end
*/

apiRoutes.get('/', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// app.get('/', function (req, res, next) {
// 	res.send('Welcome');
// 	res.render('home');
// });


//get request for finding specific record from database
apiRoutes.get('/restaurants/:id', function (req, res, next) {
	var id = req.params.id;
	db.findRestaurant(id, function (err, data) {
		if (err) { return cb(err, null)};
		if (data) {
			res.send(data);
		} else {
			res.send('No data found');
		}
	});
});

//get request for finding all records from database
apiRoutes.get('/restaurants', function (req, res, next) {
	db.findAllRestaurants(function (err, data) {
		//if (err) { return cb(err, null)};
		if (err) { res.send(err)};
		if (data) {
			res.send(data);
		} else {
			res.send('No data found');
		}
	});
});

//post request for inserting data to database
apiRoutes.post('/restaurants' , function (req, res, next) {
//	console.dir('Response body');
//	console.dir(req.body);
	var resaturantData = req.body;
	db.addRestaurant(resaturantData, function (err, data) {
		// if (err) { return cb(err, null)};
		if (err) { res.send(err)}
		//Error: Can't set headers after they are sent. Send headers only for once. So use if else blocks.
		else if (data) {
			res.send(data);
		} else {
			res.send('No data found');
		}
	});
});

//post request for inserting multiple data to database
apiRoutes.post('/restaurants' , function (req, res, next) {
	//get post data from the body inorder to insert the record.
	var restaurant = ''; //data from body;
	db.addRestaurants(function (err, data) {
		//if (err) { return cb(err, null)};
		if (err) { res.send(err)};
		if (data) {
			res.send(data);
		} else {
			res.send('No data found');
		}
	});
});

//put request for updating records in database
apiRoutes.put('/restaurants' , function (req, res, next) {
	//get put data from the body inorder to update the record
	var restaurant = ''; //data from body;
	db.update(function (err, data) {
		//if (err) { return cb(err, null)};
		if (err) { res.send(err)};
		if (data) {
			res.send(data);
		} else {
			res.send('No data found');
		}
	});
});

//delete request for deleteing a record from database
apiRoutes.delete('/restaurants/:id' , function (req, res, next) {
	//delete the record with specified id.
	var id = req.params.id;
	db.deleteRestaurant(id, function (err, data) {
		//if (err) { return cb(err, null)};
		if (err) { res.send(err)};
		if (data) {
			res.send(data);
		} else {
			res.send('No data found');
		}
	});
});


//apiRoutes.listen() will give an error.
app.listen(3000, function () {
	console.log('Listening on localhost:3000');
});
