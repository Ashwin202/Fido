const router = require('express').Router()
const adminRouter = require('./admins')
const mentorRouter = require('./mentors')
const controller = require('./controller')



router.get('/domain', controller.getDomainController)
router.put('/domain/:id', controller.updateDomainController)
router.patch('/domain/:id', controller.deleteDomainController)
router.post('/domain', controller.addDomainController)
router.get('/form/:id', controller.getFormController)
router.post('/form', controller.addFormController)
router.put('/form/:id', controller.updateFormController)
router.patch('/form/:id', controller.deleteFormController)

router.use('/admins', adminRouter)
router.use('/mentors', mentorRouter)

module.exports = router