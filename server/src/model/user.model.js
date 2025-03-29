const db = require("../config/db");

class UserModel {
  static async register(user) {
    console.log("Register", user);
    const [result] = await db.query(
      "INSERT INTO USERS (  username, email, password) VALUES (?,?,?)",
      [user.username, user.email, user.password],
    );
    return result.insertId;
  }
  static async login(user) {
    const [result] = await db.query(
      "SELECT * FROM USERS WHERE email =? AND password =?",
      [user.email, user.password],
    );
    return result[0];
  }
  static async findOne(email) {
    const [rows] = await db.query("SELECT * FROM users where email =  ?", [
      email,
    ]);
    return rows[0];
  }
}
module.exports = UserModel;
