const mySql = require('mysql')
const dbConf = require('../config/db.config')

const dbConnect = mySql.createConnection({
    host: dbConf.HOST,
    user: dbConf.USER,
    password: dbConf.PASS,
    database: dbConf.DATABASE
})
dbConnect.connect()

module.exports = dbConnect