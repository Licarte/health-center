const mysql = require('mysql2')

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections:true,
    connectionLimit:200,
    maxIdle:200,
    idleTimeout:60000,
    // queueLimit:0,
    enableKeepAlive:true,
    keepAliveInitialDelay:0,
})

const connectMySQL = () => {
    connection.getConnection((err,connection)=>{
        if(connection===undefined) return console.log('DATABASE IS NOT CONNECTED!.')
        Boolean(err)?(console.log(`DATABASE ERROR: ${err.message}`,setTimeout(connectMySQL,2000))):(console.log(`Connected to GLPI Database`),connection.release())
    })
};
connectMySQL()
module.exports = connection
