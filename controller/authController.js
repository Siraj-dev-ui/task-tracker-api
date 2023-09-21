const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Login User

exports.loginUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ message: "User does not exist" });
  }
  bcrypt.compare(req.body.password, user.password, function (err, result) {
    if (result) {
      const token = jwt.sign(
        {
          data: { _id: user._id },
        },
        process.env.SECRET_KEY,
        {
          expiresIn: Math.floor(Date.now() / 1000) + 60 * 60,
        }
      );
      return res.json({
        token,
        status: "success",
        user: user,
      });
    } else {
      return res.status(403).json({ message: "Incorrect Password..." });
    }
  });
};

// register user

exports.addUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(409).json({ message: "email already exist" });
  }
  try {
    const newUser = new User({
      firstName: req.body.firstName.trim(),
      lastName: req.body.lastName.trim(),
      email: req.body.email.trim(),
      password: await bcrypt.hash(req.body.password.trim(), 10),
    });
    const user = await User.create(newUser);
    res.json({
      status: "success",
      message: "Signup Successful",
    });
  } catch (err) {
    console.log("erro in adding user : ", err);
    res.status(500).json({ message: err });
  }
};
