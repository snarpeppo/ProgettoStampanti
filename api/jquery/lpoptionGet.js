ajaxLpoption = function (nomeStampante) {
    $.ajax({
      method: "GET",
      url: "/lpoptionGet",
      data: {
        printername: nomeStampante,
      },
      error: function () {
        alert("Error");
      },
    }).done(function (data) {
      console.log(Object.keys(data).length);
        var string =
        "<p>" + data + "</p>";
        $("#profile").html(string);
      
    });
  };
  jQuery(window).on("load", function () {
    var nomeStampante = $("#select").val();
    ajaxLpoption(nomeStampante);
    $("#select").on("change", function () {
      var nomeStampante = $("#select").val();
      ajaxLpoption(nomeStampante);
    });
  });