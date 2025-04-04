const ProductService = require("../services/product.service");
require("dotenv").config();

const client = require(".././config/redisClient");

const productController = {
  getALLProduct: async (req, res) => {
    try {
      const cacheData = await client.get("products");
      if (cacheData) {
        return res.json(JSON.parse(cacheData));
      }

      const products = await ProductService.getALLProduct();
      if (!products) {
        return res.status(404).json({ message: "No products found" });
      }

      await client.setEx("products", 3600, JSON.stringify(products));
      res.json(products);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  },

  createProduct: async (req, res) => {
    try {
      console.log("check ", req.body);
      await client.del("products");
      const newUser = await ProductService.createProduct(req.body);
      const updatedProducts = await ProductService.getALLProduct();
      await client.setEx("products", 3600, JSON.stringify(updatedProducts));
      res
        .status(201)
        .json({ message: "Sản phẩm được tạo thành công!", user: newUser });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await client.del("products");
      const deletedUser = await ProductService.deleteProduct(req.params.id);
      const updateProduct = await ProductService.getALLProduct();
      await client.setEx("products", 3600, JSON.stringify(updateProduct));
      res.json(deletedUser);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  getProductByName: async (req, res) => {
    try {
      const users = await ProductService.getProduct();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  uploadImage: async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const uploadedImages = req.files.map((file) => ({
        imageUrl: file.path,
        publicId: file.filename,
      }));
      let Images = [];
      for (let i = 0; i < uploadedImages.length; i++) {
        Images.push(ProductService.Upload(uploadedImages[i]));
      }
      return res.json({
        Images,
        message: "Images uploaded successfully",
      });
    } catch (error) {
      res.status(400).json({ error: error.name, message: error.message });
    }
  },
  removeImage: async (req, res) => {
    try {
      if (!req.params.id) {
        res.json("Not found ID");
      }
      await ProductService.RemoveImage(req.params.id);
      return res.json({
        message: "Images remove successfully",
      });
    } catch (error) {
      res.status(400).json({ error: error.name, message: error.message });
    }
  },
};

module.exports = productController;
