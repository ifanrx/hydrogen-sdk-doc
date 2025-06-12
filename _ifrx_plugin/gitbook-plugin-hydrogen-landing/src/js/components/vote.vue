<template>
  <div id="vote">
    <div class="title">文档对你是否有帮助？</div>
    <div class="vote-info">
      <div class="vote up-vote" @click="vote('up')">
        <i
          class="iconfont"
          :class="{ 'icon-up-vote': !hasAddUpvote, 'icon-up-vote-active': hasAddUpvote }"
        ></i>
        <div class="vote-count">[[upvote]]</div>
      </div>
      <div class="vote down-vote" @click="vote('down')">
        <i
          class="iconfont"
          :class="{ 'icon-down-vote': !hasAddDownvote, 'icon-down-vote-active': hasAddDownvote }"
        ></i>
        <div class="vote-count">[[downvote]]</div>
      </div>
    </div>
    <div class="help">
      如果开发遇到问题，你可以<span class="help-link" @click="ticketModalVisible = true"
        >提交工单</span
      >寻求帮助。
    </div>
    <ticket-modal v-if="ticketModalVisible" @close="ticketModalVisible = false"></ticket-modal>
  </div>
</template>

<script>
const eventBus = require('../eventBus')
const voteApi = require('../io/vote')
const upvoteIcon = require('../../images/up-vote.svg')
const downvoteIcon = require('../../images/down-vote.svg')
const constants = require('../constants')
const utils = require('../utils')
const TicketModal = require('./ticket-modal.vue')

module.exports = {
  components: { 'ticket-modal': TicketModal },
  name: 'vote',
  delimiters: ['[[', ']]'],
  props: ['pageId'],
  data() {
    return {
      isBaasLogined: window.isBaasLogined,
      upvote: 0,
      downvote: 0,
      hasAddUpvote: false,
      hasAddDownvote: false,
      upvoteIcon,
      downvoteIcon,
      ticketModalVisible: false,
    }
  },

  created() {
    this.init()
    eventBus.$on(constants.BAAS_LOGINED, () => {
      this.isBaasLogined = true
    })
  },

  methods: {
    init() {
      this.getVoteData()
    },

    getVoteData() {
      voteApi.getVote(this.pageId).then(data => {
        this.upvote = data.upvote
        this.downvote = data.downvote
        this.hasAddUpvote = data.voted === 1
        this.hasAddDownvote = data.voted === 0
      })
    },

    vote(type) {
      if (!this.isBaasLogined) {
        location.href = utils.getLoginUrl()
        return
      }
      if ((this.hasAddUpvote && type === 'up') || (this.hasAddDownvote && type === 'down')) {
        voteApi.deleteVoteRecord(this.pageId).always(res => {
          console.log('res', res)
          if (!res) {
            return this.getVoteData()
          }
          if (res.status == 401) {
            location.href = utils.getLoginUrl()
            return
          }
        })
        return
      }
      voteApi.addVoteRecord(this.pageId, type).always(res => {
        if (res.status == 201) {
          return this.getVoteData()
        }
        if (res.status == 401) {
          location.href = utils.getLoginUrl()
          return
        }
      })
    },
  },
}
</script>

<style scoped>
#vote {
  padding: 20px;
  margin-top: 40px;
  font-size: 14px;
  color: #333;
  border: solid 1px lightgrey;
  border-radius: 5px;
}

#vote img {
  width: 25px;
  height: 25px;
}

#vote .title {
  font-size: 18px;
  font-weight: bold;
}

#vote .vote-info {
  display: flex;
  margin: 20px 0;
}

#vote .vote-info .vote {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

#vote .vote-info .down-vote {
  margin-left: 30px;
}

#vote .vote-count {
  margin-left: 5px;
}

#vote .iconfont {
  font-size: 25px;
}

#vote .iconfont.icon-up-vote-active,
#vote .iconfont.icon-down-vote-active {
  color: #128bf8;
}

#vote .help-link {
  color: #008cff;
  cursor: pointer;
}

#vote .help-link:hover {
  text-decoration: underline;
}
</style>
