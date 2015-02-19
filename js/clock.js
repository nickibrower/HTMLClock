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
   var forecastAPI = "https://api.forecast.io/forecast/cd61886aa4701a18e8cb0263548ceb2e/35.300399,-120.662362?callback=?";

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

var showDeleteAlarmPopup = function() {
   $("#activeAlarms").remove();
   var select = $("<select/>", {id: "activeAlarms"});
   var AlarmObject = Parse.Object.extend("Alarm");
   var query = new Parse.Query(AlarmObject);
   query.find({
      success: function(results) {
         for (var i = 0; i < results.length; i++) { 
            var choice = results[i].get("alarmName") + " ~ " + results[i].get("hours") + ":" + results[i].get("mins") + results[i].get("ampm");
            select.append($("<option/>").attr("value", choice).text(choice));
         }
      }
   });

   $("#deleteTimeContainer").append(select);
   document.getElementById("mask").removeAttribute("class");
   document.getElementById("deletePopup").removeAttribute("class");
};

var hideDeleteAlarmPopup = function() {
   document.getElementById("mask").setAttribute("class", "hide");
   document.getElementById("deletePopup").setAttribute("class", "hide");
};

var showAlarmPopup = function() {
   document.getElementById("mask").removeAttribute("class");
   document.getElementById("popup").removeAttribute("class");
};

var hideAlarmPopup = function() {
   document.getElementById("mask").setAttribute("class", "hide");
   document.getElementById("popup").setAttribute("class", "hide");
};

var deleteAlarm = function() {
   var alarm = $("#activeAlarms option:selected").text();
   var text = alarm.split(" ~ ");

   var AlarmObject = Parse.Object.extend("Alarm");
   var query = new Parse.Query(AlarmObject);
   query.find({
      success: function(results) {
         for (var i = 0; i < results.length; i++) { 
            var time = results[i].get("hours") + ":" + results[i].get("mins") + results[i].get("ampm");
            if (results[i].get("alarmName") == text[0] && time == text[1]) {
               results[i].destroy({
                  success: function(myObject) {
                     document.getElementById("mask").setAttribute("class", "hide");
                     document.getElementById("deletePopup").setAttribute("class", "hide");
                     $("#alarms").empty();
                     getAllAlarms();
                  }
               });
            }
         }
      }
   });
};

var insertAlarm = function(hours, mins, ampm, alarmName) {
   var $div = $("<div>", {id: alarmName+hours+":"+mins+ampm, class: "flexbale"});
   var $name = $("<div>", {class: "name", style: "float: left"});
   var $time = $("<div>", {class: "time", style: "text-align: right"});

   $name.html(alarmName);
   $time.html(hours+":"+mins+ampm);

   $div.append($name);
   $div.append($time);
   $("#alarms").append($div);
};

var addAlarm = function() {
   var hours = $("#hours option:selected").text();
   var mins = $("#mins option:selected").text();
   var ampm = $("#ampm option:selected").text();
   var alarmName = document.getElementById("alarmName").value;
   
   var AlarmObject = Parse.Object.extend("Alarm");
   var alarmObject = new AlarmObject();
      alarmObject.save({"hours": hours, "mins": mins, "ampm": ampm, "alarmName": alarmName}, {
      success: function(object) {
         insertAlarm(hours, mins, ampm, alarmName);
         hideAlarmPopup();
      }
   });
};

var getAllAlarms = function() {
   Parse.initialize("xFkjAjEU65r4hUuwYprtB8dpSPeoiy94Qo5H4JQJ", "MFw6AhlRdhAPkbXUj0QPUgtay0QSBiy2Lajc9lhR");

   var AlarmObject = Parse.Object.extend("Alarm");
   var query = new Parse.Query(AlarmObject);
   query.find({
      success: function(results) {
         for (var i = 0; i < results.length; i++) { 
            insertAlarm(results[i].get("hours"), results[i].get("mins"), results[i].get("ampm"), results[i].get("alarmName")); 
         }
      }
   });
};

var userID;

function signinCallback(authResult) {
   console.log("hey");
   if (authResult['status']['signed_in']) {
      gapi.client.load('plus', 'v1',function(){
         gapi.client.plus.people.get({'userId':'me'}).execute(function(resp) {
            userID = resp.id;   
            $("#alarmHeader h2 #headerText").text(resp.displayName + "'s Alarms");
            document.getElementById('signinButton').setAttribute('style', 'display: none');
            document.getElementById('signOut').setAttribute('style', 'display: block');
            document.getElementById('addAlarms').setAttribute('style', 'display: block');
            document.getElementById('delAlarms').setAttribute('style', 'display: block');
         });
      });
   } else {
      // Update the app to reflect a signed out user
      // Possible error values:
      //   "user_signed_out" - User is signed-out
      //   "access_denied" - User denied access to your app
      //   "immediate_failed" - Could not automatically log in the user
      console.log('Sign-in state: ' + authResult['error']);
   }
}

function googleSignOut() {
   gapi.auth.signOut();
   $("#alarmHeader h2 #headerText").text(resp.displayName + "'s Alarms");
   document.getElementById('signinButton').setAttribute('style', 'display: block');
   document.getElementById('signOut').setAttribute('style', 'display: none');
   document.getElementById('addAlarms').setAttribute('style', 'display: none');
   document.getElementById('delAlarms').setAttribute('style', 'display: none');
}


getTime();
getTemp();
//getAllAlarms();
