<template>
<div class="container">
  <h2>文章分类</h2>
  <el-card class="box-card">
      <div slot="header" class="clearfix header-box">
        <span>文章分类</span>
        <el-button type="primary" size="mini">添加分类</el-button>
      </div>

      <el-table style="width: 100%" :data="cateList" border stripe>
        <el-table-column label="序号" width="100"  type="index"></el-table-column>
        <el-table-column label="分类名称" prop="name"></el-table-column>
        <el-table-column label="分类别名" prop="alias"></el-table-column>
        <el-table-column label="操作">
          <el-button type="primary" size="mini">修改</el-button>
          <el-button type="danger" size="mini">删除</el-button>
        </el-table-column>
      </el-table>
    </el-card>
</div>
</template>

<script>
import { getArtCateListAPI } from '@/api'
export default {
  name: 'my-cate',
  data () {
    return {
      cateList: []
    }
  },
  methods: {
    async initCateListFn () {
      const res = await getArtCateListAPI()
      // console.log(res.data.data)
      this.cateList = res.data.data
    }
  },
  mounted () {
    this.initCateListFn()
  }
}
</script>

<style lang="less" scoped>
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
