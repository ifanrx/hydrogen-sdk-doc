require('./css/iconfont.css')
require('./css/plugin.css')
const header = require('./js/header')
const dataInjector = require('./js/dataInjector')
const vote = require('./js/vote')
const utils = require('./js/utils')

function sidebarScrollIntoView() {
  let el = document.querySelector('.book-summary .active')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}

function addHeader() {
  if (document.querySelector('#ifanrx-summary-header')) return false

  let el = document.querySelector('.book-summary')
  let node = document.createElement('div')
  node.id = 'ifanrx-summary-header'
  node.innerHTML = '知晓云文档 2.0+'
  el.insertBefore(node, el.firstChild)
}

function addRecordNumber() {
  let linkEle = document.querySelector('.gitbook-link')
  linkEle.innerText = '粤 ICP 备 10211557 号-25'
  linkEle.href = 'http://beian.miit.gov.cn'
  linkEle.target = '_blank'
}

function addCustomerBtn() {
  if (document.querySelector('#ifanrx-customer-btn')) return false

  let node = document.createElement('a')
  node.id = 'ifanrx-customer-btn'
  node.title = '提工单'
  node.href = 'http://support.minapp.com/hc/'
  node.target = '_blank'
  node.innerHTML = '<p>提交工单</p>'
  document.body.appendChild(node)
}

function addPlanningBtn() {
  if (document.querySelector('#ifanrx-planning-btn')) return false

  let node = document.createElement('a')
  node.id = 'ifanrx-planning-btn'
  node.title = '产品规划'
  node.href = 'https://jinshuju.net/f/hrwwT1'
  node.target = '_blank'
  node.innerHTML = '<p>产品规划</p>'
  document.body.appendChild(node)
}

function initVueInstance() {
  header.init()
  dataInjector.init()
  vote.init()
}

__non_webpack_require__(['gitbook', 'jQuery'], function(gitbook, $) {
  gitbook.events.bind('start', function(e, config) {
    window.isBaasLogined = false
    sessionStorage.clear() // 刷新页面时清空 sessionStorage

    document.body.addEventListener('click', event => {
      if (event.target.tagName === 'A' && /localhost:4000|127\.0\.0\.1:4000/.test(location.host)) {
        const match = /^https?:\/\/cloud\.minapp\.com(.*)$/.exec(event.target.href)
        if (match) {
          event.preventDefault()
          window.open(`http://localhost:8000/hydrogen${match[1]}`)
        }
      }
    }, false)

    setTimeout(() => {
      gitbook.toolbar.removeButtons(['btn-1', 'btn-2', 'btn-3'])

      const host = 'https://cloud.minapp.com'
      gitbook.toolbar.createButton({
        className: 'ifrx-btn ifrx-btn-landing',
        text: '知晓云',
        label: 'ifrx-btn-landing',
        position: 'right',
        onClick: function() {
          window.open(host)
        },
      })

      gitbook.toolbar.createButton({
        className: utils.isPC() ? 'ifrx-btn-miniapp' : 'ifrx-btn-miniapp ifrx-btn-miniapp-mobile',
        label: 'ifrx-btn-miniapp',
        position: 'left',
      })

      if (utils.isPC()) {
        addCustomerBtn()
        addPlanningBtn()
      }
    }, 300)
  })

  gitbook.events.bind('page.change', function() {
    $(".book-body .page-inner").append('<div id="vote-container"></div>')
    if (location.pathname === '/') {
      const page = document.querySelector('.page-inner')
      page.classList.add('index-page-inner')
    }

    addHeader()
    addRecordNumber()

    setTimeout(() => {
      sidebarScrollIntoView()
      initVueInstance()
    }, 300)
  })
})
