<template>
  <div class="container">
    <h2>文章分类</h2>
    <el-card class="box-card">
      <div slot="header" class="clearfix header-box">
        <span>文章分类</span>
        <el-button type="primary" size="mini" @click="addVisible = true"
          >添加分类</el-button
        >
      </div>

      <el-table style="width: 100%" :data="cateList" border stripe>
        <el-table-column
          label="序号"
          width="100"
          type="index"
        ></el-table-column>
        <el-table-column label="分类名称" prop="name"></el-table-column>
        <el-table-column label="分类别名" prop="alias"></el-table-column>
        <el-table-column label="操作">
          <el-button type="primary" size="mini">修改</el-button>
          <el-button type="danger" size="mini">删除</el-button>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 对话框 -->
    <!-- .sync作用实现双向数据绑定
会在运行时给所在标签绑定 @update:属性名的事件, 把接收到子组件内传来的值赋予给右侧Vue变量
组件内$emit('update:visible', true)
这个update: 是固定的
-->
    <el-dialog title="添加文章分类" :visible.sync="addVisible" @closed="onAddClosedFn" width="35%">
      <span>这是一段信息</span>
      <!-- 添加的表单 -->
      <el-form
        :model="addForm"
        :rules="addRules"
        ref="addRef"
        label-width="80px"
      >
        <el-form-item label="分类名称" prop="name">
          <el-input
            v-model="addForm.name"
            minlength="1"
            maxlength="10"
          ></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="alias">
          <el-input
            v-model="addForm.alias"
            minlength="1"
            maxlength="15"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="addVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="addFn">添 加</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getArtCateListAPI, addArticleAPI } from '@/api'

export default {
  name: 'my-cate',
  data () {
    return {
      cateList: [],
      addVisible: false, // 对话框是否显示
      addForm: { // 添加表单的数据对象
        name: '',
        alias: ''
      },
      addRules: { // 添加表单的验证规则对象
        name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { pattern: /^\S{1,10}$/, message: '分类名必须是1-10位的非空字符', trigger: 'blur' }
        ],
        alias: [
          { required: true, message: '请输入分类别名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,15}$/, message: '分类别名必须是1-15位的字母数字', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async initCateListFn () {
      const res = await getArtCateListAPI()
      // console.log(res.data.data)
      this.cateList = res.data.data
    },
    addFn () {
      // console.log('添加分类')
      this.$refs.addRef.validate(async valid => {
        if (valid) {
          const { data: res } = await addArticleAPI(this.addForm)
          console.log(res)
          if (res.status !== 0) return this.$message.error('添加分类失败！')
          this.$message.success('添加分类成功！')
          this.addVisible = false
        } else {
          return false
        }
      })
    },
    onAddClosedFn () {
      this.$refs.addRef.resetFields() // 关闭重置
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
