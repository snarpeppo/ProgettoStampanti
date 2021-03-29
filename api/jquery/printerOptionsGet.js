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
    if (typeof options == "string") {
      options = JSON.parse(options);
      var string = "";
      $.each(options, function (key, value) {
        string += ` 
        <h3> ${key} </h3>
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
        <h4> ${key} </h4>
        <select class="form-select" id=${key}>`;
        for (var i = 0; i < value.length; i++) {
          string += `<option value='${options[key][i]}'>${options[key][i]}</option>`;
        }
        string += "</select>";
      });
      $("#advancedOptions").html(string);
    }
    valueChange();
  });
};
jQuery(window).on("load", function () {
  var profile = $("#selectProfile").val();
    var path = "/profileGet/" + profile;
    $.getJSON(path, function (json) {
      console.log(json.options.printerName)
      ajaxPrinterOptions(json.options.printerName);
    });
  $("#selectPrinter").on("change", function () {
    var name = $("#selectPrinter").val();
    ajaxPrinterOptions(name);
    console.log(name);
  });

  $("#selectProfile").on("change", function () {
    var profile = $("#selectProfile").val();
    var path = "/profileGet/" + profile;
    $.getJSON(path, function (json) {
      console.log(json.options.printerName)
      ajaxPrinterOptions(json.options.printerName);
    });
  });
});
