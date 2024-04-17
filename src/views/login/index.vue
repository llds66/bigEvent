<template>
  <div class="login-container">
    <div class="login-box">
      <div class="title-box"></div>
      <el-form :model="loginForm" :rules="loginRules" ref="loginRef">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" maxlength="10" minlength="1"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            maxlength="15"
            minlength="6"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn-login" @click="loginFn">登录</el-button>
          <el-link type="info" @click="$router.push('/reg')">去注册</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { loginAPI } from '@/api'
import { mapMutations } from 'vuex'
export default {
  name: 'my-login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,10}$/, message: '用户名必须是1-10的字母数字', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码必须是6-15的非空字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapMutations(['updateToken']), // 更新 token 的 mutation 函数
    async loginFn () {
      this.$refs.loginRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await loginAPI(this.loginForm) // 返回的对象中提取 data 字段的值
        if (res.status !== 0) return this.$message.error('登录失败')
        this.$message.success('登录成功！')
        this.$router.push('/')
        this.updateToken(res.token)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .login-box {
    width: 400px;
    height: 270px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0 30px;
    box-sizing: border-box;
    .btn-login {
      width: 100%;
    }
  }
}
</style>
