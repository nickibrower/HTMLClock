var redirect_init = function() {
   localStorage.setItem("imgur_access_token", window.location.hash);
   console.log("window.location in redirect_init: "+window.location);
   window.opener.imgur_cb();
   window.close();
   console.log("back in redirect");
};

window.onload = redirect_init;
