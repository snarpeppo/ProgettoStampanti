$(function(){ 

  $("#select").on('change', function()
  { 
    var nomeStampante = $(this).val();
    console.log(nomeStampante)
  
    $.ajax
    ({
      method: "GET", 
      url: "/lpqGet",
      data: { 
        printername:nomeStampante
    },
      error: function()
        {
            alert("Error");
        }
    }).done(function( data ) { 
  
      var string="<thead><tr class='table-dark'> <th>Job Rank</th> <th>Job Commissioner</th><th>Job ID</th><th>Job File Name</th><th>Job Size</th></thead><tbody>";
      $.each( data, function( key, value ) { 
        string += "<tr><td>"+value['rank']+"</td><td>"+value['owner']+"</td><td>"+value['identifier']+"</td><td>"+value['files']+"</td><td>"+value['totalSize']+"</td></tr>"; 
            }); 
          string += ' </tbody></table>'; 
        $("#records").html(string); 
    }); 
  }); 
  });