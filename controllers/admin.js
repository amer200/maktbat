const jwt = require("jsonwebtoken");

exports.logIn = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email + "//" + password)
    console.log(process.env.ADMINEMAIL + "//" + process.env.ADMINPASSWORD)
    if (email == process.env.ADMINEMAIL && password == process.env.ADMINPASSWORD) {
        const u = {
            id: "1",
            name: "admin",
            rolle: "admin"
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
}