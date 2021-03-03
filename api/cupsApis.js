const spawnSync = require("child_process").spawnSync;
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
lp = function (options,filePath) {
  let self = this;
  self = utils.list()[4];
  let args = ["-d", self];
  // console.log(self);
  // console.log("args", args);
  console.log('options',options);
  console.log(Object.keys(options).length);

  let optionCopyNumber = ['-n',parseInt(options.copyNumber)];
  //console.log(optionCopyNumber);
  args.push(optionCopyNumber);
  let optionSize = ['-o media=',options.size];
  //console.log(optionSize);
  args.push(optionSize);
  let optionQuality = ['-o print-quality=',options.quality];
  //console.log(optionQuality);
  args.push(optionQuality);
  let optionSide = ['-o sides=',options.side];
  //console.log(optionSide);
  args.push(optionSide);
  
   // args.push("--");
    args.push(filePath);
    console.log("args", args);
    console.log("filepath", filePath);
    let lp = spawnSync("lp", args, { encoding: "utf-8" });
    console.log("lp", lp);
  
    let input = lp.stdout;
  
    let inputParsed = utils.parseStdout(input);
    console.log("input", inputParsed);
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
    return {
      printername: line[0],
      owner: line[1],
      date:
        line[2] +
        " " +
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

lpstatInfo = function (name) {
  let args = ["-l", "-p"];
  args.push(name);
  let lpstatInfo = spawnSync("lpstat", args, {
    encoding: "utf-8",
  });
  
  let lpstatInfoStdout = lpstatInfo.stdout;
  let lpstatInfoParsed = utils.parseStdout(lpstatInfoStdout);
  lpstatInfoParsed.shift();
  let lpstatInfoMap = lpstatInfoParsed.map(function(line){
    line = line.replace(/.+?(?<=:)/, "").trim();
    console.log(line);
    return line;
  });
  
  console.log('parsed',lpstatInfoMap)

  let details = {
    printerstatus:lpstatInfoMap[0],
    description:lpstatInfoMap[4],
    printerstatus2: lpstatInfoMap[5],
    location: lpstatInfoMap[6],
    interface: lpstatInfoMap[8],
  }

  

  //let newDetails = JSON.stringify(details);
  
  //console.log('details',newDetails);
  //console.log(lpstatInfoParsed[6]);
 // let string = JSON.stringify(lpstatInfoParsed);
  

  return details;
};

cancelAll = function () {
  let args = ["-u"];
  args.push("root");
  //let cancelAll = spawnSync("cancel",args, { encoding: "utf-8", shell:"/home/finsoft" });
  let cancelAll = spawnSync("cancel", args, {
    encoding: "utf-8",
    shell: "/home/finsoft",
  });
  //console.log(cancelAll.shell);
  // let uid = spawnSync('id', args, { encoding: "utf-8"});
  console.log(cancelAll);
  return cancelAll;
};

lprm = function () {
  let args = ["-"];

  console.log(cancelAll);
  return cancelAll;
};

module.exports = {
  lpadmin,
  lpstat,
  lp,
  lpstatJobs,
  lpstatInfo,
  //lpq,
  cancelAll,
  lprm,
};