const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const salt = 10;

exports.signUp = async (req, res) => {
  try {
    const email = req.body.email;
    const name = req.body.name;
    const phone = req.body.phone;
    const password = req.body.password;
    const hash = bcrypt.hashSync(password, salt);
    const isEmailUsed = await User.findOne({ email });
    if (isEmailUsed) {
      return res.status(409).json({
        msg: "Email is already used",
      });
    }
    const myUser = new User({
      email: email,
      name: name,
      phone: phone,
      password: hash,
      rolle: "user"
    });
    await myUser.save();
    return res.status(200).json({
      msg: "ok",
      user: myUser
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: error
    })
  }
}
exports.logIn = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        msg: "email or password is wrong",
      });
    }
    if (bcrypt.compareSync(password, user.password)) {
      const u = {
        id: user._id,
        name: user.name,
        rolle: "user"
      }
      const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: { user: u },
      }, process.env.ACCESS_TOKEN);
      return res.status(200).json({
        msg: "ok",
        token: token
      })
    } else {
      return res.status(404).json({
        msg: "email or password is wrong",
      });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: error
    })
  }
}
exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      msg: "ok",
      data: users
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: error
    })
  }
}