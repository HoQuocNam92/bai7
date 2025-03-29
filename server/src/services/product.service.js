const UserModel = require("../model/product.model");

class UserService {
  static async getALLProduct() {
    return await UserModel.findAll();
  }
  static async createProduct(userData) {
    return await UserModel.create(userData);
  }
  static async getProduct() {
    return await UserModel.findProduct();
  }
  static async deleteProduct(userId) {
    return await UserModel.findByIdAndDelete(userId);
  }
  static async getProductByID(userId) {
    return await UserModel.findById(userId);
  }
}

module.exports = UserService;
