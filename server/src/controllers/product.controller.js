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
};

module.exports = productController;
