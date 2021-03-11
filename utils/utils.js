const execSync = require("child_process").execSync;

list = function () {
  let listaStampanti = execSync("lpstat -p", {
    timeout: 10000,
    encoding: "utf-8",
  });

  let listaParsata = parseStdout(listaStampanti);

  let listaSoloPrinters = listaParsata.filter(function (line) {
    return line.match(line.match(/^printer/) || line.match(/^impressora/));
  });
  //console.log("printers",listaSoloPrinters);
  let listaSoloNomi = listaSoloPrinters.map(function (printer) {
    return printer.match(/(?: \S+)/)[0].trim();
  });

  //console.log(listaSoloNomiParsata)

  return listaSoloNomi;
};

parseStdout = function (data) {
  if (!data) return [];
  return data.toString().replace(/\n$/, "").split("\n");
};

match = function (name) {
  let lista = list();
  return Boolean(
    lista.filter(function (printer) {
      return name === printer;
    }).length
  );
};

module.exports = {
  parseStdout,
  match,
  list,
};
