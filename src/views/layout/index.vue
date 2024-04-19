<template>
<div class="container">
  <h1>主页</h1>
  <div class="user-box">
        <img :src="user_pic" alt="" v-if="user_pic" />
        <img src="../../assets/images/logo.png" alt="" v-else />
        <span>用户别名： {{ nickname }}</span>
        <span>用户名： {{ username }}</span>
        <span>邮箱： {{ email }}</span>

    </div>
  <el-button @click="logoutFn">退出</el-button>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'my-layout',
  methods: {
    // 退出按钮清除token,回到登录页
    logoutFn () {
      this.$confirm('您确认退出登录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 1. 清空 token
          this.$store.commit('updateToken', '')
          // 2. 跳转到登录页面
          this.$router.push('/login')
        })
        .catch((err) => err)
    }
  },
  computed: {
    ...mapGetters(['nickname', 'username', 'user_pic', 'email'])
  }
}
</script>

<style scoped lang="less">
.container{
  margin-top:100px;
  text-align: center;
}
</style>
