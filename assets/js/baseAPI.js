// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
  console.log(options);
  // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
  options.url = 'http://ajax.frontend.itheima.net' + options.url
  if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
  }
  // 设置访问权限
  options.complete = function (res) {
    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份验证失败') {
      // 清空本地存储的token
      localStorage.removeItem('token')
      //重新跳到登录页面
      location.href = '../../login.html'
    }
  }
})
