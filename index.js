const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const auth = require("./routes/auth");
const app = express();
require("./passport")(passport)
const port = 5000;

app.use(
  cookieSession({
    name: "session",
    keys: ["Login"],
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect(
    `mongodb+srv://moni07:moni07@firstproject.jvubt.mongodb.net/login?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("mongodb connected..."))
  .catch((err) => console.log(err));

app.use(
  cors({
    origin: "http://localhost:3001",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use("/auth", auth);
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
