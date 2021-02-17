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

  console.log(stdoutSpawnSync);
  return stdoutSpawnSync;
};
module.exports = lpadmin;
