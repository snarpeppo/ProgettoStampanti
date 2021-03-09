
$(function () {
    $("#button").on("click", function () {
      var name = $("#select").val();
      var profile = $("#profileName").val();
      // var copie = $("#numberOfCopies").val();
      var selected = $("#formLp input[type='radio']:checked");
      var formData = new FormData();
      formData.append("profileName", profile);
      formData.append("settaggio",JSON.stringify({
        printerName: name,
        size: selected[0].value,
        quality: selected[1].value,
        side: selected[2].value,
        banner: selected[3].value,
        orientation: selected[4].value,
        number: selected[5].value
      }));
      
  
      $.ajax({
        method: "POST",
        url: "/profilePost",
        data: formData,
        processData: false,
        contentType: false,
        error: function () {
            alert('error');
        },
        success: function (request) {
          $("#profile").html(request);
          },
        });
      });
    });


