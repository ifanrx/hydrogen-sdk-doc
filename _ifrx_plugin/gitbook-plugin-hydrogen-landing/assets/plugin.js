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

function initVueInstance(Vue, $) {
  Vue.config.delimiters = ['[[', ']]'] // 替换 {{}}，花括号与 markdown 有冲突
  Vue.filter('addSlashPostfixIfNotEmpty', function (value) {
    return /^\{\{[\w_]+\}\}$/.test(value) ? '' : value + '/'
  })

  const EventBus = new Vue()

  new Vue({
    el: '.book-header',

    data() {
      return {
        miniappList: [],
        offset: 0,
        hasNextPage: false,
        selectedEnterprise: null,
        selectedMiniapp: null,

        curEnterprise: null,
        requestLocked: false,

        showCascader: false,
      }
    },

    created() {
      this.init()
    },

    methods: {
      init() {
        let cacheData = sessionStorage.getItem('cacheData')
        if (!!cacheData) {
          cacheData = JSON.parse(cacheData)
          this.miniappList = cacheData.miniappList,
          this.offset = cacheData.offset
          this.hasNextPage = cacheData.hasNextPage
          this.selectedEnterprise = cacheData.selectedEnterprise
          this.selectedMiniapp = cacheData.selectedMiniapp
          this.curEnterprise = cacheData.selectedEnterprise
          this.addCloseCascaderTrigger()
          setTimeout(this.syncRenderData, 0)
        } else {
          this.getMiniappList()
        }
      },

      addCloseCascaderTrigger() {
        const bodyEle = document.querySelector('body')
        const miniappEle = document.querySelector('.ifrx-btn-miniapp')
        bodyEle.addEventListener('click', e => {
          if (!miniappEle.contains(e.target)) this.showCascader = false
        })
      },

      getMiniappList() {
        $.ajax({
          url: `https://cloud.minapp.com/dserve/v1/enterprise/?limit=20&offset=${this.offset}&for_nav=true`,
          xhrFields: {
            withCredentials: true,
          },
          success: res => {
            let filterMiniapplist = res.objects.filter(item => {
              return item.miniapps.length > 0
            })
            this.miniappList = [...this.miniappList, ...filterMiniapplist]
            this.hasNextPage = !!res.meta.next
            this.offset = !!res.meta.next ? this.offset + 20 : this.offset

            if (filterMiniapplist.length === 0 && !!res.meta.next) this.getMiniappList()

            if (this.miniappList.length > 0) {
              if (!this.selectedEnterprise) {
                this.selectedEnterprise = this.miniappList[0]
                this.curEnterprise = this.miniappList[0]
              }
              if (!this.selectedMiniapp) {
                this.selectedMiniapp = this.miniappList[0].miniapps[0]
                this.addCloseCascaderTrigger()
                this.syncRenderData()
              }
            }
            if (!document.querySelector('.ifrx-btn-login')) addLoginStatusBtn(!!this.selectedMiniapp)
            this.syncStorageData()
            this.requestLocked = false
          },
          error: err => {
            console.log(err)
            this.requestLocked = false
          },
        })
      },

      syncStorageData() {
        const cacheData = {
          miniappList: this.miniappList,
          offset: this.offset,
          hasNextPage: this.hasNextPage,
          selectedEnterprise: this.selectedEnterprise,
          selectedMiniapp: this.selectedMiniapp,
        }
        sessionStorage.setItem('cacheData', JSON.stringify(cacheData))
      },

      syncRenderData() {
        EventBus.$emit("syncData", {
          app_id: this.selectedMiniapp.id,
          app_name: this.selectedMiniapp.name,
          client_id: this.selectedMiniapp.client_id,
          enterprise_id: this.selectedEnterprise.id,
        })
      },

      handleShowCascader() {
        this.showCascader = !this.showCascader
      },

      handleHoverEnterprise(enterprise) {
        this.curEnterprise = enterprise
      },

      handleSelectMiniapp(miniapp) {
        this.showCascader = false
        this.selectedEnterprise = this.curEnterprise
        this.selectedMiniapp = miniapp
        this.syncRenderData()
        this.syncStorageData()
      },
    },
  })

  new Vue({
    el: '.page-wrapper',
    data: () => {
      return {
        app_id: '{{app_id}}',
        app_name: '{{app_name}}',
        client_id: '{{client_id}}',
        enterprise_id: '{{enterprise_id}}',
      }
    },
    created() {
      EventBus.$on('syncData', data => {
        this.app_id = data.app_id
        this.app_name = data.app_name
        this.client_id = data.client_id
        this.enterprise_id = data.enterprise_id
      })
    },
  })
}

function addMiniappCascader() {
  let el = document.querySelector('.ifrx-btn-miniapp')
  el.innerHTML = `<div class="ifrx-btn-miniapp-container" v-if="selectedMiniapp">
<div class="miniapp-selecter-input" @click="handleShowCascader">
[[selectedMiniapp.name]]
<i class="miniapp-selecter-input-arrow [[showCascader ? 'selecting' : '']]"></i>
</div>

<div class="miniapp-selecter-cascader [[showCascader ? 'selecting' : '']]">

<ul class="cascader-list">
<li v-for="item in miniappList" key="[[item.id]]"
class="[[item.id === selectedEnterprise.id ? 'selected' : '']]"
@mouseenter="handleHoverEnterprise(item)">
[[item.enterprise_name]]<i></i>
</li>
</ul>

<ul class="cascader-list">
<li v-for="item in curEnterprise.miniapps" key="[[item.id]]"
class="[[item.id === selectedMiniapp.id ? 'selected' : '']]"
@click="handleSelectMiniapp(item)">
[[item.name]]
</li>
</ul>

</div>
</div>`
}

function addLoginStatusBtn(isLogined) {
  const host = 'https://cloud.minapp.com'
  gitbook.toolbar.createButton({
    className: 'ifrx-btn ifrx-btn-login',
    text: isLogined ? '进入控制台' : '登录',
    label: 'ifrx-btn-login',
    position: 'right',
    onClick: function () {
      if (isLogined) window.open(host + '/dashboard/')
      else {
        const href = encodeURIComponent(location.href)
        location.href = `${host}/login/?next=${href}`
      }
    }
  })
}

require(["gitbook", "jQuery"], function (gitbook, $) {

  gitbook.events.bind('start', function (e, config) {
    sessionStorage.clear()  // 刷新页面时清空 sessionStorage

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
        }
      })

      gitbook.toolbar.createButton({
        className: 'ifrx-btn-miniapp',
        label: 'ifrx-btn-miniapp',
        position: 'left',
      })

      addCustomerBtn()
      addHeader()
    }, 300)
  })

  gitbook.events.bind('page.change', function () {
    setTimeout(() => {
      addMiniappCascader()
      sidebarScrollIntoView()
      initVueInstance(Vue, $)
    }, 300)
  })
})
