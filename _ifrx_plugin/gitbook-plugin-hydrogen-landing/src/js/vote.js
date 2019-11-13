const Vue = require('vue')
const vote = require('./components/vote.vue')

exports.init = function() {
  if (location.pathname === '/') return
  Vue.config.delimiters = ['[[', ']]']
  window.voteVm = new Vue({
    el: '#vote-container',
    replace: false,
    data: () => {
      return {
        id: location.pathname.replace(/^\/|\.html$|\/$/g, '').replace(/\//g, '-'),
      }
    },
    template: '<vote v-bind:page-id="id" />',
    components: {
      'vote': vote,
    },
  })
}
