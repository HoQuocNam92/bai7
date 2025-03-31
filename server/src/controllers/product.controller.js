const ProductService = require("../services/product.service");
require("dotenv").config();

const productController = {
  getALlUser: async (req, res) => {
    try {
      const users = await ProductService.getALLProduct();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  createUser: async (req, res) => {
    try {
      const newUser = await ProductService.createProduct(req.body);
      res
        .status(201)
        .json({ message: "Tài khoản được tạo thành công!", user: newUser });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const deletedUser = await ProductService.deleteProduct(req.params.id);
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

      for (let i = 0; i < uploadedImages.length; i++) {
        ProductService.Upload(uploadedImages[i]);
      }
      return res.json({
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
