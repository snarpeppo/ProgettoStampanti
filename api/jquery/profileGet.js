$(function () {
  $("#selectProfile").on("change", function () {
    console.log(options.data[1].printerName);
    $.ajax({
      method: "GET",
      url: "/profileGet/:profileName",
      dataType: "json",
      data: data,
      error: function () {
        alert("Error");
      },
      success: function (data) {},
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
