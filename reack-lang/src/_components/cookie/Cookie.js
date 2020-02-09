
function Cookie () {

}

Cookie.prototype.setCookie = function (key, value, expire_ms) {
    const d = new Date();
    d.setTime(d.getTime() + (expire_ms ? expire_ms : (30 * 24 * 60 * 60 * 1000))); // 有效期 30 天
    const expires = "expires=" + d.toGMTString();
    document.cookie = key + "=" + value + "; " + expires;
}

Cookie.prototype.getCookie = function(key) {
    const name = key + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        const c = ca[i].trim();
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export default new Cookie();

