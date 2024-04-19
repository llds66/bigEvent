<template>
  <div class="container">
    <h2>修改密码</h2>
    <el-form
      :model="pwdForm"
      :rules="pwdFormRules"
      ref="pwdFormRef"
      label-width="100px"
    >
      <el-form-item label="原密码" prop="oldPwd">
        <el-input v-model="pwdForm.oldPwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd">
        <el-input v-model="pwdForm.newPwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="re_pwd">
        <el-input v-model="pwdForm.re_pwd" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updatePwdFn">修改密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { updatePwdAPI } from '@/api'
export default {
  name: 'my-password',
  data () {
    // 检测新旧密码是否相同
    const samePwd = (rule, value, callback) => {
      if (value === this.pwdForm.oldPwd) {
        return callback(new Error('新密码不能和原密码相同'))
      }
      callback()
    }
    // 检测两次新密码是否一致
    const rePwd = (rule, value, callback) => {
      if (value !== this.pwdForm.newPwd) {
        return callback(new Error('两次输入的密码不一致'))
      }
      callback()
    }
    return {
      // 表单的数据对象
      pwdForm: {
        oldPwd: '',
        newPwd: '',
        re_pwd: ''
      },
      // 表单的验证规则对象
      pwdFormRules: {
        oldPwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码长度必须是6-15位的非空字符串', trigger: 'blur' }
        ],
        newPwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码长度必须是6-15位的非空字符串', trigger: 'blur' },
          { validator: samePwd, trigger: 'blur' }
        ],
        re_pwd: [
          { required: true, message: '请再次确认新密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码长度必须是6-15位的非空字符串', trigger: 'blur' },
          { validator: rePwd, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    updatePwdFn () {
      this.$refs.pwdFormRef.validate(async valid => {
        if (!valid) return false // 未通过校验拦住

        const { data: res } = await updatePwdAPI(this.pwdForm)
        console.log(res)
        if (res.status !== 0) return this.$message.error('更新密码失败！')

        this.$message.success('更新密码成功！')
        this.$refs.pwdFormRef.resetFields()
      })
    }
  }
}
</script>

<style scoped>
.el-form {
  width: 500px;
}
</style>
