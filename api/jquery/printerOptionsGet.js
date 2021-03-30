//funzione che si occupa della generazione dinamica delle select con all'interno le opzioni specifiche della singola stampante
ajaxPrinterOptions = function (nomeStampante) {
  $.ajax({
    method: "GET",
    url: "/printerOptions",
    data: {
      printername: nomeStampante,
    },
    error: function () {
      alert("Error");
    },
  }).done(function (options) {
    //per alcune stampanti, le options specifiche tornano come strings, trasformarle in un oggetto le rende utilizzabili
    if (typeof options == "string") {
      options = JSON.parse(options);
      var string = "";
      $.each(options, function (key, value) {
        string += `
        <br>
        <h5> ${key} </h5>
        <select class="form-select" name="asd" id=${key}>`;
        for (var i = 0; i < value.length; i++) {
          string += `<option value='${options[key][i]}'>${options[key][i]}</option>`;
        }
        string += "</select>";
      });
      $("#advancedOptions").html(string);
    } else {
      var string = "";
      $.each(options, function (key, value) {
        string += `
        <br>
        <h5> ${key} </h5>
        <select class="form-select" id=${key}>`;
        for (var i = 0; i < value.length; i++) {
          string += `<option value='${options[key][i]}'>${options[key][i]}</option>`;
        }
        string += "</select>";
      });
      $("#advancedOptions").html(string);
    }
    //questa funzione cambia i valori di tutte le opzioni, mettendo quelli selezionati durante creazione del profilo
    valueChange();
  });
};
jQuery(window).on("load", function () {
  //recupero il nome salvato del profilo e prendo il valore della stampante salvato dentro il profilo
  var profile = $("#selectProfile").val();
    var path = "/profileGet/" + profile;
    $.getJSON(path, function (json) {
      ajaxPrinterOptions(json.options.printerName);
    });
  $("#selectPrinter").on("change", function () {
    var name = $("#selectPrinter").val();
    ajaxPrinterOptions(name);
  });

  $("#selectProfile").on("change", function () {
    var profile = $("#selectProfile").val();
    var path = "/profileGet/" + profile;
    $.getJSON(path, function (json) {
      ajaxPrinterOptions(json.options.printerName);
    });
  });
});
