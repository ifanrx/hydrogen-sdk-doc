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
  node.title = '提交工单'
  node.innerHTML = '<p>提交工单</p>'
  node.style.cursor = 'pointer'
  node.addEventListener('click', function (e) {
    e.preventDefault()
    showTicketModal()
  })
  document.body.appendChild(node)
}

function showTicketModal() {
  let modal = document.querySelector('#ifanrx-customer-modal')
  if (!modal) {
    modal = document.createElement('div')
    modal.id = 'ifanrx-customer-modal'
    modal.innerHTML = `
      <div class="ifrx-modal-mask"></div>
      <div class="ifrx-modal-content">
        <span class="ifrx-modal-close" id="ifrx-modal-close-btn">&times;</span>
        <h2 class="ifrx-modal-title">提交工单</h2>
        <div class="ifrx-modal-desc">
          如需提交工单，请发送邮件至
          <a href="mailto:mincloud@ifanr.com" class="ifrx-modal-mail" id="ifrx-modal-mail-link">mincloud@ifanr.com</a>，
          我们将尽快为您处理，谢谢！
        </div>
        <button class="ifrx-modal-copy-btn" id="ifrx-modal-copy-btn">复制邮箱</button>
      </div>
    `
    document.body.appendChild(modal)

    // 关闭弹窗
    document.getElementById('ifrx-modal-close-btn').onclick = function () {
      modal.style.display = 'none'
    }
    modal.querySelector('.ifrx-modal-mask').onclick = function () {
      modal.style.display = 'none'
    }
    // 复制邮箱
    document.getElementById('ifrx-modal-copy-btn').onclick = function () {
      const email = 'mincloud@ifanr.com'
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email)
      } else {
        // 兼容老浏览器
        const input = document.createElement('input')
        input.value = email
        document.body.appendChild(input)
        input.select()
        document.execCommand('copy')
        document.body.removeChild(input)
      }
      this.innerText = '已复制'
      setTimeout(() => {
        this.innerText = '复制邮箱'
      }, 1500)
    }
  }
  modal.style.display = 'block'
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

__non_webpack_require__(['gitbook', 'jQuery'], function (gitbook, $) {
  gitbook.events.bind('start', function (e, config) {
    window.isBaasLogined = false
    sessionStorage.clear() // 刷新页面时清空 sessionStorage

    document.body.addEventListener(
      'click',
      event => {
        if (
          event.target.tagName === 'A' &&
          /localhost:4000|127\.0\.0\.1:4000/.test(location.host)
        ) {
          const match = /^https?:\/\/cloud\.minapp\.com(.*)$/.exec(event.target.href)
          if (match) {
            event.preventDefault()
            window.open(`http://localhost:8000/hydrogen${match[1]}`)
          }
        }
      },
      false
    )

    setTimeout(() => {
      gitbook.toolbar.removeButtons(['btn-1', 'btn-2', 'btn-3'])

      const host = 'https://cloud.minapp.com'
      gitbook.toolbar.createButton({
        className: 'ifrx-btn ifrx-btn-landing',
        text: '知晓云',
        label: 'ifrx-btn-landing',
        position: 'right',
        onClick: function () {
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

  gitbook.events.bind('page.change', function () {
    if (location.pathname === '/') {
      const page = document.querySelector('.page-inner')
      page.classList.add('index-page-inner')
    }

    addHeader()
    addRecordNumber()

    setTimeout(() => {
      $('.book-body .page-inner').append('<div id="vote-container"></div>')
      sidebarScrollIntoView()
      initVueInstance()
    }, 300)
  })
})
