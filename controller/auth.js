var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const User = require("../model/schema");

const signup = async (req, res) => {
  try {
    const user1 = await new user({
      username: req.body.username,
      email: req.body.email,
      // password: bcrypt.hashSync(req.body.password, 8),
      // confirm_password: bcrypt.hashSync(req.body.confirm_password, 8)
    });

    user1.save((err, user) => {
      if (err) {
        console.log(err);
        return;
      } else {
        console.log("success");
      }
    });
    res.json({ message: "user Saved successfully" });
  } catch (error) {
    res.send(error.message);
  }
};

const signin = async (req, res) => {
  let { username, password } = req.body;
  try {
    if (!username || !password) {
      res.json({ message: "enter all data", status: false });
    } else {
      const users = await User.findOne({ username: username });
      if (!users) {
        res.json({
          msg: "User doesn't exists",
        });
      } else {
        let token = await jwt.sign(
          {
            id: users.userId,
          },
          "secretkey"
        );
        user.token = token;
        var compare = bcrypt.compareSync(password, users.password);
        if (compare === false) {
          res.json({
            message: "Invalid UserName/password",
            status: false,
          });
        } else {
          res.json({ message: "login success app", token, status: true });
        }
      }
    }
  } catch (err) {
    res.json({ message: err.message, status: false });
  }
};

module.exports = { signup, signin };
