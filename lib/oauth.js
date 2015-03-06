var client_id;
var type;
var cb;
var myWindow;

function imgurInit(params) {
   client_id = params.client_id;
   type = params.type;
   cb = params.callback_function;

   console.log("client_id: "+ client_it);
   console.log("type: " + type);
   console.log("callback: "+ cb);
}

function imgurLogin() {
   console.log("opening: https://api.imgur.com/oauth2/authorize?client_id="+client_id+"    &response_type="+type)
   myWindow = window.open("https://api.imgur.com/oauth2/authorize?client_id="+client_id+"&response_type="+type);
}

function imgur_cb() {
   console.log("access_token: "+localStorage.getItem("access_token"));

   console.log("window.location in cb: "+window.location);

   $.ajax({
      url: 'https://api.imgur.com/3/account/me',
      method: 'GET',
      headers: {
         "Authorization": "Bearer " + localStorage.getItem("access_token"),
      },
      success: function(result) {
         alert("Knock knock.... Who's there?... " + result.data.url + "!");
      }
   });

}
