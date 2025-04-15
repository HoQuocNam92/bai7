const userModel = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthService {
  static async register(user) {
    user.password = await bcrypt.hash(user.password, 10);
    const newUser = await userModel.register(user);
    return newUser;
  }

  static async login(credentials) {
    const user = await userModel.findOne(credentials.email);
    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(credentials.password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const accessToken = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.ACCESS_TOKEN,
      { expiresIn: "1h" },
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.REFRESH_TOKEN,
      { expiresIn: "7d" },
    );

    return { user, accessToken, refreshToken };
  }
}

module.exports = AuthService;
