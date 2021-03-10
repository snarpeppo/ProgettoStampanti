$(function () {
  $("#selectProfile").on("change", function () {
    var profile = $("#selectProfile").val();
    var path = "/profileGet/" + profile;
    $.getJSON(path, function (json) {
      $("#selectPrinter").val(json.printerName);
      $(`input[name='flexSizeDefault'][value='${json.size}']`).prop('checked', true);
      $(`input[name='flexSideDefault'][value='${json.side}']`).prop('checked', true);
      $(`input[name='flexBannerDefault'][value='${json.banner}']`).prop('checked', true);
      $(`input[name='flexBannerDefault'][value='${json.banner}']`).prop('checked', true);
      $(`input[name='flexQualityDefault'][value='${json.quality}']`).prop('checked', true);
      $(`input[name='flexOrientation-RequestedDefault'][value='${json.orientation}']`).prop('checked', true);
      $(`input[name='flexNumberDefault'][value='${json.number}']`).prop('checked', true);
    });
    return;
    $.ajax({
      method: "GET",
      url: "/profileGet",
      dataType: "json",
      data: {
        profileName: profile,
      },
      error: function () {
        alert("Error");
      },
      success: function (data) {
        console.log(data);
      },
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
