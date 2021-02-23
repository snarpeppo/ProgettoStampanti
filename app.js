const express = require("express");
const app = express();

const cups = require("./api/cupsApis.js");
const lpq = require("./api/lpq.js");

app.use(express.static("api"));

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
  const name = cups.lpstat()
  const job = cups.lpstatJobs();
  res.render("lpqView", {
    job,
    name
  });
});

app.get("/lpqGet", (req, res) => {
  const name = lpq(req.query.printername);
  res.send(name);
});

app.get("/classes", (req, res) => {
  res.render("classes");
});

app.get("/lpstat", (req, res) => {
  const command = cups.lpstat();
  res.render("lpstatView", {
    command,
  });
});

// app.get("/lpstatJobs", (req, res) => {
//   const jobs = lpstatJobs();
//   res.render("lpstatView", {
//     jobs
//   });
// });

app.get("/lp", (req, res) => {
  const command = cups.lp("/home/finsoft/ProgettoStampantiLinux/ProgettoStampanti/file/file.txt");
  console.log("command", command);
  res.render("lpView", {
    command,
  });
});

app.get("/lpGet", (req, res) => {
  const file = cups.lp(req.query.filepath);
  console.log(req.query.filepath);
  res.send(file);
});

app.get("/lpadmin", (req, res) => {
  const command = cups.lpadmin("PrinterProva2", "HP Printer", "FINSOFT");
  res.render("lpadminView", {
    command,
  });
});

app.get("/cancelAll", (req, res) => {
  const command = cups.cancelAll();
  res.render("cancelAllView", {
    command,
  });
});

app.get("/lprm", (req, res) => {
  const command = cups.lprm();
  res.render("lprmView", {
    command,
  });
});

app.get("/details", (req, res) => {
  res.render("details");
});

///home/finsoft/ProgettoStampantiLinux/ProgettoStampanti/file/file.txt
///home/finsoft/ProgettoStampanti/file/file.txt
