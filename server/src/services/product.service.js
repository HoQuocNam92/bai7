const ProductModel = require("../model/product.model");

class ProductService {
  static async getAllProducts() {
    return await ProductModel.findAll();
  }

  static async getProductById(productId) {
    return await ProductModel.findById(productId);
  }
}

module.exports = ProductService;
