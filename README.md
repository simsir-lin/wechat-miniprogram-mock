# wechat-miniprogram-mock
简单的微信小程序数据模拟库
> 通过代理wx.request实现拦截模拟数据返回

## 注意
* 小程序基础库版本 2.2.1 或以上、及开发者工具 1.02.1808300 或以上开始
* 初次引入需先执行开发者工具的 npm 构建，[微信官方 npm 文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)

## 安装
```bash
npm install --save wechat-miniprogram-mock
```

## 使用
```javascript
const Mock = require('wechat-miniprogram-mock')
const mock = new Mock({
  ignore: [], // 忽略的URL
  delay: 1000 // 设置延迟1000ms, 默认为0
})
mock.add('https://a.com/login', 'post', { userid: 1, username: 'simsir-lin' }, {}, 200)
mock.start() // 开始拦截 wx.request
```

## 预览
打开[微信web开发者工具](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html)，'本地小程序项目 - 添加项目'，项目目录选择为 example 目录就可以了

## OPTION

| property name     | description              | type     | default value |
| :---------------- | :----------------------- | :------  | :------------ |
| ignore            | 忽略的URL                 | Array    | [ ]          |
| delay             | 延迟(ms)                  | Number    | 0          |
