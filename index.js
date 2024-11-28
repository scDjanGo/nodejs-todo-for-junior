const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const exphbs = require("express-handlebars");
const todoRoutes = require("./routes/todos");

const PORT = process.env.PORT || 3000;

const app = express();
const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
  allowProtoPropertiesByDefault: true,
});

app.engine("hbs", hbs.engine);

app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(todoRoutes);

async function start() {
  try {
    const dbPassword = encodeURIComponent("madDjanGo0809003");
    await mongoose.connect(
      `mongodb+srv://scDjanGo:${dbPassword}@mongo-db-app.yyz8a.mongodb.net/mongo-db-app`
    );

    app.listen(PORT, () => {
      console.log("Server has been started...");
    });
  } catch (err) {
    console.log(err);
  }
}

start();
