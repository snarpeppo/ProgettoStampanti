// funzione ajax che crea la tabella con i dettagli del comando di 'lpstat',(i dettagli dei 'jobs' per la singola stampante )
ajaxLpstat = function (option) {
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
    //costruzione della tabella in questione
    var string =
      "<thead><tr class='table-dark'><th>Printer Name</th><th>Job Commissioner</th><th>File Size</th><th>Date</th></thead><tbody>";
    $.each(data, function (key, value) {
      string +=
        "<tr><td>" +
        value["printername"] +
        "</td><td>" +
        value["owner"] +
        "</td><td>" +
        value["fileSize"] +
        "</td><td>" +
        value["date"] +
        "</td></tr>";
    });
    string += " </tbody></table>";
    $("#allJobs").html(string);
  });
};
//chiamata alla funzione, verra creata una tabella anche al caricamento iniziale della pagina
jQuery(window).on("load", function () {
    var option = $("#selectJobs").val();
    ajaxLpstat(option);
  $("#selectJobs").on("change", function () {
    var option = $("#selectJobs").val();
    ajaxLpstat(option);
    console.log(option);
  });
});
