$(function () {
    // 获取用户信息
    getUserInfo()

    var layer = layui.layer
    // 点击按钮，实现退出功能
    $('#btnLogout').on('click', function () {
        // 提示用户是否退出
        layer.confirm('确认退出登录', { icon: 3, title: '提示' }, function (index) {
            // 清空本地存储的token
            localStorage.removeItem('token')
            //重新跳到登录页面
            location.href = '../../login.html'
            // 关闭confirm询问框
            layer.close(index);
        })
    })
    function getUserInfo() {
        $.ajax({
            methid: 'GET',
            url: '/my/userinfo',
            // 如获取失败清除token，在登录，或是看单词是否错误❌
            // headers: {
            //     Authorization: localStorage.getItem('token') || ''
            // },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                // 调用renderAvata 渲染用户的头像
                renderAvatar(res.data)
            }
        })
    }
    // 渲染用户头像
    function renderAvatar(user) {
        // 获取用户名称,先获取用户自定义名，如没有在获取
        var name = user.nickname || user.username
        // 设置欢迎文本
        $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        // 按需渲染用户的头像
        if (user.user_pic = null) {
            // 渲染图片头像
            $('.layui-nav-img').attr('src', user.user_pic).show()
            $('.text-avatar').hide()
        } else {
            // 渲染文本头像
            $('.layui-nav-img').hide()
            var first = name[0].toUpperCase()
            $('.text-avatar').html(first).show
        }
    }
})