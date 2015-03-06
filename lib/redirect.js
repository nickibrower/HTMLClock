var redirect_init = function() {
   localStorage.setItem("imgur_access_token", window.location.hash)
   window.opener.imgur_cb();
   window.close()
};

window.onload = redirect_init;
