
$(function(){ 

    $("#select").on('change', function()
    { 
      var nomeStampante = $(this).val();
      console.log(nomeStampante)

      $.ajax
      ({
        method: "GET", 
        url: "lpq.js",
        error: function()
          {
              alert("Error");
          }
      }).done(function( data ) { 

        var result= JSON.parse(data); 
        console.log(result)

        var string="<table> <thead><tr class='table-dark'> <th>Job Rank</th> <th>Job Commissioner</th><th>Job ID</th><th>Job File Name</th><th>Job Size</th><tr>";

        $.each( result, function( key, value ) { 

          string += "<tr> <td>"+value['rank']+"</td><td>"+value['owner']+"</td><td>"+value['identifier']+"</td><td>"+value['files']+"</td><td>"+value['files']+"</td> </tr>"; 
              }); 

            string += '</table>'; 

          $("#records").html(string); 
      }); 
  }); 
});