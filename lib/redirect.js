function redirect_init() {
   localStorage.setItem("access_token", window.location.hash.split('=')[1]);
   console.log("window.location in redirect_init: "+window.location);
   window.opener.imgur_cb();
   window.close();
   console.log("back in redirect");
}
