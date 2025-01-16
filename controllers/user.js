const User = require("../models/user");

const signUp = async (req, res) =>{
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;
    const isEmailUsed = await User.findOne({email});
    if(isEmailUsed){
        return res.status(409).json({
            msg: "Email is already used",
          });
    }
    return res.status(200).json({
        msg: "ok",
      });
}