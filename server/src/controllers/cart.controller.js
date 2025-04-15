const CartService = require("../services/cart.service");

class CartController {
  static async AddCart(req, res) {
    try {
      const result = await CartService.AddCart(req.body);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async GetCart(req, res) {
    try {
      const result = await CartService.GetCart();
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async DeleteCart(req, res) {
    try {
      const result = await CartService.DeleteCart(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
module.exports = CartController;
