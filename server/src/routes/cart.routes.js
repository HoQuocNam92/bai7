const router = require("express").Router();
const CartController = require("../controllers/cart.controller");
router.post("/", CartController.AddCart);
router.get("/", CartController.GetCart);
router.delete("/:id", CartController.DeleteCart);
module.exports = router;
