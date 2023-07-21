const { response, json } = require("express");
const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  const { username, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });
  try {
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          const token = jwt.sign(
            { email: user.email, username: user.username },
            "jwt-secrete-key",
            { expiresIn: "30d" }
          );

          res.cookie("token", token, {
            maxAge: 1000 * 60 * 10,
            httpOnly: false,
          });

          return res.json("Success!");
        } else {
          return res.json("Incorrect email or password!");
        }
      });
    }
  } catch (error) {
    res.json(error);
  }
};
const verifyUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json("The token is missing");
  } else {
    jwt.verify(token, "jwt-secrete-key", (err, decoded) => {
      if (err) {
        return res.json("The token is wrong!");
      } else {
        req.email = decoded.token;
        req.username = decoded.username;
        next();
      }
    });
  }
};
const logout = (req, res) => {
  res.clearCookie("token");
  return res.json("Success!");
};
module.exports = {
  register,
  login,
  verifyUser,
  logout,
};
