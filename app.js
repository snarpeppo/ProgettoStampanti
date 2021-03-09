const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const cups = require("./api/cupsApis.js");


app.use(express.static("api"));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.listen(3000);
app.set("view engine", "ejs");
// home Routes
app.get("/", (req, res) => {
  res.redirect("/home");
  res.render("home");
});

app.get("/home", (req, res) => {
  res.render("home");
});
// lpq Routes
app.get("/lpq", (req, res) => {
  const name = cups.lpstat();
  res.render("lpqView", {
    name
  });
});

app.get("/lpqGet", (req, res) => {
  const name = cups.lpq(req.query.printername);
  res.send(name);
});

app.get("/api/jquery/ajaxGet.js", (req, res) => {
  res.sendFile("./api/jquery/ajaxGet.js", { root: __dirname });
});

app.get("/lpstatCompleted", (req, res) => {
  const option = cups.lpstatCompleted(req.query.preference);
  res.send(option);
});

app.get("/api/jquery/lpstatCompletedGet.js", (req, res) => {
  res.sendFile("./api/jquery/lpstatCompletedGet.js", { root: __dirname });
});


// classes Routes
app.get("/classes", (req, res) => {
  res.render("classes");
});

// lpstat routes
app.get("/lpstat", (req, res) => {
  const command = cups.lpstat();
  res.render("lpstatView", {
    command,
  });
});

// lp routes
app.get("/lp", (req, res) => {
  const name = cups.lpstat()
  res.render("lpView",{
    name
  });
});


app.post("/lpPost", (req, res) => {
  console.log(req.files.fileToPrint.tempFilePath);
  console.log(req.body.printerName);
  const name = req.body.printerName;
  delete req.body.printerName;
  const options = req.body;
  const file = cups.lp(name, options , req.files.fileToPrint.tempFilePath);
  res.status(200).send(file);
});

app.get("/api/jquery/lpPost.js", (req, res) => {
  res.sendFile("./api/jquery/lpPost.js", { root: __dirname });
});

// lpadmin routes

app.get("/lpadmin", (req, res) => {
  const command = cups.lpadmin("PrinterProva2", "HP Printer", "FINSOFT");
  res.render("lpadminView", {
    command,
  });
});

// cancelall routes
app.get("/cancelAll", (req, res) => {
  const command = cups.cancelAll();
  res.render("cancelAllView", {
    command,
  });
});

//details routes
app.get("/details", (req, res) => {
  const name = req.query.printerName;
  const info = cups.lpstatInfo(name);
  //console.log(req.query.printerName);
  res.render("details", {
    name,
    info,
  });
});

app.get("/printerGet", (req, res) => {
  const name = cups.lpstat(req.query.printername);
  res.send(name);
});

app.get("/api/jquery/onPrinterDetail.js", (req, res) => {
  res.sendFile("./api/jquery/onPrinterDetail.js", { root: __dirname });
});

app.get("/profiles", (req, res) => {
  const name = cups.lpstat();
  res.render("profilesView", {
    name
  });
});

app.get("/profilePost", (req, res) => {
  console.log(req.query.printername)
  const profile = cups.lpoption(req.query.printername);
  res.send(profile);
});

app.get("/api/jquery/profilePost.js", (req, res) => {
  res.sendFile("./api/jquery/lpoptionGet.js", { root: __dirname });
});