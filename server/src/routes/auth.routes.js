const router = require("express").Router();
const AuthoController = require("../controllers/auth.controller");

router.post("/login", AuthoController.login);

router.post("/register", AuthoController.register);

module.exports = router;
