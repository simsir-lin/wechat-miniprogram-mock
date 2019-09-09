Page({
  data: {
  },
  onLoad: function (options) {
  },
  send() {
    wx.showLoading({
      title: '请求中',
    })
    wx.request({
      url: 'https://a.com/login',
      method: 'post',
      success: (res) => {
        wx.hideLoading()
        wx.showModal({
          title: '结果',
          content: `用户名：${res.data.username}`,
        })        
      }
    })
  }
})
