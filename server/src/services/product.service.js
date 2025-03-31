const ProductModel = require("../model/product.model");

class UserService {
  static async getALLProduct() {
    return await ProductModel.findAll();
  }
  static async createProduct(userData) {
    return await ProductModel.create(userData);
  }
  static async getProduct() {
    return await ProductModel.findProduct();
  }
  static async deleteProduct(userId) {
    return await ProductModel.findByIdAndDelete(userId);
  }
  static async getProductByID(userId) {
    return await ProductModel.findById(userId);
  }
  static async Upload(image) {
    return await ProductModel.upload(image);
  }
  static async RemoveImage(imageId) {
    try {
      return await ProductModel.removeUpload(imageId);
    } catch (error) {
      // Ném lỗi để controller có thể xử lý
      throw new Error(`Error in RemoveImage service: ${error.message}`);
    }
  }
}

module.exports = UserService;
