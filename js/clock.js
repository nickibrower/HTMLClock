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
};

var getTemp = function() {
   var x;
   var y;

   navigator.geolocation.getCurrentPosition(function (position) {
      x = position.coords.latitude;
      y = position.coords.longitude;
      alert("lat: "+x+", long: "+y);
   });

   //var forecastAPI = "https://api.forecast.io/forecast/cd61886aa4701a18e8cb0263548ceb2e/35.300399,-120.662362?callback=?";
   var forecastAPI = "https://api.forecast.io/forecast/cd61886aa4701a18e8cb0263548ceb2e/" + x + "," + y + "-120.662362?callback=?";
   var success = function (result) {
      $("#forecastLabel").html(result.daily.summary);
      $("#forecastIcon").attr("src", "./img/"+result.currently.icon+".png");

      var tempMax = result.daily.data[0].temperatureMax;
      if (tempMax < 60)
         $("body").addClass("cold");
      else if (tempMax >= 60 && tempMax < 70)   
         $("body").addClass("chilly");
      else if (tempMax >= 70 && tempMax < 80)   
         $("body").addClass("nice");
      else if (tempMax >= 80 && tempMax < 90)   
         $("body").addClass("warm");
      else
         $("body").addClass("hot");

   };

   $.getJSON(forecastAPI, success);
};

getTime();
getTemp();
