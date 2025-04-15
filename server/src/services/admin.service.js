const ProductModel = require("../model/product.model");
const UserModel = require("../model/user.model");
class AdminService {
  static async getAllUser() {
    return await UserModel.getAllUser();
  }

  static async editUser(role, id) {
    return await UserModel.editUser(role, id);
  }
  static async deleteUser(id) {
    return await UserModel.deleteUser(id);
  }
  static async createProduct(productData) {
    return await ProductModel.create(productData);
  }
  static async findAllProduct() {
    return await ProductModel.findAll();
  }
  static async deleteProduct(productId) {
    return await ProductModel.findByIdAndDelete(productId);
  }

  static async eidtProduct(id, updateData) {
    return await ProductModel.eidtProduct(id, updateData);
  }

  static async uploadImage(image) {
    return await ProductModel.upload(image);
  }

  static async removeImage(imageId) {
    try {
      return await ProductModel.removeUpload(imageId);
    } catch (error) {
      throw new Error(`Error in RemoveImage service: ${error.message}`);
    }
  }
}

module.exports = AdminService;
