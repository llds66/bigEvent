<template>
  <div class="reg-container">
    <div class="reg-box">
      <div class="title-box"></div>
      <el-form :model="regForm" :rules="regRules" ref="regRef">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="regForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="regForm.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
         <!-- 注册按钮 -->
         <el-form-item>
          <el-button type="primary" class="btn-reg" @click="regNewUserFn">注册</el-button>
          <el-link type="info" class="btn-reg" @click="$router.push('/login')">去登录</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { registerAPI } from '@/api'
export default {
  name: 'my-register',
  data () {
    return {
      // 注册数据
      regForm: {
        username: '',
        password: ''
      },
      // 校验规则
      regRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            pattern: /^[a-zA-Z0-9]{1,10}$/,
            message: '用户名必须是1-10的大小写字母数字',
            trigger: 'blur'
          }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            pattern: /^\S{6,15}$/,
            message: '密码必须是6-15的非空字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 注册按钮事件
    regNewUserFn () {
      this.$refs.regRef.validate(async valid => {
        if (!valid) return false // 客户端的验证
        // 获取用户输入的内容
        console.log(this.regForm)
        // 调用注册接口
        const { data: res } = await registerAPI(this.regForm)
        console.log(res) // 响应的内容

        if (res.status !== 0) return this.$message.error(res.message)
        this.$message.success(res.message)
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.reg-container {
  .reg-box {
    width: 400px;
    height: 335px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0 30px;
    box-sizing: border-box;

    .btn-reg {
      width: 100%;
    }
  }
}
</style>
