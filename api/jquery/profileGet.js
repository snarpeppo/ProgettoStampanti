$(function () {
  $("#selectProfile").on("change", function () {
    var profile = $("#selectProfile").val();
    var path = "/profileGet/" + profile;
    $.getJSON(path, function (json) {
      $("#selectPrinter").val(json.printerName);
      $(`option[id='flexSizeDefault'][value='${json.size}']`).prop(
        "checked",
        true
      );
      $(`input[name='flexSideDefault'][value='${json.side}']`).prop(
        "checked",
        true
      );
      $(`input[name='flexBannerDefault'][value='${json.banner}']`).prop(
        "checked",
        true
      );
      $(`input[name='flexBannerDefault'][value='${json.banner}']`).prop(
        "checked",
        true
      );
      $(`input[name='flexQualityDefault'][value='${json.quality}']`).prop(
        "checked",
        true
      );
      $(`input[name='flexOrientation-RequestedDefault'][value='${json.orientation}']`).prop(
        "checked",
         true
      );
      $(`input[name='flexNumberDefault'][value='${json.number}']`).prop(
        "checked",
        true
      );
    });
  });
});

// jQuery(window).on("load", function (data) {

// //  var printer = data[1].printerName
// //  console.log(printer);
// //  ajaxProfile(printer);
//   $("#selectProfile").on("change", function () {
//     var printer = data[1].printerName
//     console.log(printer);
//     ajaxProfile(printer);
//   });
// });
