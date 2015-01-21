var getTime = function() {
   var d = new Date();
   var hr = d.getHours();
   var min = d.getMinutes();
   var sec = d.getSeconds();
   var ampm = hr < 12 ? " am" : " pm";

   if (min <= 9) 
      min= "0" + min;
   if (sec <= 9) 
      sec = "0" + sec;
   if (hr > 12)
      hr -= 12;

   document.getElementById("myDate").innerHTML = hr + ":" + min + ":" + sec + ampm;
   window.setTimeout(getTime,1000);

}

getTime();

