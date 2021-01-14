<template>
  <div style="text-align: center">
    <h1>成绩信息上传</h1>
    <el-row class="studentTable" type="flex">
      <el-col :span="24">
        <div style="margin-top: 20px;display: flex;margin-left: 10px;">

          <el-button type="warning" size="small" @click="insertStudentInfoVisible = true">录入信息</el-button>

        </div>
        <div style="margin-top: 15px;">
          <el-table :data="students"
                    stripe
                    v-loading="loadingFlag"
                    ref="multipleTable"
                    @selection-change="handleSelectionChange"
                    style="width: fit-content;box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2)">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                fixed
                prop="id"
                label="学工号"
                sortable
                width="150">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                sortable
                width="150">
            </el-table-column>
            <el-table-column
                prop="sex"
                label="性别"
                width="100">
            </el-table-column>
            <el-table-column
                prop="email"
                label="邮箱"
                width="200">
            </el-table-column>
            <el-table-column
                prop="class"
                label="班级"
                sortable
                width="150">
            </el-table-column>
            <el-table-column
                prop="major"
                label="专业"
                width="200">
            </el-table-column>
            <el-table-column
                prop="academy"
                label="学院"
                width="200">
            </el-table-column>
            <el-table-column
                prop="createTime"
                label="入学时间"
                sortable
                width="200">
            </el-table-column>

          </el-table>
        </div>
        <div style="display: flex;margin-top: 20px">
          <el-button @click="toggleSelection(students)" size="small">全选</el-button>
          <el-button @click="toggleSelection()" size="small">取消选择</el-button>
        </div>
      </el-col>
    </el-row>


    <el-dialog
        title="学生成绩查询或导出"
        :visible.sync="selectConditionFormVisible"
        width="30%"
        :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="form.name" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="form.number" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="科目">
          <el-input v-model="form.subject" style="width:300px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="selectConditionFormVisible = false" >取 消</el-button>
        <el-button type="primary" @click="grade = true">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
        title="学生成绩录入"
        :visible.sync="insertStudentInfoVisible"
        width="30%"
        :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="科目">
          <el-input v-model="form.subject" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="成绩">
          <el-input v-model.number="form.grade" style="width:300px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="insertStudentInfoVisible = false" >取 消</el-button>
        <el-button type="primary" @click="grade =true">确 定</el-button>
      </span>
    </el-dialog>
s



  </div>
</template>

<script>
export default{
  data() {
    return {

      selectConditionFormVisible: false,
      insertStudentInfoVisible:false,
      grade:true,

      form: {
        name: '',
        number:'',
        subject:'',
        grade: ''
      },
      form1: {
        name: '',
        number:'',
        subject:'',
      },


      students: [{
        id: '17408070118',
        name: '王小虎',
        sex: '男',
        email:'810414696@qq.com',
        class: '计科1701',
        major:'计算机科学与技术',
        academy: '计算机科学与技术',
        createTime:'2017.9.1',
      },
        {
          id: '17408070119',
          name: '杨大强',
          sex: '男',
          email:'810414696@qq.com',
          class: '计科1701',
          major:'计算机科学与技术',
          academy: '计算机科学与技术',
          createTime:'2017.9.1',
        },
        {
          id: '17408070120',
          name: '杨强',
          sex: '男',
          email:'810414696@qq.com',
          class: '计科1701',
          major:'计算机科学与技术',
          academy: '计算机科学与技术',
          createTime:'2017.9.1',
        },
        {
          id: '17408070220',
          name: '李琦',
          sex: '男',
          email:'810414696@qq.com',
          class: '计科1701',
          major:'计算机科学与技术',
          academy: '计算机科学与技术',
          createTime:'2017.9.1',
        }
      ],

      multipleSelection: []
    }
  },
  methods: {

    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);

        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
            location.reload();

          })
          .catch(_ => {});

    },




  }

}

</script>

<style scoped>

</style>