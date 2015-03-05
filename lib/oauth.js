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
   alert("opened window: https://api.imgur.com/oauth2/authorize?client_id=    "+client_id+"&response_type="+type)
   myWindow = window.open("https://api.imgur.com/oauth2/authorize?client_id="+client_id+"&response_type="+type)
};

var imgur_cb = function() {
   alert("sup foo")
/*
   $.ajax({
      type: "GET",
      url: "http:://https://api.imgur.com/3/account/me",
      success:function(results) {
      }
   });
*/
   myWindow.close();
};

imgurInit({"client_id":"16c8e08fadfd7fd", "type":"token", "callback_function":"imgur_cb"})
