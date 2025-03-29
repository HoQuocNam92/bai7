const userModel = require("../model/user.model");
const bycypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
class userService {
  static async register(user) {
    user.password = await bycypt.hash(user.password, 10);
    const newUser = await userModel.register(user);
    return newUser;
  }
  static async login(users) {
    const user = await userModel.findOne(users.email);
    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = await bycypt.compare(users.password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }
    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "1h",
      },
    );
    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.REFRESH_TOKEN,
      {
        expiresIn: "7d",
      },
    );
    return { user, accessToken, refreshToken };
  }
}
module.exports = userService;
