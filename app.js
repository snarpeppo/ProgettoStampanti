const express = require("express");
const app = express();
const lpq = require("./api/lpq.js");
const lpstat = require("./api/lpstat.js");

app.listen(3001);
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.redirect("/home");
  res.render("home");
});

// app.get("/index", (req, res) => {
//   res.redirect("/home");
//   res.render("index");
// });

app.get("/home", (req, res) => {
  res.render("home");
});


app.get("/lpq", (req, res) => {
  const command = lpq();
  console.log("command", command);
  res.render("lpqView", {
    command,
  });
});

app.get("/lpstat", (req, res) => {
  const command = lpstat();
  console.log("command", command);
  res.render("lpstatView", {
    command,
  });
});
