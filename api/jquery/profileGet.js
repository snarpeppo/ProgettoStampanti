$(function () {
  $("#selectProfile").on("change", function () {
    var profile = $("#selectProfile").val();
    var path = "/profileGet/" + profile;
    $.getJSON(path, function (json) {
      $("#selectPrinter").val(json.printerName);
      $("#SizeDefault").val(json.size);
      $("#SideDefault").val(json.side);
      $("#BannerDefault").val(json.banner);
      $("#QualityDefault").val(json.quality);
      $("#OrientationDefault").val(json.orientation);
      $("#NumberDefault").val(json.number);
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
