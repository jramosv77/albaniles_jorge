const express = require("express")
const router = express.Router()
const controller = require("../controllers/auth")
const { loginParamsValidator } = require("../validators/authValidator")

router.get("/login", controller.getLogin)
router.post("/login", loginParamsValidator, controller.login)
router.post("/logout", controller.logout)

router.post("/token", controller.getToken);

module.exports = router

