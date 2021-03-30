const spawnSync = require("child_process").spawnSync;
const utils = require("../utils/utils.js");
const fs = require("fs");

//questo file contiene tutte le mie funzioni 'back-end'

//'lp' e' il comando di stampa, aggancio dentro la variabile 'args' tutte le varie opzioni di stampa
lp = function (name, options, filePath) {
  let args = ["-d", name];
  let option = "-o";

  args.push("-n");
  args.push(options.copyNumber);

  args.push(option);
  args.push("media=" + options.size);

  args.push(option);
  args.push("print-quality=" + options.quality);

  args.push(option);
  args.push("sides=" + options.side);

  if (options.orientation !== "None") {
    args.push(option);
    args.push("orientation-requested=" + options.orientation);
  }

  if (options.number !== "None") {
    args.push(option);
    args.push("number-up=" + options.number);
  }

  if (options.banner !== "None") {
    args.push(option);
    args.push("job-sheets=" + options.banner);
  }
  //richiamo la funzione che contiene tutti i valori delle relative opzioni, uniche per ogni stampante
  var lpoptions = lpoptions(name);
  var size = Object.keys(lpoptions).length;
  for (var i = 0; i < size; i++) {
    if (
      Object.keys(lpoptions)[i] !== "None" ||
      Object.keys(lpoptions)[i] !== "none"
    ) {
      args.push(option);
      args.push(
        Object.keys(lpoptions)[i] + "=" + options[Object.keys(lpoptions)[i]]
      );
    }
  }

  args.push(filePath);
  //comando effettivo che esegue la stampa
  let lp = spawnSync("lp", args, { encoding: "utf-8" });
  console.log("lp", lp);
  let inputParsed = utils.parseStdout(lp.stdout);

  return inputParsed;
};
//funzione che dobrebbe aggiungere una stampante, potendone modificare il nome, la descrizione e la 'posizione', ma per mancanza di permessi, non e' stata implementata
lpadmin = function (name, description, location) {
  let args = ["-p", name];
  args.push("-D");
  args.push(description);
  args.push("-L");
  args.push(location);

  let lpadmin = spawnSync("lpadmin", args, { encoding: "utf-8" });
  let stdoutSpawnSync = utils.parseStdout(lpadmin.stdout);

  return stdoutSpawnSync;
};
//funzione che fa visualizzare i 'jobs' completati e non, a seconda dalla 'option' che si inserisce nella select
lpstatCompleted = function (option) {
  let args = ["-W", option];
  let lpstatCompleted = spawnSync("lpstat", args, { encoding: "utf-8" });
  let stdoutCompleted = utils.parseStdout(lpstatCompleted.stdout);
  let lpstatCompletedMap = stdoutCompleted.map(function (line) {
    line = line.split(/ +/);
    return {
      printername: line[0],
      owner: line[1],
      fileSize: line[2],
      date:
        line[3] +
        " " +
        parseInt(line[4]) +
        " " +
        line[5] +
        " " +
        parseInt(line[6]) +
        " " +
        line[7] +
        " " +
        line[8] +
        " " +
        line[9],
    };
  });
  return lpstatCompletedMap;
};
//funzione che restituisce tutti i 'jobs' per la stampante selezionata
lpq = function (name) {
  let args = ["-P", name];
  let lpq = spawnSync("lpq", args, { encoding: "utf-8" });
  let stdoutSpawnSync = utils.parseStdout(lpq.stdout);
  stdoutSpawnSync.shift();
  stdoutSpawnSync.shift();
  let InfoJob = stdoutSpawnSync.map(function (line) {
    line = line.split(/ +/);
    return {
      rank: line[0] === "active" ? line[0] : parseInt(line[0].slice(0, -2)),
      owner: line[1],
      identifier: parseInt(line[2]),
      files: line[3],
      totalSize: parseInt(line[4]),
    };
  });
  return InfoJob;
};
//funzione presa da 'utils', restituisce una lista di tutti jobs attivi avviati dall l'utente di sistema
lpstat = function () {
  let lpstatList = utils.list();
  return lpstatList;
};
//funzione che riporta lo status della singola stampante, a seconda di quella selezionata
lpstatInfo = function (name) {
  let args = ["-l", "-p"];
  args.push(name);
  let lpstatInfo = spawnSync("lpstat", args, { encoding: "utf-8" });
  let lpstatInfoStdout = lpstatInfo.stdout;
  let lpstatInfoParsed = utils.parseStdout(lpstatInfoStdout);
  lpstatInfoParsed.shift();
  let lpstatInfoMap = lpstatInfoParsed.map(function (line) {
    line = line.replace(/.+?(?<=:)/, "").trim();
    return line;
  });

  if (lpstatInfoMap[0] === "") {
    let details = {
      printerstatus:
        lpstatInfoMap[4] === "none"
          ? (lpstatInfoMap[4] = "Active")
          : lpstatInfoMap[4],
      description: lpstatInfoMap[3],
      location: lpstatInfoMap[5],
      interface: lpstatInfoMap[7],
    };
    return details;
  } else {
    let details = {
      printerstatus: lpstatInfoMap[0],
      description: lpstatInfoMap[4],
      location: lpstatInfoMap[6],
      interface: lpstatInfoMap[8],
    };
    return details;
  }
};
//funzione che restituisce tutte le opzioni e i conseguenti valori specifici, diversi a seconda della stampante
lpoptions = function (name) {
  let args = ["-p", name];
  args.push("-l");

  lpoption = spawnSync("lpoptions", args, { encoding: "utf-8" });
  var lpoptionParsed = utils.parseStdout(lpoption.stdout);
  var optionsSplitted = lpoptionParsed.map(function (line) {
    line = line.split(":");
    return line;
  });
  var regex = / /g;
  //variabile con solo le options(keys)
  var options = optionsSplitted.map(function (element) {
    var option = element[0].replace(regex, "-");
    return option;
  });
  //variabile con solo valori (values)
  var values = optionsSplitted.map(function (element) {
    element[1] = element[1].replace("*", "");
    var value = element[1].split(/\s/g);

    value.shift();
    return value;
  });
  //unisce i due valori per creare un array associativo
  var optionsAndValues = utils.toObject(options, values);
  return optionsAndValues;
};
//funzione che cancella tutti i jobs, ma per problemi di permessi, non e' stata implementata
cancelAll = function () {
  let args = ["-u"];
  args.push("finsoft");
  let cancelAll = spawnSync("cancel", args, {
    encoding: "utf-8",
    shell: true,
  });
  return cancelAll;
};
//funzione che 'legge' i file dentro il path specificato e ritorna un array con tutti nomi dei file
readJson = function () {
  const outputDir = "./public/profiles/";
  const filesName = fs.readdirSync(outputDir);
  let arrayJson = [];
  filesName.forEach((file) => {
    arrayJson.push(file.split(".json")[0]);
  });

  return arrayJson;
};
//funzione che crea il profilo con tutte le opzioni passate dalle altre funzioni jQuery
profiler = function (profile, options, oOptions) {
  const generalOptions = JSON.stringify(options, null, 2);
  const outputDir = "./public/profiles/";

  fs.writeFile(outputDir + profile + ".json", generalOptions, (err) => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("Successfully wrote file");
    }
  });
};
//fuzione che elimina il profilo selezionato, passato come attributo alla funzione
deleteProfile = function (profile) {
  const outputDir = "./public/profiles/";
  try {
    fs.unlinkSync(`${outputDir}${profile}.json`);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  lpadmin,
  lpstat,
  lp,
  lpstatInfo,
  lpstatCompleted,
  lpq,
  lpoptions,
  cancelAll,
  profiler,
  readJson,
  deleteProfile,
};
