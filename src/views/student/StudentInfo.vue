<template>
    <!--<h1>学生个人信息查询</h1>-->
    <el-tabs style="margin-top: 10px" value="first">
        <el-tab-pane label="个人信息" name="first">
            <div style="margin-left: 30%;margin-right: 30%">
                <el-card class="box-card">
                    <el-row>
                        <div>
                            <div>
                                <el-image class="identification_photo" :src="this.avatarUrl" alt="" style="margin-left: 40%;margin-right: 40%"/>
                            </div>
                        </div></el-row>
                    <el-divider></el-divider>
                    <div class="Info">
                        <div style="margin-top: 20px">姓名：{{studentInfo.name}}</div>
                        <div style="margin-top: 20px" >学号：{{studentInfo.id}}</div>
                        <div style="margin-top: 20px">性别：{{studentInfo.sex}}</div>
                        <div style="margin-top: 20px">年龄：{{studentInfo.age}}</div>
                        <div style="margin-top: 20px">电话：{{studentInfo.phoneNum}}</div>
                        <div style="margin-top: 20px">email：{{studentInfo.email}}</div>
                        <div style="margin-top: 20px">身份证号：{{studentInfo.idCard}}</div>
                        <div style="margin-top: 20px">民族：{{studentInfo.nation}}</div>
                    </div>
                </el-card>
            </div>

        </el-tab-pane>

        <el-tab-pane label="课程信息" name="third">
            <div style="margin-left: 100px;margin-right: 100px">
                    <el-row>
                        <br>
                        <el-table
                            :data="coursesList"
                            style="width: 100%">
                            <el-table-column
                                    prop="name"
                                    label="课程名称">
                            </el-table-column>
                            <el-table-column
                                    prop="status"
                                    label="课程性质">
                            </el-table-column>
                            <el-table-column
                                    prop="credit"
                                    label="学分">
                            </el-table-column>
                            <el-table-column
                                    prop="period"
                                    label="学时">
                            </el-table-column>
                            <el-table-column
                                    prop="teacher.name"
                                    label="任课教师">
                            </el-table-column>
                        </el-table>
                    </el-row>
            </div>
        </el-tab-pane>

        <el-tab-pane label="学籍信息" name="fourth">
            <div>
                <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
                <el-col :span="18">
                    <el-card class="box-card" style="width: 500px;left: 0;right: 0;">
                        <div class="Info">
                            <div style="margin-top: 20px">学工号：{{studentInfo.id}}</div>
                            <div style="margin-top: 20px" >姓名：{{studentInfo.name}}</div>
                            <div style="margin-top: 20px">学院：{{studentInfo.academy.name}}</div>
                            <div style="margin-top: 20px">专业：{{studentInfo.major.name}}</div>
                            <div style="margin-top: 20px">班级：{{studentInfo.classes.name}}</div>
                            <div style="margin-top: 20px">入学时间：{{studentInfo.createTime}}</div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
            </div>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    export default {
        name: "second",
        data() {
            return {
                activeName: 'StudentInfo',
                studentInfo: '',
                avatarUrl: '',
                coursesList: [],
            }
        },
        watch: {},
        mounted() {
            this.initStudents();
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            initCourses(classId) {
                this.getRequest('/web/student/courses?classId=' + classId).then(resp => {
                    console.log(resp.data);
                    this.coursesList = resp.data;
                    for (let j = 0; j < this.coursesList.length; j++) {
                        if (this.coursesList[j].status === 1) {
                            this.coursesList[j].status = '必修';
                        } else if (this.coursesList[j].status === 2) {
                            this.coursesList[j].status = '选修';
                        } else if (this.coursesList[j].status === 3) {
                            this.coursesList[j].status = '公选';
                        }
                    }
                })
            },
            initStudents() {
                this.getRequest('/web/student/personalInfo').then(resp => {
                    this.studentInfo = resp.data;
                    if (this.studentInfo.avatar === '') {
                        this.avatarUrl = require('../../assets/user_pic_middle.gif');
                    }
                    this.initCourses(this.studentInfo.classes.id);
                })
            }
        },
    }
</script>

<style scoped>
    .activeName{
        width: 100%;
        height: 100%;
    }

    .box-card {
        width: 100%;
        height: 100%;
    }

    .bg-purple {

    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }

    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
    .identification_photo{
        width: 120px;
        height: 140px;
        //margin-left: 160px;
    }
    .Info{
        width: 100%;
        height: 100%;
        margin-left: 100px;
    }
</style>