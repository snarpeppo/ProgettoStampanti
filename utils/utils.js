//file che contiene tutte le funzioni 'utili' o comunque riutilizzate piu' volte nel codice
//vengono richiamate per minimizzare la quantita' di codice dove possibile
const execSync = require("child_process").execSync;

// visualizza tutte le stampanti riconosciute
list = function () {
  let listaStampanti = execSync("lpstat -p", {
    timeout: 10000,
    encoding: "utf-8",
  });

  let listaParsata = parseStdout(listaStampanti);

  let listaSoloPrinters = listaParsata.filter(function (line) {
    return line.match(line.match(/^printer/) || line.match(/^impressora/));
  });

  let listaSoloNomi = listaSoloPrinters.map(function (printer) {
    return printer.match(/(?: \S+)/)[0].trim();
  });
  return listaSoloNomi;
};
//parsifica un oggetto rimuovendo e spezzando l'array per andare a capo (\n)
parseStdout = function (data) {
  if (!data) return [];
  return data.toString().replace(/\n$/, "").split("\n");
};
//unisce due array in un singolo array in chiave-valore
toObject = function (keys, values) {
  var result = {};
  for (var i = 0; i < keys.length; i++) result[keys[i]] = values[i];
  return result;
};

module.exports = {
  parseStdout,
  list,
  toObject,
};
