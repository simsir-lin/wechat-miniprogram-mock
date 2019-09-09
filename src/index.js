/*
 * Author: simsir-lin
 * Github: https://github.com/simsir-lin
 * Email: 15986907592@163.com
 */
function Mock(option = {}) {
  let defaultOption = {
    ignore: [],
    delay: 0
  }
  this.options = Object.assign(defaultOption, option)
  this.mockData = {}
}

Mock.prototype = {
  constructor: Mock,
  add: function(url, method, responeData = {}, responeHeader = {}, statusCode = 200) {
    let key = method.toUpperCase() + ' ' + url // => 'GET http://a.com/login'
    this.mockData[key] = {
      data: responeData,
      header: responeHeader,
      errMsg: "request:ok",
      statusCode: statusCode
    }
  },
  start: function() {
    var self = this

    wx = new Proxy(wx, {
      get(target, key, proxy) {
        if (key == 'request') {
          return function(ob) {
            let path = _getPath(ob.url)

            if (self.options.ignore.indexOf(path) >= 0) {
              // 忽略的接口
              let origin = Reflect.get(target, key, proxy)
              origin.call(this, ob)
              return
            }
            let method = ob.method || 'get'
            let key = method.toUpperCase() + ' ' + path
            if (self.mockData[key]) {
              if (self.options.delay <= 0) {
                ob.success(self.mockData[key])
              } else {
                setTimeout(function() {
                  ob.success(self.mockData[key])
                }, self.options.delay)
              }
            } else {
              ob.fail({
                data: {},
                header: {},
                errMsg: `${ob.url} notfound`,
                statusCode: 404
              })
            }
          }
        } else {
          return Reflect.get(target, key, proxy)
        }
      }
    })
  }
}

module.exports = Mock

function _getPath(url) {
  let path = url
  let split = url.split('?')
  if (split.length >= 2) { // 有url参数的情况
    path = split[0]
  }
  return path
}

function getType(t) {
  return Object.prototype.toString.call(t).slice(8, -1).toLowerCase()
}
