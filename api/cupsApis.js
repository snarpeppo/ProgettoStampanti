const spawnSync = require("child_process").spawnSync;
const utils = require("../utils/utils.js");
const fs = require("fs");

//const writeSync = require("fs").writeSync;

// print da buffer
// lp = function (data, options) {
//   let self = this;
//   //console.log("self",self);
//   let args = utils.buildArgs(options);
//   //console.log("args", args);
//   args.push("-d", "");
//   //console.log("args2", args);

//   let lp = spawnSync("lp", args, { encoding: "utf-8" });
//   console.log("lp",lp);
//   let input = lp.output;

//   console.log("input",input);

//   input.writeSync(data);
//   input.end();
//   //	lp.stdin.write(data)
//   //	lp.stdin.end()

// };
//print da file
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

  console.log("args prima di orientation", args);
  if (options.orientation !== "None") {
    args.push(option);
    args.push("orientation-requested=" + options.orientation);
    console.log("args dentro orientation", args);
  }

  console.log("args prima di number", args);
  if (options.number !== "None") {
    args.push(option);
    args.push("number-up=" + options.number);
    console.log("args dentro number", args);
  }

  console.log("args prima di banner", args);
  if (options.banner !== "None") {
    args.push(option);
    args.push("job-sheets=" + options.banner);
    console.log("args dentro di banner", args);
  }

  console.log("tutti", args);
  args.push(filePath);
  let lp = spawnSync("lp", args, { encoding: "utf-8" });
  console.log("lp", lp);
  let inputParsed = utils.parseStdout(lp.stdout);

  return inputParsed;
};

lpadmin = function (name, description, location) {
  let args = ["-p", name];

  args.push("-D");
  args.push(description);
  args.push("-L");
  args.push(location);
  console.log(args);

  let lpadmin = spawnSync("lpadmin", args, { encoding: "utf-8" });
  console.log("lpadmin", lpadmin);
  let stdoutSpawnSync = utils.parseStdout(lpadmin.stdout);

  console.log(stdoutSpawnSync);
  return stdoutSpawnSync;
};

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
  console.log(lpstatCompletedMap);
  return lpstatCompletedMap;
};

lpq = function (name) {
  let self = this;
  self = name;
  let args = ["-P", self];
  //  console.log('args', args);

  let lpq = spawnSync("lpq", args, { encoding: "utf-8" });
  //console.log('lpq',lpq);
  console.log("stdoutlpq", lpq.stdout);
  let stdoutSpawnSync = utils.parseStdout(lpq.stdout);
  console.log("stdoutSpawnSync", stdoutSpawnSync);
  stdoutSpawnSync.shift();
  stdoutSpawnSync.shift();
  // console.log("stdout", stdoutSpawnSync);

  let InfoJob = stdoutSpawnSync.map(function (line) {
    line = line.split(/ +/);
    // console.log(line);
    return {
      rank: line[0] === "active" ? line[0] : parseInt(line[0].slice(0, -2)),
      owner: line[1],
      identifier: parseInt(line[2]),
      files: line[3],
      totalSize: parseInt(line[4]),
    };
  });
  console.log(InfoJob);
  return InfoJob;
};

lpstat = function () {
  let lpstatList = utils.list();
  return lpstatList;
};

lpstatInfo = function (name) {
  let args = ["-l", "-p"];
  args.push(name);
  let lpstatInfo = spawnSync("lpstat", args, {
    encoding: "utf-8",
  });

  let lpstatInfoStdout = lpstatInfo.stdout;
  let lpstatInfoParsed = utils.parseStdout(lpstatInfoStdout);
  lpstatInfoParsed.shift();
  let lpstatInfoMap = lpstatInfoParsed.map(function (line) {
    line = line.replace(/.+?(?<=:)/, "").trim();
    return line;
  });

  console.log("parsed", lpstatInfoMap);

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

lpoption = function (name) {
  let args = ["-p", name];
  args.push("-l");

  lpoption = spawnSync("lpoptions", args, {
    encoding: "utf-8",
  });
  console.log("lpoptions", lpoption);
  var lpoptionParsed = utils.parseStdout(lpoption.stdout);
  return lpoptionParsed;
};

cancelAll = function () {
  let args = ["-u"];
  args.push("finsoft");
  //let cancelAll = spawnSync("cancel",args, { encoding: "utf-8", shell:"/home/finsoft" });
  let cancelAll = spawnSync("cancel", args, {
    encoding: "utf-8",
    shell: true,
  });
  //console.log(cancelAll.shell);
  // let uid = spawnSync('id', args, { encoding: "utf-8"});
  console.log(cancelAll);
  return cancelAll;
};

readJson = function () {
  const outputDir = "./public/profiles/";

  const filesName = fs.readdirSync(outputDir);
  let arrayJson = [];
  filesName.forEach((file) => {
    arrayJson.push(file.split(".json")[0]);
  });
  
  return arrayJson;
};

profiler = function (profile, options) {
  const profileJson = JSON.stringify(options, null, 2);
  const outputDir = "./public/profiles/";

  fs.writeFile(outputDir + profile + ".json", profileJson, (err) => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("Successfully wrote file");
    }
  });
};

module.exports = {
  lpadmin,
  lpstat,
  lp,
  lpstatInfo,
  lpstatCompleted,
  lpq,
  lpoption,
  cancelAll,
  profiler,
  readJson,
};
