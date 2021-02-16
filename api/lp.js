const spawnSync = require("child_process").spawnSync;
const utils = require("../utils/utils.js");
const writeSync = require("fs").writeSync;
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
  args.push("-d", self.list()[0]);
  //console.log("args", args);
  args.push("--");
  args.push(filePath);
 // console.log("args2", args);
  //console.log("filepath", filePath);

  let lp = spawnSync("lp", args, { encoding: "utf-8" });
  console.log("lp", lp);

 let input = lp.stdout;

  //console.log("input", input);
  let inputParsed = utils.parseStdout(input);
    console.log(inputParsed);
   // console.log("input", inputFiltered);
    return inputParsed

  

//   input.writeSync(data);
//   input.end();
  //   var job = new Job(lp);
  //   job.on("sent", function () {
  //     self.jobs.push(job);
  //   });

  //   job.on("completed", function () {
  //     self.jobs.splice(self.jobs.indexOf(job), 1);
  //   });
};

module.exports = lp;
