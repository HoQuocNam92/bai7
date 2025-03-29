const CartModel = require("../model/cart.model");
class CartService {
  static async AddCart(product) {
    try {
      return await CartModel.AddCart(product);
    } catch (error) {
      throw new Error("Error when adding to cart");
    }
  }

  static async GetCart() {
    try {
      return await CartModel.GetCart();
    } catch (error) {
      throw new Error("Error when retrieving cart items");
    }
  }

  static async DeleteCart(id) {
    try {
      return await CartModel.DeleteCart(id);
    } catch (error) {
      throw new Error("Error when deleting from cart");
    }
  }
}

module.exports = CartService;
