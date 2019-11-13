<template>
  <div id="vote">
    <p class="title">文档对你是否有帮助？</p>
    <p class="vote-info">
      <span @click="vote('up')"><img :src="upvoteIcon" /> [[upvote]]</span>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <span @click="vote('down')"><img :src="downvoteIcon" /> [[downvote]]</span></p>
    <p class="help">如果开发遇到问题，你可以<a :href="suportUrl" target="_blank">提交工单</a>寻求帮助。</p>
  </div>
</template>

<script>
const voteApi = require('../io/vote')
const upvoteIcon = require('../../images/up-vote.svg')
const downvoteIcon = require('../../images/down-vote.svg')

module.exports = {
  name: 'vote',
  delimiters: ['[[', ']]'],
  props: ['pageId'],
  data() {
    return {
      upvote: 0,
      downvote: 0,
      upvoteIcon,
      downvoteIcon,
      supportUrl: 'http://support.minapp.com/hc/',
    }
  },

  created() {
    this.init();
  },

  methods: {
    init() {
      this.getVoteData()
    },

    getVoteData() {
      voteApi.getVote(this.pageId)
        .then(data => {
          this.upvote = data.upvote
          this.downvote = data.downvote
        })
    },

    vote(type) {
      voteApi.vote(this.pageId, type)
        .always(res => {
          if (res.status == 201) {
            return this.getVoteData()
          }
        })
    },
  }
}
</script>

<style scoped>
#vote {
  border: solid 1px lightgrey;
  margin-top: 40px;
  padding: 20px;
  font-size: 14px;
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
  margin: 20px 0;
}
</style>
