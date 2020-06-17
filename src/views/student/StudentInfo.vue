<template>
    <!--<h1>学生个人信息查询</h1>-->
    <el-tabs style="margin-top: 10px">
        <el-tab-pane label="个人信息" name="first">
            <div>
                <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
                <el-col :span="18">
                    <div>
                        <br>
                        <el-table
                                :data = "PerData"
                                style="width: 100%" >
                            <el-table-column
                                    prop="id"
                                    label="学工号">
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="姓名">
                            </el-table-column>
                            <el-table-column
                                    prop="sex"
                                    label="性别">
                            </el-table-column>
                            <el-table-column
                                    prop="age"
                                    label="年龄">
                            </el-table-column>
                            <el-table-column
                                    prop="mail"
                                    label="邮箱">
                            </el-table-column>
                            <el-table-column
                                    prop="num"
                                    label="电话">
                            </el-table-column>
                        </el-table>
                    </div>
                </el-col>
                <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
            </div>
        </el-tab-pane>

        <el-tab-pane label="成绩查询" name="second">
            <div style="margin-left: 100px;margin-right: 100px">
                    <div>
                        <el-row gutter="20" >
                                <el-dropdown>
                                <span class="el-dropdown-link">
                                    请选择查询学年<i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item>大一</el-dropdown-item>
                                        <el-dropdown-item>大二</el-dropdown-item>
                                        <el-dropdown-item >大三</el-dropdown-item>
                                        <el-dropdown-item >大四</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                                <el-radio-group v-model="radio" style="margin-left: 50px">
                                    <el-radio :label="3">第一学期</el-radio>
                                    <el-radio :label="6">第二学期</el-radio>
                                </el-radio-group>
                        </el-row>
                        <br>
                        <el-row>
                            <el-table
                                    :data="scoreData"
                                    style="width: 100%">
                                <el-table-column
                                        prop="subject"
                                        label="科目">
                                </el-table-column>
                                <el-table-column
                                        prop="score"
                                        label="分数">
                                </el-table-column>
                                <el-table-column
                                        prop="credit"
                                        label="学分">
                                </el-table-column>
                                <el-table-column
                                        prop="gradePoint"
                                        label="绩点">
                                </el-table-column>
                            </el-table>
                        </el-row>
                    </div>
               <div class="grid-content bg-purple"></div>
            </div>
        </el-tab-pane>

        <el-tab-pane label="课程信息" name="third">
            <div style="margin-left: 100px;margin-right: 100px">
                    <el-row>
                        <br>
                        <el-table
                            :data="subjectData"
                            style="width: 100%">
                            <el-table-column
                                    prop="subjectName"
                                    label="课程名称">
                            </el-table-column>
                            <el-table-column
                                    prop="subjectNature"
                                    label="课程性质">
                            </el-table-column>
                            <el-table-column
                                    prop="credit"
                                    label="学分">
                            </el-table-column>
                            <el-table-column
                                    prop="time"
                                    label="学时">
                            </el-table-column>
                            <el-table-column
                                    prop="teacher"
                                    label="任课教师">
                            </el-table-column>
                        </el-table>
                    </el-row>
            </div>
        </el-tab-pane>

        <el-tab-pane label="学籍信息" name="fourth">
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
                            <div style="margin-top: 20px">姓名：{{user.name}}</div>
                            <div style="margin-top: 20px" >学号：{{user.id}}</div>
                            <div style="margin-top: 20px">学院：{{this.initStudents.academyId}}</div>
                            <div style="margin-top: 20px">专业：{{user.subjectName}}</div>
                            <div style="margin-top: 20px">班级：{{user.class}}</div>
                            <div style="margin-top: 20px">入学时间:{{user.createTime}}</div>
                        </div>
                    </el-card>
            </div>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    export default {
        name: "second",
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            initStudents() {
                this.postJsonRequest("/web/student/personalInfo",this.user.id).then(resp => {
                    this.loadingFlag = false;
                    if (resp) {
                        this.PerData = resp.data.list;
                    }
                });
            },
        },
        data() {
            return {
                activeName: 'StudentInfo',
                PerData: [],
                scoreData: [{
                   subject:'软件工程',
                    score:'88',
                    credit: '2.8',
                    gradePoint:'1'
                }],
                subjectData:[{
                    subjectName:'软件工程',
                    subjectNature:'必修',
                    credit:'3.0',
                    time:'120'
                }],
                radio: 3,
                fits: 'fill',
                url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                user: ''
            }
        },
        watch: {},
        mounted() {
            this.user = JSON.parse(localStorage.getItem('user'));
            this.initStudents();
            /*this.PerData = JSON.*/
        }

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