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
routes.post(
  "/admin/addProduct",
  verifyToken,
  verifyRole(["admin"]),
  upload.single("image"),
  productController.addProduct,
);
routes.post(
  "/admin/deleteProduct/:id",

  productController.deleteProduct,
);
// routes.post(
//   "/uploadImage",
//   upload.array("images", 1),
//   productController.uploadImage,
// );
routes.delete("/removeImage/:id", productController.removeImage);
module.exports = routes;
