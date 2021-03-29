 function valueChange () {
    var profile = $("#selectProfile").val();
    var path = "/profileGet/" + profile;
    $.getJSON(path, function (json) {
      $("#selectPrinter").val(json.options.printerName);
      $("#SizeDefault").val(json.options.size);
      $("#SideDefault").val(json.options.side);
      $("#BannerDefault").val(json.options.banner);
      $("#QualityDefault").val(json.options.quality);
      $("#OrientationDefault").val(json.options.orientation);
      $("#NumberDefault").val(json.options.number);
      $("#oOptions").each(function () {
        var temp = $(this).find(":input");
        $(temp).each((element) => {
          $(temp[element]).val(json.oOptions[$(temp[element]).attr("id")]);
        });
      });
    });
};
