const db = require("../config/db");

class CartModel {
  static async AddCart(product) {
    const [rows] = await db.query("SELECT * FROM cart WHERE ID = ?", [
      product.id,
    ]);
    const row = rows[0];
    console.log("Check quantity", product.quantity);
    if (rows.length > 0) {
      console.log("Check product", row);
      const newQuantity = row.quantity + product.quantity;
      const newTotal = newQuantity * row.price;
      const [rows] = await db.query(
        "UPDATE cart set quantity = ? , total = ?  where id = ?",
        [newQuantity, newTotal, row.id],
      );
      return rows;
    } else {
      const [rows] = await db.query(
        "INSERT INTO cart (id , title, price, image_url, quantity , total) VALUES (?, ?, ?, ?, ?, ?)",
        [
          product.id,
          product.title,
          product.price,
          product.image_url,
          product.quantity,
          product.total,
        ],
      );
      return rows;
    }
  }
  static async GetCart() {
    const [rows] = await db.query("select * from cart");
    return rows;
  }
  static async DeleteCart(id) {
    const [rows] = await db.query("delete from cart where id = ?", [id]);
    return rows;
  }
}

module.exports = CartModel;
