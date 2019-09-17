var markdown = require('gitbook-markdown');

module.exports = {
  book: {
    assets: './assets',
    css: ['plugin.css'],
  },
  blocks: {
    'ifanrxfold': {
      blocks: ['content'],
      process: function (block) {
        let attr = Object.keys(block.kwargs).reduce(function (result, key) {
          if (key !== 'summary' && key !== '__keywords') {
            let prefix = result === '' ? '' : ' '
            let attrItem = block.kwargs[key] === true ? key : `${key}="${block.kwargs[key]}"`
            result += prefix + attrItem
          }
          return result
        }, '')
        var content = `<details ${attr}>`
        content += `<summary>${block.kwargs.summary || 'Details'}</summary>`
        var markup = markdown.page(block.body).content
        content += `<div>${markup}</div>`
        content += '</details>'
        return content
      }
    }
  }
}
