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

exports.healthpage = (req,res)=>{
    try {
        res.sendFile(getFilePath('/../public','user.html'))
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        })
    }
}


//FORM-TYPE
exports.getSpecificFormType = async (req,res)=>{
    try {
        const {id} = req.body

        const setQuery = `SELECT * FROM consultation;`
        const valQuery = [id]
        const result = await createQuery(setQuery,valQuery)

        res.json({
            data:result[0],
            error:false
        })
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        })
    }
}
exports.getFormType = async (req,res)=>{
    try {
        const setQuery = `SELECT * FROM form_type;`
        const result = await createQuery(setQuery)

        res.json({
            data:result,
            error:false
        })
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        })
    }
}
exports.setFormType = async (req,res)=>{
    try {
        const {} = req.body
        
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        })
    }
}
exports.putFormType = async (req,res)=>{
    try {
        const {} = req.body
        
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        })
    }
}
exports.deleteFormType = async (req,res)=>{
    try {
        const {} = req.body
        
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        })
    }
}


//CHECK IF EXIST
const checkExist = async (name)=>{
    return(
        new Promise(async (resolve,reject)=>{
            const setQuery = `
            SELECT 'Prenatal' AS form_type, id, name, date_created
            FROM prenatal
            WHERE name = ?

            UNION ALL

            SELECT 'Immunize' AS form_type, id, name, date_created
            FROM immunize
            WHERE name = ?

            UNION ALL

            SELECT 'Consultation' AS form_type, id, name, date_created
            FROM consultation
            WHERE name = ?
            ORDER BY date_created ASC;`
            const valQuery = [name,name,name]
            const result = await createQuery(setQuery,valQuery)
            if(result.error) reject(result.error)
            resolve(result.length)
        })
    )
}


//CONSULTATION
exports.getConsultation = async (req,res)=>{
    try {
        const setQuery = `SELECT * FROM consultation;`
        const result = await createQuery(setQuery)
        res.json({
            data:result,
            error:false
        })
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        })
    }
}

exports.getSpecificConsultation = async (req,res)=>{
    try {
        const {id} = req.params
        
        const setQuery = `SELECT * FROM consultation WHERE id=? LIMIT 1;`
        const valQuery = [id]
        const result = await createQuery(setQuery,valQuery)

        res.json({
            data:result[0],
            error:false
        })
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        })
    }
}

exports.setConsultation = async (req,res)=>{
    try {
        const {name,chiefComplaint,bloodPressure,pulseRate,temperature,diagnosis,treatmentPlan,medicationsPrescribed,followupDate,address} = req.body

        const isExist = await checkExist(name.toUpperCase())
        if(isExist!==0) throw new Error(`${name} is already Exist!.`)
        const setQuery = `
        INSERT INTO consultation(
        name,
        complaint,
        blood_pressure,
        pulse_rate,
        temperature,
        diagnosis,
        treatment_plan,
        medication_prescribed,
        followup_date,
        address,
        status,
        date_created
        ) 
        VALUES(?,?,?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP);`
        const valQuery = [
            name.toUpperCase(),
            chiefComplaint,
            bloodPressure,
            pulseRate,
            temperature,
            diagnosis,
            treatmentPlan,
            medicationsPrescribed,
            followupDate,
            address,
            0 //status
        ]
        const result = await createQuery(setQuery,valQuery)

        res.json({
            message:'Created Successfully.',
            error:false
        })
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        })
    }
}

exports.putConsultation = async (req,res)=>{
    try {
        const {id,patientName,chiefComplaint,bloodPressure,pulseRate,temperature,diagnosis,treatmentPlan,medicationsPrescribed,followupDate,address} = req.body

        const setQuery = `
        UPDATE consultation SET
        name=?,
        complaint=?,
        blood_pressure=?,
        pulse_rate=?,
        temperature=?,
        diagnosis=?,
        treatment_plan=?,
        medication_prescribed=?,
        followup_date=?,
        address=?,
        date_updated=CURRENT_TIMESTAMP
        WHERE id=? LIMIT 1;`
        const valQuery = [
            patientName.toUpperCase(),
            chiefComplaint,
            bloodPressure,
            pulseRate,
            temperature,
            diagnosis,
            treatmentPlan,
            medicationsPrescribed,
            followupDate,
            address,
            id
        ]
        const result = await createQuery(setQuery,valQuery)

        res.json({
            message:'Updated Successfully.',
            error:false
        })
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        })
    }
}

exports.deleteSpecificConsultation = async (req,res)=>{
    try {
        const {id} = req.body

        const setQuery = `DELETE FROM consultation WHERE id=? LIMIT 1;`
        const valQuery = [id]
        const result = await createQuery(setQuery,valQuery)

        res.json({
            data:'Deleted Successfully!.',
            error:false
        })
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        })
    }
}

//PRENATAL
exports.getPrenatal = async (req,res)=>{
    try {
        const setQuery = `SELECT * FROM prenatal;`
        const result = await createQuery(setQuery)

        res.json({
            data:result,
            error:false
        })
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        })
    }
}

exports.getSpecificPrenatal = async (req,res)=>{
    try {
        const {id} = req.params
        
        const setQuery = `SELECT * FROM prenatal WHERE id=? LIMIT 1;`
        const valQuery = [id]
        const result = await createQuery(setQuery,valQuery)

        res.json({
            data:result[0],
            error:false
        })
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        })
    }
}

exports.setPrenatal = async (req,res)=>{
    try {
        const {name,dateOfBirth,address,lastMenstrualPeriod,expectedDateOfDelivery,followupDate} = req.body

        const isExist = await checkExist(name.toUpperCase())
        if(isExist!==0) throw new Error(`${name} is already Exist!.`)

        const setQuery = `
        INSERT INTO prenatal(
        name,
        date_birth,
        address,
        last_menstrual_period,
        expected_date_delivery,
        followup_date,
        status,
        date_created
        ) 
        VALUES(?,?,?,?,?,?,?,CURRENT_TIMESTAMP);`
        const valQuery = [
            name.toUpperCase(),
            dateOfBirth,
            address,
            lastMenstrualPeriod,
            expectedDateOfDelivery,
            followupDate,
            0 // status
        ]
        const result = await createQuery(setQuery,valQuery)

        res.json({
            message:'Created Successfully.',
            error:false
        })
    } catch (error) {
        console.log(error)
        res.json({
            message:error.message,
            error:true
        })
    }
}

exports.putPrenatal = async (req,res)=>{
    try {
        const {id,motherName,dateOfBirth,address,lastMenstrualPeriod,expectedDateOfDelivery} = req.body

        const setQuery = `
        UPDATE prenatal SET 
        name=?,
        date_birth=?,
        address=?,
        last_menstrual_period=?,
        expected_date_delivery=?,
        date_updated=CURRENT_TIMESTAMP
        WHERE id=? LIMIT 1;`
        const valQuery = [
            motherName.toUpperCase(),
            dateOfBirth,
            address,
            lastMenstrualPeriod,
            expectedDateOfDelivery,
            id
        ]
        const result = await createQuery(setQuery,valQuery)

        res.json({
            message:'Updated Successfully.',
            error:false
        })
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        })
    }
}

exports.deleteSpecificPrenatal = async (req,res)=>{
    try {
        const {id} = req.body
        const setQuery = `DELETE FROM prenatal WHERE id=? LIMIT 1;`
        const valQuery = [id]
        const result = await createQuery(setQuery,valQuery)

        res.json({
            data:'Deleted Successfully!.',
            error:false
        })
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        })
    }
}

//IMMUNIZE
exports.getImmunize = async (req,res)=>{
    try {
        const setQuery = `SELECT * FROM immunize;`
        const result = await createQuery(setQuery)

        res.json({
            data:result,
            error:false
        })
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        })
    }
}

exports.getSpecificImmunize = async (req,res)=>{
    try {
        const {id} = req.params
        
        const setQuery = `SELECT * FROM immunize WHERE id=? LIMIT 1;`
        const valQuery = [id]
        const result = await createQuery(setQuery,valQuery)

        res.json({
            data:result[0],
            error:false
        })
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        })
    }
}

exports.setImmunize = async (req,res)=>{
    try {
        const {name,parentGuardianName,dateOfBirth,address,nextScheduledVaccination,vaccination} = req.body

        const isExist = await checkExist(name.toUpperCase())
        if(isExist!==0) throw new Error(`${name} is already Exist!.`)
            
        const setQuery = `
        INSERT INTO immunize(
        name,
        parent,
        date_birth,
        address,
        next_schedule,
        vaccine,
        status,
        date_created
        ) 
        VALUES(?,?,?,?,?,?,?,CURRENT_TIMESTAMP);`
        const valQuery = [
            name.toUpperCase(),
            parentGuardianName.toUpperCase(),
            dateOfBirth,
            address,
            nextScheduledVaccination,
            vaccination,
            0 //status
        ]
        const result = await createQuery(setQuery,valQuery)

        res.json({
            message:'Created Successfully.',
            error:false
        })
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        })
    }
}

exports.putImmunize = async (req,res)=>{
    try {
        const {id,childName,parentGuardianName,dateOfBirth,address,nextScheduledVaccination,vaccination} = req.body

        const setQuery = `
        UPDATE immunize SET 
        name=?,
        parent=?,
        date_birth=?,
        address=?,
        next_schedule=?,
        vaccine=?,
        date_updated=CURRENT_TIMESTAMP 
        WHERE id=? LIMIT 1;`
        const valQuery = [
            childName.toUpperCase(),
            parentGuardianName.toUpperCase(),
            dateOfBirth,
            address,
            nextScheduledVaccination,
            vaccination,
            id
        ]

        const result = await createQuery(setQuery,valQuery)
        res.json({
            message:'Updated Successfully.',
            error:false
        })
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        })
    }
}

exports.deleteSpecificImmunize = async (req,res)=>{
    try {
        const {id} = req.body
        
        const setQuery = `DELETE FROM immunize WHERE id=? LIMIT 1;`
        const valQuery = [id]
        const result = await createQuery(setQuery,valQuery)

        res.json({
            data:'Deleted Successfully!.',
            error:false
        })
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        })
    }
}


//RESOURCES
exports.getResources = async (req,res)=>{
    try {
        const setQuery = `SELECT * FROM resources;`
        const result = await createQuery(setQuery)

        res.json({
            data:result,
            error:false
        })
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        })
    }
}

exports.getSpecificResources = async (req,res)=>{
    try {
        const {id} = req.params
        
        const setQuery = `SELECT * FROM resources WHERE id=? LIMIT 1;`
        const valQuery = [id]
        const result = await createQuery(setQuery,valQuery)

        res.json({
            data:result[0],
            error:false
        })
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        })
    }
}

exports.setResources = async (req,res)=>{
    try {
        const {name,quantity,dateExpired,manufacturer,description} = req.body

        const setQuery = `
        INSERT INTO resources(name,quantity,manufacturer,type,status,date_expired,description,date_created) 
        VALUES(?,?,?,?,?,?,?,CURRENT_TIMESTAMP);`
        const valQuery = [
            name,
            quantity,
            manufacturer,
            1, //Type
            0, //Status
            dateExpired,
            description
        ]
        const result = await createQuery(setQuery,valQuery)

        res.json({
            message:'Created Successfully.',
            error:false
        })
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        })
    }
}

exports.putResources = async (req,res)=>{
    try {
        const {id,name,quantity,dateExpired,manufacturer,description} = req.body

        const setQuery = `
        UPDATE resources SET 
        name=?,
        quantity=?,
        manufacturer=?,
        type=?,
        status=?,
        date_expired=?,
        description=?,
        date_updated=CURRENT_TIMESTAMP
        WHERE id=? LIMIT 1;`
        const valQuery = [
            name,
            quantity,
            manufacturer,
            1, //Type
            0, //Status
            dateExpired,
            description,
            id
        ]
        const result = await createQuery(setQuery,valQuery)

        res.json({
            message:'Updated Successfully.',
            error:false
        })
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        })
    }
}

exports.deleteSpecificResources = async (req,res)=>{
    try {
        const {id} = req.body
        
        const setQuery = `DELETE FROM resources WHERE id=? LIMIT 1;`
        const valQuery = [id]
        const result = await createQuery(setQuery,valQuery)

        res.json({
            data:'Deleted Successfully!.',
            error:false
        })
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        })
    }
}

//HEALTH RECORDS
exports.getRecords = async (req,res)=>{
    try {
        const setQuery = `
        SELECT c.form_type_id ,c.id, c.name, c.date_created
        FROM (
            SELECT 'Prenatal' AS form_type_id, id, name, date_created FROM prenatal
            UNION ALL
            SELECT 'Immunize' AS form_type_id, id, name, date_created FROM immunize
            UNION ALL
            SELECT 'Consultation' AS form_type_id, id, name, date_created FROM consultation
        ) AS c
        JOIN (
            SELECT name, MIN(date_created) AS first_date
            FROM (
                SELECT name, date_created FROM prenatal
                UNION ALL
                SELECT name, date_created FROM immunize
                UNION ALL
                SELECT name, date_created FROM consultation
            ) AS sub
            GROUP BY name
        ) AS first_entry
        ON c.name = first_entry.name AND c.date_created = first_entry.first_date;`
        const result = await createQuery(setQuery)

        res.json({
            data:result,
            error:false
        })
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        })
    }
}

exports.getSpecificRecords = async (req,res)=>{
    try {
        const {resources_id} = req.body
        
        const setQuery = `SELECT * FROM resources WHERE id=?;`
        const valQuery = [resources_id]
        const result = await createQuery(setQuery,valQuery)

        res.json({
            data:result,
            error:false
        })
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        })
    }
}
exports.getSpecificAllRecords = async (req,res)=>{
    try {
        const {name} = req.body
        
        const uName = name.toUpperCase()
        const setQuery = `
        SELECT 'Prenatal' AS form_type, id, name, date_created
        FROM prenatal
        WHERE name = ?

        UNION ALL

        SELECT 'Immunize' AS form_type, id, name, date_created
        FROM immunize
        WHERE name = ?

        UNION ALL

        SELECT 'Consultation' AS form_type, id, name, date_created
        FROM consultation
        WHERE name = ?
        ORDER BY date_created ASC;`
        const valQuery = [uName,uName,uName]
        const result = await createQuery(setQuery,valQuery)

        res.json({
            data:result,
            error:false
        })
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        })
    }
}

exports.setRecords = async (req,res)=>{
    try {
        const {name,quantity,dateExpired,manufacturer,description} = req.body

        const setQuery = `
        INSERT INTO resources(name,quantity,manufacturer,type,status,date_expired,description,date_created) 
        VALUES(?,?,?,?,?,?,?,CURRENT_TIMESTAMP);`
        const valQuery = [
            name.toUpperCase(),
            quantity,
            manufacturer,
            1, //Type
            0, //Status
            description,
            dateExpired
        ]
        const result = await createQuery(setQuery,valQuery)

        res.json({
            message:'Created Successfully.',
            error:false
        })
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        })
    }
}

exports.putRecords = async (req,res)=>{
    try {
        const {immunize_id,patientName,dateOfConsultation,chiefComplaint,bloodPressure,pulseRate,temperature} = req.body
        
        const setQuery = `
        UPDATE INTO resources 
        SET name=?, date_consultation=?, complaint=?, bloodpressure=?, pulserate=?, temperature=?
        WHERE id=?;`
        const valQuery = [patientName,dateOfConsultation,chiefComplaint,bloodPressure,pulseRate,temperature,immunize_id]
        const result = await createQuery(setQuery,valQuery)

        res.json({
            message:'Updated Successfully.',
            error:false
        })
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        })
    }
}

exports.deleteSpecificRecords = async (req,res)=>{
    try {
        const {id} = req.body
        
        const setQuery = `DELETE FROM resources WHERE id=? LIMIT 1;`
        const valQuery = [id]
        const result = await createQuery(setQuery,valQuery)

        res.json({
            data:'Deleted Successfully!.',
            error:false
        })
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        })
    }
}


//# APPOINTMENT

exports.getSpecificDayAppointment = async (req,res)=>{
    try {
        const {date} = req.body

        const setQuery = `
        SELECT 'Prenatal' AS form_type, id, name, date_created, followup_date, status
        FROM prenatal
        WHERE DATE(followup_date) = ?

        UNION ALL

        SELECT 'Immunize' AS form_type, id, name, date_created, next_schedule, status
        FROM immunize
        WHERE DATE(next_schedule) = ?

        UNION ALL

        SELECT 'Consultation' AS form_type, id, name, date_created, followup_date, status
        FROM consultation
        WHERE DATE(followup_date) = ?

        ORDER BY date_created ASC;`
        const valQuery = [date,date,date]
        console.log(valQuery)
        const result = await createQuery(setQuery,valQuery)

        res.json({
            data:result,
            error:false
        })
    } catch (error) {
        console.log(error)
        res.json({
            message:error.message,
            error:true
        })
    }
}

exports.getAppointment = async (req,res)=>{
    try {
        const setQuery = `
        WITH combined AS (
            SELECT name, date_created, followup_date FROM prenatal
            UNION ALL
            SELECT name, date_created, next_schedule FROM immunize
            UNION ALL
            SELECT name, date_created, followup_date FROM consultation
        ),
        ranked AS (
            SELECT name, date_created, followup_date,
                ROW_NUMBER() OVER (PARTITION BY DATE(followup_date) ORDER BY date_created ASC) AS rn
            FROM combined
        )
        SELECT name, date_created, followup_date
        FROM ranked
        WHERE rn <= 5
        ORDER BY followup_date ASC, date_created ASC;`

        const result = await createQuery(setQuery)

        res.json({
            data:result,
            error:false
        })
    } catch (error) {
        res.json({
            message:error.message,
            error:true
        })
    }
}