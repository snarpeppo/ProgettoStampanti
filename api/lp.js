const spawnSync = require("child_process").spawnSync;
const utils = require("../utils/utils.js");

lp = function (data, options) {
  let self = this;
  console.log("self",self);
  let args = utils.buildArgs(options);
  console.log("args", args);
  args.push("-d", self.list()[0]);
  console.log("args2", args);

  let lp = spawnSync("lp", args, { encoding: "utf-8" });
  console.log("lp",lp);
  let input = lp.output;

  console.log("input",input);

  input.writeSync(data);
  input.end();
  //	lp.stdin.write(data)
  //	lp.stdin.end()
};

// Printer.prototype.printFile = function (filePath, options) {
//   var self = this;
//   //console.log(self);
//   var args = buildArgs(options);
//   args.push("-d", self.name);
//   //console.log(args);
//   args.push("--");
//   args.push(filePath);
//   console.log(filePath);

//   var lp = spawnSync("lp", args, { encoding: "utf-8" });

//   var job = new Job(lp);
//   job.on("sent", function () {
//     self.jobs.push(job);
//   });

//   job.on("completed", function () {
//     self.jobs.splice(self.jobs.indexOf(job), 1);
//   });

//   return job;
// };

module.exports = lp;
