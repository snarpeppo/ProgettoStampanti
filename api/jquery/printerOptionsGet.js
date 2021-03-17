ajaxPrinterOptions = function (nomeStampante) {
  $.ajax({
    method: "",
    url: "/printerOptions",
    data: {
      printername: nomeStampante,
    },
    error: function () {
      alert("Error");
    },
  }).done(function (options) {
    console.log("jquery", options);
    if (typeof options == 'string'){
      options = JSON.parse(options);
      var string = ''; 
      $.each(options,function(key,value){
        string += ` 
        <h4> ${key} </h4>
        <select class="form-select" name="asd" id=${key}>`;
         for (var i = 0; i < value.length; i++) {
          string += `<option value='${options[key][i]}'>${options[key][i]}</option>`;
        };
        string += "</select>";
      });
      $("#advancedOptions").html(string);
    } else{
      var string = ''; 
      $.each(options,function(key,value){
        string += ` 
        <h4> ${key} </h4>
        <select class="form-select" id=${key}>`;
         for (var i = 0; i < value.length; i++) {
          string += `<option value='${options[key][i]}'>${options[key][i]}</option>`;
        };
        string += "</select>";
      });
      $("#advancedOptions").html(string);
    }
   
  });
};
jQuery(window).on("load", function () {
  var name = $("#selectPrinter").val();
  ajaxPrinterOptions(name);
  $("#selectPrinter").on("change", function () {
    var name = $("#selectPrinter").val();
    ajaxPrinterOptions(name);
    console.log(name);
  });
});
