const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const session = require('express-session');
const path = require('path')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(session({
    secret: 'health_center',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));
// process.on('unhandledRejection', (reason, promise) => {
//     console.error('Unhandled Rejection at:', promise, 'reason:', reason);
// });

// process.on('uncaughtException', (error) => {
//     console.error('Uncaught Exception:', error);
// });

const staticDIR = ['public','src','node_modules']
staticDIR.forEach((folderName)=>{
    app.use(express.static(path.join(__dirname,folderName)))
})

const healthRouter = require('./router/healthRouter')
app.use(healthRouter)

const $PORT = 1000
app.listen($PORT, ()=>{
    console.log(`Server is running on http://localhost:${$PORT}`)
})