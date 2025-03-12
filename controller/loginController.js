const path = require('path')
const connectMYSQL = require('./../config/mysqlDB')
const getFilePath = (folder, file) => path.join(__dirname, folder, file);

const createQuery = async (setQuery,queryValue)=>{
    new Promise((reject,resolve)=>{
        connectMYSQL.query(setQuery,queryValue,(err,result)=>{
            if(err) reject(err)
            resolve(result)
        })
    })
}

exports.redirectpage = (req,res)=>{
    try {
        res.redirect('/login')
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        })
    }
}

exports.homepage = (req,res)=>{
    try {
        res.sendFile(getFilePath('/../public','login.html'))
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        })
    }
}

exports.login = (req,res)=>{
    try {
        const {username,password} = req.body
        console.log(req.body)
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        })
    }
}