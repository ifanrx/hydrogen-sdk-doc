module.exports = {

  isPC() {
    let ua = navigator.userAgent
    let reg = /Android|iPhone|SymbianOS|Windows Phone|iPad|iPod|Mobile/gi
    return !reg.test(ua)
  },

}
