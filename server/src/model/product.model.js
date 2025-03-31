const db = require("../config/db");
const cloudinary = require("../config/cloudinary");
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
  static async upload(image) {
    const [row] = await db.query(
      "insert into images (imageUrl , publicId) VALUES  (?,?)",
      [image.imageUrl, image.publicId],
    );
    return row;
  }
  static async removeUpload(imageId) {
    const [rows] = await db.query("select id from images where id = ?", [
      imageId,
    ]);
    if (!rows.length) {
      throw new Error("Image not found");
    }
    const publicIds = rows[0].publicId;

    await db.query("delete from images where id = ?", imageId);
    await cloudinary.uploader.destroy(publicIds);
    return { success: true, message: "Image deleted successfully" };
  }
}
module.exports = ProductModel;
