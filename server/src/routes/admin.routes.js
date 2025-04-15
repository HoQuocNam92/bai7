const router = require("express").Router();
const AdminController = require("../controllers/admin.controller");
router.get("/users", AdminController.getAllUser);
router.put("/users/:id", AdminController.editUser);
router.delete("/users/:id", AdminController.deleteUser);

router.get("/", AdminController.getAllProduct);
router.post("/products", AdminController.createProduct);
router.put("/products/:id", AdminController.eidtProduct);
router.delete("/products/:id", AdminController.deleteProduct);

module.exports = router;
