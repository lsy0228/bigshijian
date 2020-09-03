$(function () {
    const form = layui.form
    form.verify({
        // pwd: [/^[\s]{6,12}$/, '密码必须6-12位，且不能有空格'],
        // 新旧密码不能一样
        samePwd: function (value) {
            if (value === $([name = oldPwd])) {
                return '新旧密码不能相同'
            }
        },
        rePwd: function (value) {
            if (value === $([name = newPwd])) {
                return '新密码与确认密码不一致'
            }
        }
    })
    $('.layui-form').on('submit', function () {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layui.msg('更新密码失败')
                }
                layui.layui.msg('更新密码成功')
                $('.layui-form')[0].reset()
            }
        })
    })
})