//funzione manda il nome del profilo che si vuole cancellare alla funzione nel back-end
ajaxDelete = function (profile) {
  $.ajax({
    method: "GET",
    url: "/profileDelete",
    data: {
      profileName: profile,
    },
    error: function () {
      alert("Error");
    },
  }).done(function () {
    var string =
      '<div class="alert alert-success alert-dismissible rounded-pill fade show" role="alert" style="padding-left: 20px; padding-top: 20px; margin-right: 50%;">';
    string += `<p>${profile} deleted successfully</p>`;
    $("#profile").html(string);
  });
};

$("#delete").on("click", function () {
  var profile = $("#selectProfile").val();
  ajaxDelete(profile);
});
