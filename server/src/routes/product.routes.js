const router = require("express").Router();
const productController = require("../controllers/product.controller");

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/post", productController.getProductById);

module.exports = router;
