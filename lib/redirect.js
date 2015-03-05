var redirect_init = function() {
   localStorage.setItem("imgur_authURL", location);
   localStorage.setItem("imgur_access_token", window.location.hash)
   alert("access token: " + localStorage.getItem("imgur_access_token"))
   imgur_cb();
   window.close()
};

window.onload = redirect_init;
