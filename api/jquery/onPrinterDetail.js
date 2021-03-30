  //restituisce il path corretto per la visualizzazione del dettaglio della stampante selezionata
  let onPrinterDetail = function(printerName){
   let stampante = window.location.href = '/details?printerName='+  printerName;
   return stampante;
  }


  