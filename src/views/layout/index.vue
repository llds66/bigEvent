<template>
<div class="container">
  <h1>主页</h1>
  <el-button @click="logoutFn">退出</el-button>
</div>
</template>

<script>
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
  }
}
</script>

<style scoped lang="less">
.container{
  margin-top:100px;
  text-align: center;
}
</style>
