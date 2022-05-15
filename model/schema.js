const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
  },
  name: {
    type: String,
  },
  facebookId:{
    type:String
  },
  twitterId:{
    type:String
  }
});

module.exports = mongoose.model("User", UserSchema);
