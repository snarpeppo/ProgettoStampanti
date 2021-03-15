$(function () {
  $("#button").on("click", function () {
    var name = $("#selectPrinter").val();
    var input = document.getElementById("browseFile");
    var copie = $("#numberOfCopies").val();
    var selected = $("#formLp option:checked");
  
    console.log(copie);
    console.log(input.files[0]);
    console.log(selected[0].value);
    // var formData = new FormData();
    // formData.append("printerName", name);
    // formData.append("fileToPrint", input.files[0]);
    // formData.append("copyNumber", copie[0]);
    // formData.append("size", selected[0].value);
    // formData.append("side", selected[1].value);
    // formData.append("banner", selected[2].value);
    // formData.append("quality", selected[3].value);
    // formData.append("orientation", selected[4].value);
    // formData.append("number", selected[5].value);
return
    $.ajax({
      method: "POST",
      url: "/lpPost",
      data: formData,
      processData: false,
      contentType: false,
      error: function () {
        var string =
          '<div class="alert alert-danger alert-dismissible rounded-pill fade show" role="alert" style="padding-left: 20px; padding-top: 20px; margin-right: 50%;">';
        string += "<p>Missing file to print, please select one!</p>";
        $("#result").html(string);
      },
      success: function (request) {
        if (request == "") {
          var string =
            '<div class="alert alert-danger alert-dismissible rounded-pill fade show" role="alert" style="padding-left: 20px; padding-top: 20px; margin-right: 50%;">';
          string += "<p>Please insert the correct amout of copys!</p>";
          $("#result").html(string);
        } else {
          var string =
            '<div class="alert alert-success alert-dismissible rounded-pill fade show" role="alert" style="padding-left: 20px; padding-top: 20px; margin-right: 50%;">';
          string += "<p> Job added, navigate to Jobs to see it in the list</p>";
          $("#result").html(string);
        }
      },
    });
  });
});
