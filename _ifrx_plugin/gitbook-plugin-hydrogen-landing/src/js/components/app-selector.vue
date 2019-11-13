<template>
  <div class="ifrx-btn-miniapp-container" v-if="selectedMiniapp">
    <div class="miniapp-selecter-input" @click="handleShowCascader">
      [[selectedMiniapp.name]]
      <i class="miniapp-selecter-input-arrow [[showCascader ? 'selecting' : '']]"></i>
    </div>

    <div class="miniapp-selecter-cascader [[showCascader ? 'selecting' : '']]">
      <ul class="cascader-list observer-ul">
        <li
          v-for="item in miniappList"
          :key="item.id"
          :class="item.id === selectedEnterprise.id ? 'selected' : ''"
          @mouseenter="handleHoverEnterprise(item)"
        >
          [[item.enterprise_name]]
          <i></i>
        </li>
        <li class="observer-li"></li>
      </ul>

      <ul class="cascader-list">
        <li
          v-for="item in curEnterprise.miniapps"
          :key="item.id"
          :class="item.id === selectedMiniapp.id ? 'selected' : ''"
          @click="handleSelectMiniapp(item)"
        >[[item.name]]</li>
      </ul>
    </div>
  </div>
</template>

<script>
const eventBus = require('../eventBus')
const enterpriseApi = require('../io/enterprise')
let observer = null
module.exports = {
  name: 'app-selector',
  delimiters: ['[[', ']]'],
  data() {
    return {
      miniappList: [],
      offset: 0,
      hasNextPage: false,
      selectedEnterprise: null,
      selectedMiniapp: null,

      curEnterprise: null,
      requestLocked: false,

      showCascader: false
    }
  },

  created() {
    this.init()
  },

  methods: {
    init() {
      let cacheData = sessionStorage.getItem('cacheData')
      if (cacheData) {
        cacheData = JSON.parse(cacheData)
        this.miniappList = cacheData.miniappList
        this.offset = cacheData.offset
        this.hasNextPage = cacheData.hasNextPage
        this.selectedEnterprise = cacheData.selectedEnterprise
        this.selectedMiniapp = cacheData.selectedMiniapp
        this.curEnterprise = cacheData.selectedEnterprise
        this.addCloseCascaderTrigger()
        setTimeout(this.syncRenderData, 0)
      } else {
        this.requestLocked = true
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
      try {
        enterpriseApi.getEnterpriseList(this.offset).then(
          res => {
            window.isBaaSLogin = true
            eventBus.$emit('baas-login')
            let filterMiniapplist = res.objects.filter(item => {
              return item.miniapps.length > 0
            })
            this.miniappList = [...this.miniappList, ...filterMiniapplist]
            this.hasNextPage = !!res.meta.next
            this.offset = res.meta.next ? this.offset + 20 : this.offset

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

            if (!document.querySelector('.ifrx-btn-login')) this.addLoginStatusBtn(true)
            this.syncStorageData()
            this.requestLocked = false
          },
          err => {
            console.log(err)
            if (!document.querySelector('.ifrx-btn-login')) this.addLoginStatusBtn(false)
            this.requestLocked = false
          }
        )
      } catch (err) {
        console.log(err)
      }
    },

    addLoginStatusBtn(isLogined) {
      const host = 'https://cloud.minapp.com'
      window.gitbook.toolbar.createButton({
        className: 'ifrx-btn ifrx-btn-login',
        text: isLogined ? '进入控制台' : '登录',
        label: 'ifrx-btn-login',
        position: 'right',
        onClick: function() {
          if (isLogined) window.open(host + '/dashboard/')
          else {
            const href = encodeURIComponent(location.href)
            location.href = `${host}/login/?next=${href}`
          }
        }
      })
    },

    syncStorageData() {
      const cacheData = {
        miniappList: this.miniappList,
        offset: this.offset,
        hasNextPage: this.hasNextPage,
        selectedEnterprise: this.selectedEnterprise,
        selectedMiniapp: this.selectedMiniapp
      }
      sessionStorage.setItem('cacheData', JSON.stringify(cacheData))
    },

    syncRenderData() {
      eventBus.$emit('syncData', {
        app_id: this.selectedMiniapp.id,
        app_name: this.selectedMiniapp.name,
        client_id: this.selectedMiniapp.client_id,
        enterprise_id: this.selectedEnterprise.id
      })
    },

    handleShowCascader() {
      this.showCascader = !this.showCascader
      // 企业列表 html 插入交叉观察者用于触底分页请求
      if (!observer) {
        observer = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (entry.isIntersecting && this.hasNextPage && !this.requestLocked) {
                this.requestLocked = true
                this.getMiniappList()
              }
            })
          },
          {
            root: document.querySelector('.observer-ul'),
            rootMargin: '0px 0px 0px 0px'
          }
        )
        observer.observe(document.querySelector('.observer-li'))
      }
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
    }
  }
}
</script>



