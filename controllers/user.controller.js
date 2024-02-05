const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.registerUser = async (req, res) => {
  const { username, phonenumber, password } = req.body;
  try {
    const findUserExists = await User.findOne(phonenumber);
    if (findUserExists) {
      return res
        .status(409)
        .json({ message: "User already registered please login" });
    }
    const hashedPassword = bcrypt.hashSync(password);
    if (hashedPassword) {
      const registeredUser = await User.create({
        username,
        phonenumber,
        password: hashedPassword,
      });
      return res.status(201).json(registeredUser);
    }
  } catch (error) {
    console.log(error);
  }
};
exports.loginUser = async (req, res) => {
  const { phonenumber, password } = req.body;
  try {
    const findUserExists = await User.findOne(phonenumber);
    if (findUserExists) {
      return res
        .status(404)
        .json({ message: "User not found please register" });
    }
    const comparePassword = bcrypt.compareSync(
      password,
      findUserExists.password
    );
    if (!comparePassword) {
      return res
        .status(401)
        .json({ message: "Wrong phone number or password" });
    }
    const { password: hashedPassword, ...user } = findUserExists._doc;
    const accessToken = jwt.sign(
      { id: user._id, username: user.username },
      process.env.ACCESS_TOKEN_SECRETCODE,
      { expiresIn: "7d" }
    );
    return res.status(200).json({ user, accessToken });
  } catch (error) {
    console.log(error);
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne(email);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const resetToken = jwt.sign(
    { id: user._id },
    process.env.RESET_TOKEN_SECRETCODE,
    { expiresIn: "10m" }
  );
};
