mongoConfig = {
    'url': 'mongodb://127.0.0.1:27017/test'
}

mysqlConfig = {
    "host": "localhost",
    "user": "root",
    "password": "ubuntu14",
    "database": "testdb"
}

authenConfig = {
  'secret': 'ilovescotchyscotch'
}

globalConfig = {
  'database': 'mongodb'
}
exports.mongoConfig = mongoConfig;
exports.mysqlConfig = mysqlConfig;
exports.authenConfig = authenConfig;
exports.globalConfig = globalConfig;
