$(function () {
  $("#button").on("click", function () {
    var name = $("#selectPrinter").val();
    console.log(name);
    var profile = $("#inputText").val();
    var selected = $("#formLp option:checked");
    var formData = new FormData();
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
