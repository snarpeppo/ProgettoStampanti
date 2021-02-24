const utils = require("../utils/utils.js");
const spawnSync = require("child_process").spawnSync;

lpq = function (name) {
  let self = this;
  self = name;
  let args = ["-P", self];
  console.log("args", args);

  let lpq = spawnSync("lpq", args, { encoding: "utf-8" });
  console.log("lpq", lpq);
  // console.log("stdoutlpq", lpq.stdout);
  let stdoutSpawnSync = utils.parseStdout(lpq.stdout);
  // console.log('stdoutSpawnSync',stdoutSpawnSync);
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

module.exports = lpq;
