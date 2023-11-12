const router = require("express").Router()
const adminRouter = require("./admins")
const userRouter = require("./users")
const eventRouter = require("./event")
const controller = require("./controller")
const authRouter = require("./auth")
const passport = require("passport")

router.use(authRouter)

router.use(passport.authenticate("jwt", { session: true }))

router.get("/domain", controller.getDomainController)
router.put("/domain/:id", controller.updateDomainController)
router.patch("/domain/:id", controller.deleteDomainController)
router.post("/domain", controller.addDomainController)

router.get("/form/:id", controller.getFormController)
router.post("/form", controller.addFormController)
router.put("/form/:id", controller.updateFormController)
router.patch("/form/:id", controller.deleteFormController)

router.post("/groups", controller.addGroupController)
router.get("/group", controller.getGroupController)
router.put("/group/:id", controller.updateGroupController)
router.patch("/group/:id", controller.deleteGroupController)

router.put("/team/:id", controller.updateTeamController)
router.patch("/team/:id", controller.deleteTeamController)
router.get("/team", controller.getTeamController)
router.post("/team", controller.addTeamController)

router.use("/admins", adminRouter)
router.use("/users", userRouter)
router.use("/events", eventRouter)

module.exports = router
