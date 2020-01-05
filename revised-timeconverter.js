function timeConverter(UNIX_timestamp){

  // set up new date object
  var a = new Date(UNIX_timestamp * 1000);

  // convert date/time to simplified format
  var time = a.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

  // for time minus AM/PM
  if(time.includes(" AM")){
    // remove AM
    var convertedTime = time.replace(" AM", "");
  } else {
    // remove PM
    var convertedTime = time.replace(" PM", "");
  }

  // use the following line for time minus AM/PM
  //return convertedTime;

  // use the following line for time with AM/PM
  return time;

}