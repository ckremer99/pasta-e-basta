//this is a commit comment

const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const { mongo } = require("mongoose");
const session = require("express-session");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path")

const authController = require("./controllers/auth.js");
const menuItemsController = require("./controllers/menu-items.js")

const isSignedIn = require("./middleware/is-signed-in.js");
const passUserToView = require("./middleware/pass-user-to-view.js");

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB`);
});

const port = process.env.PORT ? process.env.PORT : "3000";

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.set('view engine', 'ejs');

app.use("/auth", authController);

app.use(passUserToView);

app.get("/", (req, res) => {
  res.render("index.ejs", {
    user: req.session.user
  });
});


app.use(isSignedIn);

app.use('/menuitems', menuItemsController);

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}`);
});
