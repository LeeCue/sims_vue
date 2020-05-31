<template>
    <div style="margin-top: 30px;">
        <el-page-header @back="goBack" content="详情页面"></el-page-header>
        <div style="margin-top: 20px"></div>
        <el-form :label-position="right" label-width="80px" :model="student" style="margin-left: 4cm;">
            <el-row>
                <el-col :xl="8" :xs="12">
                    <el-form-item label="学工号">
                        <el-input class="inputStyle" v-model="student.id" disabled clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xl="8" :xs="12">
                    <el-form-item label="姓名">
                        <el-input class="inputStyle" v-model="student.name" clearable></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :xl="8" :xs="12">
                    <el-form-item label="民族">
                        <el-input class="inputStyle" v-model="student.nation" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xl="8" :xs="12">
                    <el-form-item label="学院">
                        <el-select v-model="student.academy.id" clearable
                                   @visible-change="academySelectChange" placeholder="请选择学院...">
                            <el-option
                                    v-for="item in allAcademies"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :xl="8" :xs="12">
                    <el-form-item label="性别">
                        <el-radio v-model="student.sex" label="男">男</el-radio>
                        <el-radio v-model="student.sex" label="女">女</el-radio>
                    </el-form-item>
                </el-col>
                <el-col :xl="8" :xs="12">
                    <el-form-item label="专业">
                        <el-select v-model="student.major.id" clearable
                                   @visible-change="majorSelectChange"
                                   placeholder="请选择专业...">
                            <el-option
                                    v-for="item in allMajors"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :xl="8" :xs="12">
                    <el-form-item label="年龄">
                        <el-input class="inputStyle" v-model.number="student.age" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xl="8" :xs="12">
                    <el-form-item label="班级">
                        <el-select v-model="student.classes.id" clearable
                                   @visible-change="classSelectChange" placeholder="请选择班级...">
                            <el-option
                                    v-for="item in allClasses"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :xl="8" :xs="12">
                    <el-form-item label="政治面貌">
                        <el-select v-model="student.politicsStatus" placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :xl="8" :xs="12">
                    <el-form-item label="入学时间">
                        <el-date-picker
                                v-model="student.createTime"
                                :picker-options="pickerOptions"
                                value-format="yyyy-MM-dd"
                                start-placeholder="开始日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="身份证号" style="justify-content: center">
                <el-input class="inputStyle" v-model="student.idCard" clearable></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
                <el-input class="inputStyle" v-model="student.phoneNum" clearable></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input class="inputStyle" v-model="student.email" clearable></el-input>
            </el-form-item>
            <el-row type="flex" class="buttonsStyle">
                <el-col :xl="2" :xs="10">
                    <el-button type="primary" plain @click="updateStudentInfo">确认</el-button>
                </el-col>
                <el-col :xl="2" :xs="10">
                    <el-button plain @click="goBack">取消</el-button>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: 'updateInfo',
        data() {
            return {
                student: '',
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },
                options: [{
                    value: '群众',
                    label: '群众'
                }, {
                    value: '共青团员',
                    label: '共青团员'
                }, {
                    value: '中共党员',
                    label: '中共党员'
                }],
                allAcademies: [],
                allMajors: [],
                allClasses: [],
            }
        },
        watch: {
            studentInfo(v1, v2) {
            },
            allClasses(v1, v2) {
                console.log(v1);
            },
            'student.major.id'(v1, v2) {
                this.student.classes.id = '';
            },
            'student.academy.id'(v1, v2) {
                this.student.major.id = '';
                this.student.classes.id = '';
            }
        },
        mounted() {
            //初始化学院、专业、班级信息
            this.academySelectChange(true);
            this.majorSelectChange(true);
            this.classSelectChange(true);
            console.log(this.student.classes);
        },
        computed: {
            studentInfo() {
                this.student = JSON.parse(this.$store.state.updateStudent);
            }
        },
        methods: {
            goBack() {
                this.$emit('changeName', 'studentInfo');
            },
            academySelectChange(val) {
                if (val && this.allAcademies.length <= 1) {
                    this.getRequest('/web/academy/initAll').then(resp => {
                        this.allAcademies = resp.data;
                    });
                }
            },
            majorSelectChange(val) {
                if (val) {
                    if (this.student.academy.id === '') {
                        this.getRequest('/web/major/initAll').then(resp => {
                            this.allMajors = resp.data;
                        });
                    } else {
                        this.getRequest('/web/major/getByAcademyId?academyId=' + this.student.academy.id).then(resp => {
                            this.allMajors = resp.data;
                        });
                    }
                } else {
                    if (this.student.academy.id === '' && this.student.major.id !== '') {
                        this.getRequest('/web/academy/getByMajorId?majorId=' + this.student.major.id).then(resp => {
                            this.academySelectChange(true);
                            this.student.academy.id = resp.data.id;
                        });
                    }
                }
            },
            classSelectChange(val) {
                if (val) {
                    if (this.student.academy.id === '' && this.student.major.id === '') {
                        this.$message.warning('请先选择专业和学院信息');
                    } else {
                        this.getRequest('/web/class/getByMajorId?majorId=' + this.student.major.id).then(resp => {
                            this.allClasses = resp.data;
                        });
                    }
                }
            },
            updateStudentInfo() {
                this.postJsonRequest('/web/studentInfo/update', this.student).then(resp => {
                    if (resp.data.object) {
                        this.$message({
                            showClose: true,
                            message: resp.data.object,
                            type: 'error',
                            duration: 0
                        });
                    }
                })
            },
        }
    }
</script>

<style scoped>
    .inputStyle {
        width: 300px;
    }
    @media (min-width: 1920px) {
        .buttonsStyle {
            margin-left: 350px;
        }
    }
</style>