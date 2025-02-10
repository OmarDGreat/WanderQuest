const jwt = require("jsonwebtoken");
const { User } = require("../models");

const authController = {
  register: async (req, res) => {
    try {
      const user = await User.create(req.body);
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      res.status(201).json({ token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user || !(await user.validatePassword(password))) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      res.json({ token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getProfile: async (req, res) => {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: { exclude: ["password"] },
      });
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = authController;
