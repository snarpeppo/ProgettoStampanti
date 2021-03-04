// window.onload = $(function () {
ajax = function (option) {
  $.ajax({
    method: "GET",
    url: "/lpstatCompleted",
    data: {
      preference: option,
    },
    error: function () {
      alert("Error");
    },
  }).done(function (data) {
    var string =
      "<thead><tr class='table-dark'><th>Printer Name</th><th>Job Commissioner</th><th>Date</th></thead><tbody>";
    $.each(data, function (key, value) {
      string +=
        "<tr><td>" +
        value["printername"] +
        "</td><td>" +
        value["owner"] +
        "</td><td>" +
        value["date"] +
        "</td></tr>";
    });
    string += " </tbody></table>";
    $("#allJobs").html(string);
  });
};
jQuery(window).on("load", function () {
    var option = $("#selectJobs").val();
    ajax(option);
  $("#selectJobs").on("change", function () {
    var option = $("#selectJobs").val();
    ajax(option);
    console.log(option);
  });
});
