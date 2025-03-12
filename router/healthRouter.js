const express = require('express')
const router = express.Router()
const login = require('./../controller/loginController')
const user = require('../controller/userController')
const admin = require('../controller/adminController')

//REDIRECT PAGE
router.get('/',login.redirectpage)

//LOGIN
router.route('/login')
    .get(login.homepage)
    .post(login.login)
    
//USER
router.get('/health-center',user.healthpage)

router.route('/form-type')
    .get(user.getFormType)
    .post(user.setFormType)
    .put(user.putFormType)
    .delete(user.deleteFormType)


//CONSULTATION
router.get('/consultation/:id',user.getSpecificConsultation)
router.route('/consultation')
    .get(user.getConsultation)
    .post(user.setConsultation)
    .put(user.putConsultation)
    .delete(user.deleteSpecificConsultation)

//PRENATAL
router.get('/prenatal/:id',user.getSpecificPrenatal)
router.route('/prenatal')
    .get(user.getPrenatal)
    .post(user.setPrenatal)
    .put(user.putPrenatal)
    .delete(user.deleteSpecificPrenatal)

//IMMUNIZE
router.get('/immunize/:id',user.getSpecificImmunize)
router.route('/immunize')
    .get(user.getImmunize)
    .post(user.setImmunize)
    .put(user.putImmunize)
    .delete(user.deleteSpecificImmunize)

router.get('/records/:id',user.getSpecificRecords)
router.post('/allrecords',user.getSpecificAllRecords)
router.route('/records')
    .get(user.getRecords)
    .post(user.setRecords)
    .put(user.putRecords)
    .delete(user.deleteSpecificRecords)

router.get('/resources/:id',user.getSpecificResources)
router.route('/resources')
    .get(user.getResources)
    .post(user.setResources)
    .put(user.putResources)
    .delete(user.deleteSpecificResources)

router.route('/appointment')
    .get(user.getAppointment)
    .post(user.getSpecificDayAppointment)

//ADMIN
router.get('/admin-center',admin.adminpage)

router.get('*',login.redirectpage)
module.exports = router