const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
  },
  name: {
    type: String,
  },
});

module.exports = mongoose.model("User", UserSchema);
