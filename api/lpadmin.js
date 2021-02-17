const spawnSync = require("child_process").spawnSync;
const utils = require("../utils/utils.js");

lpadmin = function (name, description, location) {
  let self = this;
  let args = ["-p", name];
  
  args.push("-D", description);
  args.push("-L", location);
  console.log(args);

  let lpadmin = spawnSync("lpadmin", args, { encoding: "utf-8" });
  console.log('lpadmin',lpadmin);
  let stdoutSpawnSync = utils.parseStdout(lpadmin.stdout);
  //console.log('stdoutSpawnSync',stdoutSpawnSync);

  stdoutSpawnSync.shift();
  stdoutSpawnSync.shift();
  console.log("stdout", stdoutSpawnSync);

  let AddPrinter = stdoutSpawnSync.map(function (line) {
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
module.exports = lpadmin;
