module.exports = {
  isPC() {
    let ua = navigator.userAgent
    let reg = /Android|iPhone|SymbianOS|Windows Phone|iPad|iPod|Mobile/gi
    return !reg.test(ua)
  },

  getLoginUrl() {
    const host = /localhost:4000|127\.0\.0\.1:4000/.test(location.host) ? `//localhost:8000` : '//cloud.minapp.com'
    const next = encodeURIComponent(location.href);
    return `${host}/login/?next=${next}`;
  }
}
