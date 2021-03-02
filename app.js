const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");

const cups = require("./api/cupsApis.js");
const lpq = require("./api/lpq.js");

app.use(express.static("api"));
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));

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

app.get("/api/jquery/ajaxGet.js", (req, res) => {
  res.sendFile('./api/jquery/ajaxGet.js', { root: __dirname });
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
  res.render("lpView");
});


app.post("/lpPost", (req, res) => {
  console.log(req.files.fileToPrint.tempFilePath);
  const file = cups.lp(req.files.fileToPrint.tempFilePath);
  res.status(200).send(file);
});

app.get("/api/jquery/lpPost.js", (req, res) => {
  res.sendFile('./api/jquery/lpPost.js', { root: __dirname });
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

app.get("/lprm", (req, res) => {
  const command = cups.lprm();
  res.render("lprmView", {
    command,
  });
});
//details routes
app.get("/details", (req, res) => {
  const name = req.query.printerName;
  const info = cups.lpstatInfo(name);
  //console.log(req.query.printerName);
  res.render("details",{
    name,
    info
  });
});

app.get("/printerGet", (req, res) => {
  const name = cups.lpstat(req.query.printername);
  res.send(name);
});

app.get("/api/jquery/onPrinterDetail.js", (req, res) => {
  res.sendFile('./api/jquery/onPrinterDetail.js', { root: __dirname });
});



