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
  args.push("-d", self.list()[6]);
  //console.log("args", args);
  args.push("--");
  args.push(filePath);
  //console.log("args2", args);
  //console.log("filepath", filePath);
  let lp = spawnSync("lp", args, { encoding: "utf-8" });
   //console.log("lp", lp);

  let input = lp.stdout;

  //console.log("input", input);
  let inputParsed = utils.parseStdout(input);
  //console.log(inputParsed);
  //console.log("input", inputFiltered);
  return inputParsed;
};

module.exports = lp;
