const spawnSync = require("child_process").spawnSync;
const execSync = require("child_process").execSync;
const utils = require("../utils/utils.js");
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
lp = function (filePath, options) {
  let self = this;
  //console.log(self);
  let args = utils.buildArgs(options);
  self = utils.list()[6];
  args.push("-d", self);
  console.log("args", args);
  args.push("--");
  args.push(filePath);
  console.log("args2", args);
  //console.log("filepath", filePath);
  let lp = spawnSync("lp", args, { encoding: "utf-8" });
  console.log("lp", lp);

  let input = lp.stdout;

  console.log("input", input);
  let inputParsed = utils.parseStdout(input);
  //console.log(inputParsed);
  //console.log("input", inputFiltered);
  return inputParsed;
};

lpadmin = function (name, description, location) {
  let self = this;
  let args = ["-p", name];

  args.push("-D", description);
  args.push("-L", location);
  console.log(args);

  let lpadmin = spawnSync("lpadmin", args, { encoding: "utf-8" });
  console.log("lpadmin", lpadmin);
  let stdoutSpawnSync = utils.parseStdout(lpadmin.stdout);

  console.log(stdoutSpawnSync);
  return stdoutSpawnSync;
};

// lpq = function () {
//   let self = this;
//   self = utils.list()[4];
//   let args = ["-P", self];
//   //console.log('args', args);

//   let lpq = spawnSync("lpq", args, { encoding: "utf-8" });
//   //console.log('lpq',lpq);
//  // console.log("stdoutlpq", lpq.stdout);
//   let stdoutSpawnSync = utils.parseStdout(lpq.stdout);
//   //console.log('stdoutSpawnSync',stdoutSpawnSync);
//   stdoutSpawnSync.shift();
//   stdoutSpawnSync.shift();
//  // console.log("stdout", stdoutSpawnSync);

//   let InfoJob = stdoutSpawnSync.map(function (line) {
//     line = line.split(/ +/);
//    // console.log(line);
//     return {
//       rank: line[0] === "active" ? line[0] : parseInt(line[0].slice(0, -2)),
//       owner: line[1],
//       identifier: parseInt(line[2]),
//       files: line[3],
//       totalSize: parseInt(line[4]),
//     };
//   });

//   return InfoJob;
// };

lpstatJobs = function () {
  let args = ["-o"];
  let lpstat = spawnSync("lpstat", args, { encoding: "utf-8" });
  //console.log('lpstat',lpstat)
  // console.log("stdoutlpstat", lpstat.stdout);
  lpstatParsata = utils.parseStdout(lpstat.stdout);
  // lpstatParsata = JSON.parse(lpstat.stdout);
  // console.log("parsata", lpstatParsata);

  let lpstatMap = lpstatParsata.map(function (line) {
    line = line.split(/ +/);
    //console.log('line',line);
    return {
      //    printername: line[0],
      //    bytes: parseInt(line[2]),
      //    owner: line[1],
      //    day: line[3],
      //    dayNum: parseInt(line[4]),
      //    month: line[5],
      //    year: parseInt(line[6]),
      //    clock: line[7],
      //    hourClock: line[8],
      //    timezone: line[9]

      printername: line[0],
      owner: line[1],
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

  //console.log("lpstatParsata", lpstatMap);
  return lpstatMap;
};

lpstat = function () {
  let lpstatList = utils.list();
  return lpstatList;
};

cancelAll = function () {
  let args = ["-a"];
  let cancelAll = spawnSync("cancel", args, { encoding: "utf-8" });

  console.log(cancelAll);
  return cancelAll;
};

module.exports = {
  lpadmin,
  lpstat,
  lp,
  lpstatJobs,
  //lpq,
  cancelAll
};
