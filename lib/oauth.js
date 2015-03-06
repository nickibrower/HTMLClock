var client_id;
var type;
var cb;

function imgurInit(params) {
   client_id = params.client_id;
   type = params.type;
   cb = params.callback_function;
}

function imgurLogin() {
   window.open("https://api.imgur.com/oauth2/authorize?client_id="+client_id+"&response_type="+type);
}

function imgur_cb() {
   $.ajax({
      url: 'https://api.imgur.com/3/account/me',
      method: 'GET',
      headers: {
         "Authorization": "Bearer " + localStorage.getItem("access_token"),
      },
      success: function(result) {
         alert("Knock knock.... Who's there?... " + result.data.url + "!");
      },
      error: function(result) {
         console.log("Ruh roh... error:" + JSON.stringify(result)); 
      },
      fail: function(result) {
         console.log("Ruh roh... fail:" + JSON.stringify(result)); 
      }
   });
}
