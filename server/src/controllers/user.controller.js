const userService = require("../services/user.service");
const jwt = require("jsonwebtoken");

const userController = {
  login: async (req, res) => {
    try {
      const { user, accessToken, refreshToken } = await userService.login(
        req.body,
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        samStie: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.json({ user, accessToken });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  register: async (req, res) => {
    try {
      const user = await userService.register(req.body);
      res.json(user);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  refreshToken: async (req, res) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        return res.status(403).json({ message: "No refresh token provided" });
      }
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
        if (err) {
          return res.status(403).json({ message: "Invalid refresh token" });
        }
        const newAccessToken = jwt.sign(
          { userId: user.id },
          process.env.ACCESS_TOKEN,
          { expiresIn: "1h" },
        );
        res.json({ accessToken: newAccessToken });
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  logout: async (req, res) => {
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out successfully" });
  },
};
module.exports = userController;
