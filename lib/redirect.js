function redirect_init() {
   localStorage.setItem("access_token", window.location.hash.split('=')[1].split('&')[0]);
   window.opener.imgur_cb();
   window.close();
}
