const AuthService = require("../services/auth.service");

const AuthController = {
  register: async (req, res) => {
    try {
      const user = await AuthService.register(req.body);
      res.status(201).json({ message: "User created", user });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const data = await AuthService.login(req.body);
      if (!data) {
        return res.json({ message: "Not found user ", user: data });
      }
      res.json(data);
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  },
};

module.exports = AuthController;
