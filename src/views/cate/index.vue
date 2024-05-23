<template>
  <div class="container">
    <h2>文章分类</h2>
    <el-card class="box-card">

      <div slot="header" class="clearfix header-box">
        <span>文章分类</span>
        <el-button type="primary" size="mini" @click="addCateBtnFn">添加分类</el-button>
      </div>

      <el-table style="width: 100%" :data="cateList" border stripe>
        <el-table-column label="序号" width="100" type="index"></el-table-column>
        <el-table-column label="分类名称" prop="name"></el-table-column>
        <el-table-column label="分类别名" prop="alias"></el-table-column>
        <el-table-column label="操作">
          <!-- 定义了一个名为 default 的默认插槽。v-slot="scope" 表示它将接收一个名为 scope 的变量，这个变量包含了来自 <el-table-column> 的所有插槽作用域数据
             scope 通常包含了一些特定的属性，比如 row（当前行的数据对象）、column（当前列的数据对象）、$index（当前行的索引）等，这些都可以在插槽内部被访问和使用-->
          <template v-slot="scope">
            <el-button type="primary" size="mini" @click="updateFn(scope.row)">修改</el-button>
            <el-button type="danger" size="mini" @click="removeFn(scope.row.Id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </el-card>

    <!-- .sync作用实现双向数据绑定
    v-bind:visible="addVisible"，这会将 addVisible 属性的值绑定到子组件的 visible 属性上。
          会在运行时给所在标签绑定 @update:属性名的事件, 把接收到子组件内传来的值赋予给右侧Vue变量
          组件内$emit('update:visible', true)
          这个update: 是固定的 -->
    <el-dialog
      :title="isEdit ? '编辑文章分类' : '添加文章分类'"
      :visible.sync="addVisible"
      @closed="onAddClosedFn"
      width="35%"
    >
      <span>这是一段信息</span>
      <!-- 添加的表单 -->
      <el-form :model="addForm" :rules="addRules" ref="addRef" label-width="80px">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="addForm.name" minlength="1" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="alias">
          <el-input v-model="addForm.alias" minlength="1" maxlength="15"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="addVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="addFn">{{ isEdit ? '修 改' : '添 加' }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getArtCateListAPI,
  addArticleAPI,
  updateArticleAPI,
  delArticleAPI
} from '@/api'

export default {
  name: 'my-cate',
  data () {
    return {
      // 对话框是否显示
      addVisible: false,

      // 修改的分类id
      editId: '',

      // 是否是编辑状态
      isEdit: false,

      // 表格数据
      cateList: [],

      // 添加修改表单的数据对象
      addForm: {
        name: '',
        alias: ''
      },

      // 添加表单的验证规则对象
      addRules: {
        name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          {
            pattern: /^\S{1,10}$/,
            message: '分类名必须是1-10位的非空字符',
            trigger: 'blur'
          }
        ],
        alias: [
          { required: true, message: '请输入分类别名', trigger: 'blur' },
          {
            pattern: /^[a-zA-Z0-9]{1,15}$/,
            message: '分类别名必须是1-15位的字母数字',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  mounted () {
    this.initCateListFn()
  },

  methods: {
    /**
     * 获取-文章分类列表
     */
    async initCateListFn () {
      const res = await getArtCateListAPI()
      // console.log(res.data.data)
      this.cateList = res.data.data
    },

    /**
     * 点击事件-添加分类
     */
    addCateBtnFn () {
      this.addVisible = true // 让对话框出现
      this.editId = '' // 编辑的文章分类id设置无
      this.isEdit = false // 编辑的状态关闭
    },

    /**
     * 点击事件-确认添加或者修改
     */
    async addFn () {
      this.$refs.addRef.validate(async valid => {
        if (valid) {
          if (this.isEdit) {
            // 修改
            const { data: res } = await updateArticleAPI({
              Id: this.editId,
              ...this.addForm
            })
            console.log(res)
            if (res.status !== 0) return this.$message.error('更新分类失败！')
            this.$message.success('更新分类成功！')
          } else {
            // 添加
            const { data: res } = await addArticleAPI(this.addForm)
            // console.log(res)
            if (res.status !== 0) return this.$message.error('添加分类失败！')
            this.$message.success('添加分类成功！')
          }
          this.initCateListFn() // 重新获取文章分类列表
          this.addVisible = false // 关闭对话框
        } else {
          return false
        }
      })
    },

    /**
     * 点击事件-关闭重置表单
     */
    onAddClosedFn () {
      this.$refs.addRef.resetFields()
    },

    /**
     * 修改-文章分类
     * @param obj
     */
    updateFn (obj) {
      console.log(obj)
      this.editId = obj.Id // 保存要编辑的文章分类ID
      this.isEdit = true // 设置编辑状态
      this.addVisible = true // 让对话框显示
      // 设置数据回显
      this.$nextTick(() => {
        // 先让对话框出现, 它绑定空值的对象, 才能resetFields清空用初始空值
        this.addForm.name = obj.name
        this.addForm.alias = obj.alias
      })
    },

    /**
     * 删除-文章分类
     * @param Id
     */
    async removeFn (Id) {
      const { data: res } = await delArticleAPI(Id)
      console.log(Id)
      if (res.status !== 0) return this.$message.error('删除分类失败！')
      this.$message.success('删除分类成功！')
      // 重新请求列表数据
      this.initCateListFn()
    }
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
