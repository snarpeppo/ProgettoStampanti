
$(function () {
    $("#button").on("click", function () {
      var name = $("#select").val();
      var profile = $("#profile").val();
      var copie = $("#numberOfCopies").val();
      var selected = $("#formLp input[type='radio']:checked");
      var formData = new FormData();
      formData.append("settaggio",JSON.stringify({
        printerName: name,
        copyNumber: copie[0],
        size: selected[0].value,
        quality: selected[1].value,
        side: selected[2].value,
        banner: selected[3].value,
        orientation: selected[4].value,
        number: selected[5].value
      }));
      return
  
      $.ajax({
        method: "POST",
        url: "/profilePost",
        data: formData,
        processData: false,
        contentType: false,
        error: function () {
            
        },
        success: function (request) {
          
          },
        }),
      }),
    });


