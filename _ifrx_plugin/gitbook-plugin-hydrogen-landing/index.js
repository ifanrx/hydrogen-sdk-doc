const manifest = require('./dist/manifest.json')
// var _ = require('lodash')
var markdown = require('gitbook-markdown')
var uid = 1

module.exports = {
  book: {
    assets: './dist',
    css: [
      manifest['index.css'],
    ],
    js: [
      manifest['index.js'],
    ],
  },
  blocks: {
    'ifanrxCodeTabs': {
      blocks: ['content'],
      process: function(block) {
        var book = this.book
        var content = '<ul class=\'nav nav-tabs\' role=\'tablist\'>'
        var classData = 'active'
        var blockUID = uid++
        content += `<li role="presentation" class="${classData}"><a href="#wechat-${blockUID}" aria-controls="wechat-${blockUID}" role="tab" data-toggle="tab">微信小程序</a></li>`
        content += `<li role="presentation" class=""><a href="#qq-${blockUID}" aria-controls="qq-${blockUID}" role="tab" data-toggle="tab">QQ 小程序</a></li>`
        content += `<li role="presentation" class=""><a href="#web-${blockUID}" aria-controls="web-${blockUID}" role="tab" data-toggle="tab">Web</a></li>`
        content += `<li role="presentation" class=""><a href="#alipay-${blockUID}" aria-controls="alipay-${blockUID}" role="tab" data-toggle="tab">支付宝小程序</a></li>`
        content += `<li role="presentation" class=""><a href="#baidu-${blockUID}" aria-controls="baidu-${blockUID}" role="tab" data-toggle="tab">百度小程序</a></li>`

        // _.map(block.kwargs, function(value, key) {
        //   if (!_.startsWith(key, "__")) {
        //     content += `<li role="presentation" class="${classData}"><a href="#${key}" aria-controls="${key}" role="tab" data-toggle="tab">${value}</a></li>`;
        //     classData = "";
        //   }
        // });
        content += '</ul>'
        content += '<div class=\'tab-content\'>'
        var activeState = 'active'
        var markup = markdown.page(block.body).content
        content += `<div role="tabpanel" class="tab-pane ${activeState}" id="wechat-${blockUID}">${markup}</div>`
        content += `<div role="tabpanel" class="tab-pane" id="qq-${blockUID}">${markup.replace(/wx\.BaaS/g, 'qq.BaaS')}</div>`
        content += `<div role="tabpanel" class="tab-pane" id="web-${blockUID}">${markup.replace(/wx\.BaaS/g, 'BaaS')}</div>`
        content += `<div role="tabpanel" class="tab-pane" id="alipay-${blockUID}">${markup.replace(/wx\.BaaS/g, 'my.BaaS')}</div>`
        content += `<div role="tabpanel" class="tab-pane" id="baidu-${blockUID}">${markup.replace(/wx\.BaaS/g, 'swan.BaaS')}</div>`

        // _.map(block.blocks, function (b) {
        //   var markup = markdown.page(b.body).content;
        //   content += `<div role="tabpanel" class="tab-pane ${activeState}" id="${b.args[0]}">${markup}</div>`;
        //   activeState = "";
        // });
        content += '</div>'
        return content
      },
    },
  },
}
