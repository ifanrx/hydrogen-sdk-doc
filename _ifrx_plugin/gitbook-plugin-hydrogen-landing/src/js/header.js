const Vue = require('vue')
const appSelector = require('./components/app-selector.vue')

exports.init = function() {
  Vue.config.delimiters = ['[[', ']]'] // 替换 {{}}，花括号与 markdown 有冲突
  /* eslint-disable no-new */
  new Vue({
    el: '.ifrx-btn-miniapp',
    template: '<app-selector />',
    replace: false,
    components: {
      'app-selector': appSelector,
    },
  })
}
