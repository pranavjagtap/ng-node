var mysql = require('mysql');
var config = require('./config');

var connection = mysql.createConnection({
  host     : config.mysqlConfig.host,
  user     : config.mysqlConfig.user,
  password : config.mysqlConfig.password,
  database : config.mysqlConfig.database
});

function openConnection() {
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + connection.threadId);
  });
}

function closeConnection() {
  connection.end(function(err) {
    // The connection is terminated now
  });
}

function executeQuery(query, type) {
  if (type === "insert" || type === "update" || type === "delete") {
    // connection.connect(function(err) {
    //   if (err) {
    //     console.error('error connecting: ' + err.stack);
    //     return;
    //   }
    //   console.log('connected as id ' + connection.threadId);
    // });
    connection.query(query, function(err, rows, fields) {
      if (err) throw err;
      console.log('query executed successfully');
    });
    // connection.end(function(err) {
    //   // The connection is terminated now
    // });
  }
  if (type === "search") {
    // connection.connect(function(err) {
    //   if (err) {
    //     console.error('error connecting: ' + err.stack);
    //     return;
    //   }
    //   console.log('connected as id ' + connection.threadId);
    // });
    connection.query(query, function(err, rows, fields) {
      if (err) throw err;
      console.log('The data is: \n', rows);
    });
    // connection.end(function(err) {
    //   // The connection is terminated now
    // });
  }
}

function insert() {
  // openConnection();
  var query = "INSERT into testlogin values ( 2, 'admin', 'admin')";
  executeQuery(query, "insert");
  // closeConnection();
}

function update() {
  // openConnection();
  var query = "UPDATE testlogin set ";
  executeQuery(query, "update");
  // closeConnection();
}

function remove() {
  // openConnection();
  var query = "delete from testlogin where ";
  executeQuery(query, "delete");
  // closeConnection();
}

function search() {
  // openConnection();
  var query = "SELECT * from testlogin";
  executeQuery(query, "search");
  // closeConnection();
}

//search();
function main() {
  openConnection();
  search();
  insert();
  search();
  closeConnection();
}

main();
