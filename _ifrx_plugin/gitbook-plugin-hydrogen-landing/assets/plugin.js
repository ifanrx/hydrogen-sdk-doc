function sidebarScrollIntoView() {
  let el = document.querySelector('.book-summary .active')
  if (el) {
    el.scrollIntoView({behavior: 'smooth', block: 'center'})
  }
  addHeader()
}

function addHeader() {
  if (document.querySelector('#ifanrx-summary-header')) return false

  let el = document.querySelector('.book-summary')
  let node = document.createElement('div')
  node.id = 'ifanrx-summary-header'
  node.innerHTML = '知晓云文档 2.0+'
  el.insertBefore(node, el.firstChild)
}

function addCustomerBtn() {
  if (document.querySelector('#ifanrx-customer-btn')) return false

  let el = document.querySelector('.book-summary')
  let node = document.createElement('a')
  node.id = 'ifanrx-customer-btn'
  node.title = '提工单'
  node.href = 'http://support.minapp.com/hc/'
  node.target = '_blank'
  node.innerHTML = '<i class="iconfont icon-Customer"></i>'
  document.body.appendChild(node)
}

function addRecordNumber() {
  let linkEle = document.querySelector('.gitbook-link')
  linkEle.innerText = '粤 ICP 备 10211557 号-25'
  linkEle.href = 'http://beian.miit.gov.cn'
  linkEle.target = '_blank'
}

require(["gitbook", "jQuery"], function (gitbook, $) {
  gitbook.events.bind('start', function (e, config) {
    setTimeout(() => {
      gitbook.toolbar.removeButtons(['btn-1', 'btn-2', 'btn-3'])
      let host = 'https://cloud.minapp.com'

      gitbook.toolbar.createButton({
        className: 'ifrx-btn',
        text: '进入控制台',
        label: 'ifrx-btn-console',
        position: 'right',
        onClick: function () {
          window.open(host + '/dashboard/')
        }
      })

      gitbook.toolbar.createButton({
        className: 'ifrx-btn ifrx-btn-landing',
        text: '知晓云',
        label: 'ifrx-btn-landing',
        position: 'right',
        onClick: function () {
          window.open(host)
        }
      })

      addCustomerBtn()
      addHeader()
    }, 300)
  })

  gitbook.events.bind('page.change', function () {
    addRecordNumber()
    if (location.pathname === '/') {
      const page = document.querySelector('.page-inner')
      page.classList.add('index-page-inner')
    }
    setTimeout(sidebarScrollIntoView, 300)
  })
})
