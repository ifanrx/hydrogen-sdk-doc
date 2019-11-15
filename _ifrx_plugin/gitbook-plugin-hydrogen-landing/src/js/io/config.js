module.exports = {
  apiHost: /localhost:4000|127\.0\.0\.1:4000/.test(location.host) ? `//localhost:8000` : '//cloud.minapp.com',
}
