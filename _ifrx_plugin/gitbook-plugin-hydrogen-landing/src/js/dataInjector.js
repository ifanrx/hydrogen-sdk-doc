const Vue = require('vue')
const eventBus = require('./eventBus')

exports.init = function() {
  Vue.filter('addSlashPostfixIfNotEmpty', function(value) {
    return /^\{\{[\w_]+\}\}$/.test(value) ? '' : value + '/'
  })
  /* eslint-disable no-new */
  new Vue({
    el: '.page-wrapper',
    data: () => {
      return {
        app_id: '{{app_id}}',
        app_name: '{{app_name}}',
        client_id: '{{client_id}}',
        enterprise_id: '{{enterprise_id}}',
        isBaasLogined: false,
      }
    },
    created() {
      eventBus.$on('syncData', data => {
        this.app_id = data.app_id
        this.app_name = data.app_name
        this.client_id = data.client_id
        this.enterprise_id = data.enterprise_id
        this.isBaasLogined = data.isBaasLogined
      })
    },
  })
}
