const express = require("express");
const routes = express.Router();
const verifyToken = require("../middlewares/auth.middlewares");
// Require the controller modules

const productController = require("../controllers/product.controller");
const upload = require("../middlewares/uploadMiddleware");

routes.get("/findProduct", verifyToken, productController.getALlUser);
routes.post("/createProduct", verifyToken, productController.createUser);
routes.post("/deleteProduct/:id", verifyToken, productController.deleteUser);
routes.get("/search", verifyToken, productController.getALlUser);
routes.post(
  "/uploadImage",
  upload.array("images", 10),
  productController.uploadImage,
);
routes.delete("/removeImage/:id", productController.removeImage);
module.exports = routes;
