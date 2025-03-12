const path = require('path')
const connectMYSQL = require('./../config/mysqlDB')
const getFilePath = (folder, file) => path.join(__dirname, folder, file);

const createQuery = async (setQuery,queryValue)=>{
    return(
        new Promise((resolve,reject)=>{
            connectMYSQL.getConnection((error,connection)=>{
                if(connection===undefined) return reject({message:'DATABASE ERROR'})
                connection.query(setQuery,queryValue,(err,result)=>{
                    connection.release()
                    if(err) return reject({message:err.code})
                    resolve(result)
                })
            })
        })
    )
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
// USER

exports.getUserSpecific = async (req,res)=>{
    try {
        const  {id} = req.body

        const setQuery = `SELECT * FROM user WHERE id=? LIMIT 1;`
        const valQuery = [id]
        const result = await createQuery(setQuery,valQuery)

        res.json({
            data:result,
            error:true
        })
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        })
    }
}
exports.getUser = async (req,res)=>{
    try {
        const setQuery = `SELECT * FROM user;`
        const result = await createQuery(setQuery)

        res.json({
            data:result,
            error:true
        })
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        })
    }
}
exports.setUser = async (req,res)=>{
    try {
        const  {username,password,fname,lname,address,date_birth,permission} = req.body

        const existQuery = `SELECT * FROM user WHERE username=? LIMIT 1;`
        const isExist = await createQuery(existQuery,[username])
        if(Boolean(isExist.length)) throw new Error(`Username ${username} is already taken.`)

        const setQuery = `
        INSERT INTO user(
        username,
        password,
        fname,
        lname,
        address,
        date_birth,
        permission,
        status,
        date_created) 
        VALUES(?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP);`
        const valQuery = [
            username,
            btoa(password),
            fname,
            lname,
            address,
            date_birth,
            JSON.stringify(permission),
            0, //status
        ]
        const result = await createQuery(setQuery,valQuery)

        res.json({
            message:'Created Successsfully!.',
            error:false
        })
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        })
    }
}
exports.putUser = async (req,res)=>{
    try {
        const  {id, username,password,fname,lname,address,date_birth,permission,status} = req.body

        const setQuery = `
        UPDATE user SET 
        username=?,
        password=?,
        fname=?,
        lname=?,
        address=?,
        date_birth=?,
        permission=?,
        status=?,
        date_updated=CURRENT_TIMESTAMP
        WHERE id=? LIMIT 1;`
        const valQuery = [
            username,
            password,
            fname,
            lname,
            address,
            date_birth,
            permission,
            status,
            id
        ]

        const result = await createQuery(setQuery,valQuery)

        res.json({
            message:'Updated Successsfully!.',
            error:true
        })
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        })
    }
}
exports.deleteUser = async (req,res)=>{
    try {
        const  {id} = req.body

        const setQuery = `DELETE FROM user WHERE id=? LIMIT 1;`
        const valQuery = [id]
        const result = await createQuery(setQuery,valQuery)

        res.json({
            message:'Deleted Successsfully!.',
            error:true
        })
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