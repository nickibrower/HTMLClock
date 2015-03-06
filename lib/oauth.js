var client_id;
var type;
var cb;
var myWindow;

var imgurInit = function(params) {
   client_id = params.client_id;
   type = params.type;
   cb = params.callback_function;
};

var imgurLogin = function() {
   myWindow = window.open("https://api.imgur.com/oauth2/authorize?client_id="+client_id+"&response_type="+type);
};

var imgur_cb = function() {
   console.log("imgur_access_token: "+localStorage.getItem("imgur_access_token"));

   console.log("window.location in cb: "+window.location);

   $.ajax({
      url: 'https://api.imgur.com/3/account/me',
      method: 'GET',
      headers: {
         Authorization: 'Bearer ' + localStorage.getItem("imgur_access_token"),
         Accept: 'application/json'
      },
      success: function(result) {
         alert("Knock knock.... Who's there?... " + result.data.url + "!");
      },
      fail: function() {
         console.log("Ruh roh, api request in callback function failed :("); 
      }
   });

};
