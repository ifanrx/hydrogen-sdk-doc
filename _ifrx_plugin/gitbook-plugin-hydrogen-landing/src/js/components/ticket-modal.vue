<template>
  <div class="ifrx-modal-wrapper">
    <div class="ifrx-modal-mask" @click="close"></div>
    <div class="ifrx-modal-content">
      <span class="ifrx-modal-close" @click="close">&times;</span>
      <h2 class="ifrx-modal-title">提交工单</h2>
      <div class="ifrx-modal-desc">
        如需提交工单，请发送邮件至
        <a :href="`mailto:${email}`" class="ifrx-modal-mail">[[email]]</a
        >，我们将尽快为您处理，谢谢！
      </div>
      <button class="ifrx-modal-copy-btn" @click="onCopy">[[copyText]]</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TicketModal',
  delimiters: ['[[', ']]'],
  data() {
    return {
      email: 'mincloud@ifanr.com',
      copyText: '复制邮箱',
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },

    onCopy() {
      navigator.clipboard.writeText(this.email)
      this.copyText = '已复制'
      setTimeout(() => {
        this.copyText = '复制邮箱'
      }, 1500)
    },
  },
}
</script>

<style scoped>
.ifrx-modal-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
}

.ifrx-modal-mask {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.25);
}

.ifrx-modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 420px;
  padding: 40px 48px 32px 48px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
  transform: translate(-50%, -50%);
}

.ifrx-modal-title {
  margin-bottom: 24px;
  font-size: 26px;
  font-weight: bold;
  color: #333;
}

.ifrx-modal-desc {
  margin-bottom: 32px;
  font-size: 18px;
  color: #333;
}

.ifrx-modal-mail {
  color: #008cff;
}

.ifrx-modal-mail:hover {
  color: #008cff;
}

.ifrx-modal-copy-btn {
  display: block;
  width: 136px;
  padding: 10px 0;
  margin-left: auto;
  font-size: 18px;
  color: #fff;
  text-align: center;
  cursor: pointer;
  background: #008cff;
  border: none;
  border-radius: 24px;
  box-shadow: 0 2px 8px rgba(33, 150, 243, 0.08);
  transition: background 0.2s;
}

.ifrx-modal-close {
  position: absolute;
  top: 24px;
  right: 24px;
  font-size: 28px;
  font-weight: bold;
  color: #b0bec5;
  cursor: pointer;
  transition: color 0.2s;
}

.ifrx-modal-close:hover {
  color: #008cff;
}
</style>
