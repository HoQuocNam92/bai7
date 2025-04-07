const express = require("express");
const routes = express.Router();
const verifyToken = require("../middlewares/auth.middleware");
// Require the controller modules
const verifyRole = require("../middlewares/verifyRole.middleware");
const productController = require("../controllers/product.controller");
const upload = require("../middlewares/uploadMiddleware");
routes.get(
  "/admin/dashboard",
  verifyToken,
  verifyRole(["admin"]),
  (req, res) => {
    res.json({ message: "Welcome to Admin Dashboard" });
  },
);
routes.get("/findProduct", productController.getALLProduct);
routes.get("/findProduct/:id", productController.getProductByID);
routes.get(
  "/admin",
  verifyToken,
  verifyRole(["admin"]),
  productController.Admin,
);
routes.post(
  "/admin/addProduct",
  upload.single("image"),
  productController.addProduct,
);
routes.post("/admin/deleteProduct/:id", productController.deleteProduct);

routes.delete("/removeImage/:id", productController.removeImage);
module.exports = routes;
