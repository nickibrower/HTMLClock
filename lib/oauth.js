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
   myWindow = window.open("https://api.imgur.com/oauth2/authorize?client_id="+client_id+"&response_type="+type)
};

var imgur_cb = function() {
   alert("imgur_access_token: "+localStorage.getItem("imgur_access_token"));
/*
   $.ajax({
      type: "GET",
      url: "http:://https://api.imgur.com/3/account/me",
      success:function(results) {
      }
   });
*/
};

imgurInit({"client_id":"16c8e08fadfd7fd", "type":"token", "callback_function":"imgur_cb"})
