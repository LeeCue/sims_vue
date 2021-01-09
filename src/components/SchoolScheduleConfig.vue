<template>
    <div style="margin-top: 20px">
        <el-page-header @back="goBack" content="教学计划设定">
        </el-page-header>
        <el-form ref="scheduleConfigForm" :model="scheduleConfigForm" label-width="80px"
                 style="margin-top: 30px; margin-left: 40px">
            <el-form-item label="课程名称" label-width="100px">
                <label v-text="currCourseName" style="font-size: 15px"></label>
            </el-form-item>
            <el-form-item label="教师设定" label-width="100px">
                <el-cascader
                        v-model="selectTeacher"
                        :options="academyTeacherInfo"
                        :props="teacherProps"
                        clearable
                        style="width: 400px"
                        @change="handleTeacherChange"></el-cascader>
            </el-form-item>
            <el-form-item label="班级设定" label-width="100px">
                <el-cascader
                        v-model="selectClasses"
                        :options="allSchoolInfo"
                        :props="schoolInfoProps"
                        clearable
                        style="width: 400px"
                        @change="handleClassChange"></el-cascader>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" @click="onSubmit">立即设定</el-button>
                <el-button size="small" @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "SchoolScheduleConfig",
        data() {
              return {
                  currCourseName: '',
                  selectTeacher: [],
                  selectClasses: [],
                  schoolInfoProps: {
                      value: 'id',
                      label: 'name',
                      children: 'children',
                      multiple: true,
                  },
                  teacherProps: {
                      value: 'id',
                      label: 'name',
                      children: 'teachers',
                  },
                  allSchoolInfo: [],
                  allCourses: [],
                  academyTeacherInfo: [],
                  scheduleConfigForm: {
                      courseId: '',
                      teacherId: '',
                      selectItems: []
                  }
              }
        },
        mounted() {
            this.currCourseName = this.$store.state.currentCourseName;
            this.scheduleConfigForm.courseId = this.$store.state.currentCourseId;
            this.getRequest('/web/school/details').then(resp => {
                this.allSchoolInfo = resp.data;
            });
            this.getRequest('/web/academy/teacherInfo').then(resp => {
                this.academyTeacherInfo = resp.data;
            });
        },
        methods: {
            cancel() {
                this.goBack();
            },
            goBack() {
                this.$emit('changeName', 'CourseInfo');
            },
            handleClassChange(value) {
                if (value.length > 0) {
                    for (let i = 0; i < value.length; i++) {
                        this.scheduleConfigForm.selectItems.push(value[i][2]);
                    }
                } else {
                    this.scheduleConfigForm.selectItems = [];
                }
            },
            handleTeacherChange(value) {
                if (value.length > 0) {
                    this.scheduleConfigForm.teacherId = value[1];
                } else {
                    this.scheduleConfigForm.teacherId = '';
                }
            },
            onSubmit() {
                this.postJsonRequest('/web/schedule/courseConfig', this.scheduleConfigForm).then(resp => {
                })
            },
            initTeacher(value) {
                if (value) {
                    alert(1);
                }
            }
        },
    }
</script>

<style scoped>

</style>