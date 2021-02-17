const spawnSync = require("child_process").spawnSync;
const utils = require("../utils/utils.js");

lpstatJobs = function(){
    let args = ["-o"];
    let lpstat = spawnSync("lpstat", args, {encoding:'utf-8'});
    //console.log('lpstat',lpstat)
    console.log('stdoutlpstat',lpstat.stdout);
    lpstatParsata = utils.parseStdout(lpstat.stdout);
   // lpstatParsata = JSON.parse(lpstat.stdout);
    console.log('parsata',lpstatParsata);
   
   let lpstatMap = lpstatParsata.map(function (line){
       line = line.split(/ +/);
       console.log('line',line);
       return{
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
            date: line[3] + ' ' +
            parseInt(line[4]) + ' ' +
            line[5] + ' ' +
            parseInt(line[6]) + ' ' +
            line[7] + ' ' +
            line[8] + ' ' +
            line[9]
        };
       });
   
    console.log('lpstatParsata', lpstatMap);
    return lpstatMap;
}

module.exports = lpstatJobs;
