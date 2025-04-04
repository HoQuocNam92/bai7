const db = require("../config/db");

class UserModel {
  static async register(user) {
    console.log("Register", user);
    const [result] = await db.query(
      "INSERT INTO customers (  name, email, password) VALUES (?,?,?)",
      [user.name, user.email, user.password],
    );
    return result.insertId;
  }
  static async login(user) {
    const [result] = await db.query(
      "SELECT * FROM customers WHERE email =? AND password =?",
      [user.email, user.password],
    );
    return result[0];
  }
  static async findOne(email) {
    const [rows] = await db.query("SELECT * FROM customers where email =  ?", [
      email,
    ]);
    return rows[0];
  }
}
module.exports = UserModel;
