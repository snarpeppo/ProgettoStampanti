$(function () {
    $("#select").on("change", function () {
      var nomeStampante = $(this).val();
      console.log(nomeStampante)
  
      $.ajax({
        method: "POST",
        url: "/lpGet",
        data: {
          printername: nomeStampante,
        },
        error: function () {
          alert("Error");
        },
      }).done(function (data) {
          console.log(data);
        return data;
        
     
      });
    });
  });