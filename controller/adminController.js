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

exports.adminpage = (req,res)=>{
    try {
        res.sendFile(getFilePath('/../public','admin.html'))
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        })
    }
}

//# MANAGE USER #
exports.getUser = (req,res)=>{
    try {
        var data;
        res.json(data)
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        }) 
    }
}
exports.getSpecificUser = (req,res)=>{
    try {
        const {id,username,password} = req.body
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        }) 
    }
}
exports.createUser = (req,res)=>{
    try {
        const {username,password} = req.body
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        }) 
    }
}
exports.updateUser = (req,res)=>{
    try {
        const {id,username,password} = req.body
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        }) 
    }
}
exports.deleteUser = (req,res)=>{
    try {
        const {id} = req.body
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        }) 
    }
}

//# MANAGE HEALTH CENTER #
exports.getCenter = (req,res)=>{
    try {
        var data;
        res.json(data)
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        }) 
    }
}
exports.getSpecificCenter = (req,res)=>{
    try {
        const {id,username,password} = req.body
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        }) 
    }
}
exports.createCenter = (req,res)=>{
    try {
        const {username,password} = req.body
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        }) 
    }
}
exports.updateCenter = (req,res)=>{
    try {
        const {id,username,password} = req.body
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        }) 
    }
}
exports.deleteCenter = (req,res)=>{
    try {
        const {id} = req.body
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        }) 
    }
}

//# ACTIVITY LOGS #
exports.getLogs = (req,res)=>{
    try {
        const {id} = req.body
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        }) 
    }
}