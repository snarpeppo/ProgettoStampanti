const spawnSync = require("child_process").spawnSync;
const utils = require('../utils/utils.js');

lpstat = function () {
    let lpstatList = utils.list();
    return lpstatList;
  };

  module.exports = lpstat;