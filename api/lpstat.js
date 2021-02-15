const spawnSync = require("child_process").spawnSync;
const utils = require('../utils/utils.js');

lpstat = function () {
    let lpstatList = utils.list();
    console.log(lpstatList);
    return JSON.stringify(lpstatList);
  };

  module.exports = lpstat;