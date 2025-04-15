const router = require("express").Router();

const userController = require("../controllers/user.controller");

router.get("/me", userController.getMe);
router.put("/me", userController.updateMe);
module.exports = router;
