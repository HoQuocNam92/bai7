const db = require("../config/db");

class UserModel {
  static async getAllUser() {
    const [rows] = await db.query("SELECT * FROM customers ");
    return rows;
  }
  static async editUser(role, id) {
    const [rows] = await db.query(
      "UPDATE customers set role = ? where id = ? ",
      [role, id],
    );
    return rows;
  }
  static async deleteUser(id) {
    const [rows] = await db.query("delete from customers  where id = ? ", [id]);
    return rows;
  }
}

module.exports = UserModel;
