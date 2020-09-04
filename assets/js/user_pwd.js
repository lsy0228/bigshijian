$(function () {
    // const form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6-12位，且不能有空格'],
        // 新旧密码不能一样,并申明新密码
        samePwd: function (value) {

            if (value === $('[name = oldPwd]').val()) {
                return '新旧密码不能相同'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name = newPwd]').val()) {
                return '新密码与确认密码不一致'
            }
        }
    })
    $('.layui-form').on('submit', function (e) {
        e.preventDefault(),

            $.ajax({
                method: 'POST',
                url: '/my/updatepwd',
                data: $(this).serialize(),
                success: function (res) {
                    if (res.status !== 0) {
                        return layui.layer.msg('更新密码失败！')
                    }
                    layui.layer.msg('更新密码成功')
                    $('.layui-form')[0].reset()
                }
            })
    })
})
// $(function () {
//     const form = layui.form

//     form.verify({
//         pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
//         samePwd: function (value) {
//             if (value === $('[name=oldPwd]').val()) {
//                 return '新旧密码不能相同！'
//             }
//         },
//         rePwd: function (value) {
//             if (value !== $('[name=newPwd]').val()) {
//                 return '两次密码不一致！'
//             }
//         }
//     })


//     $('.layui-form').on('submit', function (e) {
//         e.preventDefault()
//         $.ajax({
//             method: 'POST',
//             url: '/my/updatepwd',
//             data: $(this).serialize(),
//             success: function (res) {
//                 if (res.status !== 0) {
//                     return layui.layer.msg('更新密码失败！')
//                 }
//                 layui.layer.msg('更新密码成功！')
//                 // 将jq对象转换为dom对象，调用重置表单的方法
//                 $('.layui-form')[0].reset()
//             }
//         })
//     })
// })
