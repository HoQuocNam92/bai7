const db = require("../config/db");
const cloudinary = require("../config/Cloudinary");
class ProductModel {
  static async findAll() {
    const [rows] = await db.query("SELECT * FROM book");
    return rows;
  }
  static async findById(id) {
    const [row] = await db.query("SELECT * FROM book WHERE id =?", [id]);
    return row;
  }
  static async create(user) {
    const [result] = await db.query(
      "INSERT INTO book ( title, price,stock_quantity , author ,  description , image_url) VALUES (?,?,?,?,?,?)",
      [
        user.title,
        user.price,
        user.stock_quantity,
        user.author,
        user.description,
        user.image_url,
      ],
    );
    return result.insertId;
  }
  static async findByIdAndDelete(id) {
    const [row] = await db.query("delete from book where id = ?", [Number(id)]);
    return row;
  }

  static async upload(image) {
    const [row] = await db.query("insert into book (image_url ) VALUES  (? )", [
      image.imageUrl,
    ]);
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
