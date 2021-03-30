//funzione che recupera i valori selzionati dalle rispettive select e gli passa alla funzione nel back-end responsabile della creazione del profilo
$(function () {
  $("#button").on("click", function () {
    var name = $("#selectPrinter").val();
    var profile = $("#inputText").val();
    var selected = $("#formLp option:checked");
    //creo un array associativo per chiavi/valori
    var advancedOptions = {};
    $("#oOptions option:selected").each(function () {
      advancedOptions[$(this).parent().attr("id")] = $(this).val();
    });
    

    //FormData mi permette di costruire un set di chiavi/valori facilmente trattabili
    var formData = new FormData();
    formData.append("printerName", name);
    formData.append("profileName", profile);
    formData.append(
      "options",
      JSON.stringify({
        printerName: name,
        size: selected[0].value,
        side: selected[1].value,
        banner: selected[2].value,
        quality: selected[3].value,
        orientation: selected[4].value,
        number: selected[5].value,
      })
    );
    formData.append("oOptions", JSON.stringify(advancedOptions));

    $.ajax({
      method: "POST",
      url: "/profilePost",
      data: formData,
      processData: false,
      contentType: false,
      error: function () {
        alert("error");
      },
      success: function () {
        var string =
          '<div class="alert alert-success alert-dismissible rounded-pill fade show" role="alert" style="padding-left: 20px; padding-top: 20px; margin-right: 50%;">';
        string += "<p> Profile saved successfully</p>";
        $("#profile").html(string);
      },
    });
  });
});
