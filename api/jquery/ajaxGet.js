// chiamata ajax che crea la tabella relativa ai 'jobs' della stampante con i valori restituiti dal back-end
ajaxLpq = function (nomeStampante) {
  $.ajax({
    method: "GET",
    url: "/lpqGet",
    data: {
      printername: nomeStampante,
    },
    error: function () {
      alert("Error");
    },
  }).done(function (data) {
   //se data ha dei valori, crea la tabella
    if (Object.keys(data).length > 0) {
      $("#records").show();
      $("#empty").hide();
      var string =
        "<thead><tr class='table-dark'><th>Job Rank</th><th>Job Commissioner</th><th>Job ID</th><th>Job File Name</th><th>Job Size</th></thead><tbody>";
      $.each(data, function (key, value) {
        string +=
          "<tr><td>" +
          value["rank"] +
          "</td><td>" +
          value["owner"] +
          "</td><td>" +
          value["identifier"] +
          "</td><td>" +
          value["files"] +
          "</td><td>" +
          value["totalSize"] +
          "</td></tr>";
      });
      string += " </tbody></table>";
      $("#records").html(string);
      //altrimenti, avvisa che non ci sono 'jobs' su quella stampante
    } else {
      $("#empty").show();
      $("#records").hide();
      var string = "<h3>";
      string += nomeStampante + " has no active jobs yet";
      string += " </h3>";
      $("#empty").html(string);
    }
  });
};
//permette la creazione della tabella al caricamento della pagina
jQuery(window).on("load", function () {
  var nomeStampante = $("#select").val();
  ajaxLpq(nomeStampante);
  $("#select").on("change", function () {
    var nomeStampante = $("#select").val();
    ajaxLpq(nomeStampante);
  });
});
