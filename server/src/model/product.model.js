const db = require("../config/db");

class ProductModel {
  static async findAll() {
    const [rows] = await db.query("SELECT * FROM products");
    return rows;
  }
  static async findById(id) {
    const [row] = await db.query("SELECT * FROM products WHERE id =?", [id]);
    return row;
  }
  static async create(user) {
    const [result] = await db.query(
      "INSERT INTO products ( title, price, description) VALUES (?,?,?,?)",
      [user.title, user.price, user.description],
    );
    return result.insertId;
  }
  static async findByIdAndDelete(user) {
    await db.query("DELETE FROM products WHERE id =?", [user.id]);

    return true;
  }
  static async findProduct() {
    const [row] = await db.query("Select name from products ");
    return row;
  }
}
module.exports = ProductModel;
