const express = require("express");
//const jwt = require("jsonwebtoken");
const app = express();
const lpq = require("./api/lpq.js");
const lpstat = require("./api/lpstat.js");
const lp = require("./api/lp.js");

app.listen(3000);
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
  res.render("lpqView", {
    command,
  });
});

app.get("/classes", (req, res) => {
  res.render("classes");
});


app.get("/lpstat", (req, res) => {
  const command = lpstat();
  res.render("lpstatView", {
    command,
  });
});

app.get("/lp", (req, res) => {
  const command = lp("/home/finsoft/ProgettoStampanti/file/file.txt");
  console.log("command", command);
  res.render("lpView", {
    command,
  });
});

///home/finsoft/ProgettoStampantiLinux/ProgettoStampanti/file/file.txt
///home/finsoft/ProgettoStampanti/file/file.txt
