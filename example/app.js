const Mock = require('wechat-miniprogram-mock')
const mock = new Mock({
  ignore: [],
  delay: 1000 // 延迟1000ms
})
mock.add('https://a.com/login', 'post', { userid: 1, username: 'simsir-lin' }, {}, 200)
mock.start()

App({
  onLaunch: function () {

  },
})
