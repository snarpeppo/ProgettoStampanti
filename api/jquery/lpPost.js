$(function () {
  $("#button").on('click',function () {
    var input = document.getElementById("browseFile");
    console.log(input.files[0]);
    var formData = new FormData();
    formData.append("fileToPrint", input.files[0]);

    $.ajax({
      method: "POST",
      url: "/lpPost",
      data: formData,
      processData: false,
      contentType: false,
      error: function () {
        alert("Error");
      },
      success: function (request) {
        var string =
          '<div class="alert alert-success alert-dismissible rounded-pill fade show" role="alert" style="padding-left: 20px; padding-top: 20px; margin-right: 50%;">';
        string += "<p> Job added, navigate to Jobs to see it in the list</p>";
        string += "<p>" + request + "</p>";
        $("#result").html(string);
      },
    });
  });
});
