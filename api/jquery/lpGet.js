$(function(){ 

    $("#file").on('click', function()
    { 
    var imput = document.getElementById("file").val();  
    console.log(file);
    
      $.ajax
      ({
        method: "GET", 
        url: "/lp",
        data: { 
          file:imput
      },
        error: function()
          {
              alert("Error");
          }
      }).done(function( data ) { 
    
        
          $("#records").html(string); 
      }); 
    }); 
    });