<template>
    <div style="margin-top: 50px;">
        <div style="margin-left: 10%">
            <el-button type="primary" size="small" @click="showSearchDialog">查询课程</el-button>
            <el-button type="info" size="small" @click="addCourseShow">开设课程</el-button>
            <el-button type="success" size="small" @click="showSelectCourseConfig">开放选课系统</el-button>
        </div>
        <el-dialog
                title="查询课程信息"
                :visible.sync="searchVisible"
                width="30%">
            <el-form ref="selectForm" :model="selectForm" label-width="80px">
                <el-form-item class="form-item" label="课程名称" prop="name">
                    <el-input v-model="selectForm.name" clearable style="width: 220px" placeholder="请输入课程名称"></el-input>
                </el-form-item>
                <el-form-item class="form-item" label="选择学院" prop="academyId">
                    <el-select v-model="selectForm.academyId" clearable placeholder="请选择学院信息">
                        <el-option
                                v-for="item in academies"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="form-item" label="课程性质" prop="status">
                    <el-checkbox-group v-model="selectForm.status">
                        <el-checkbox label="1" name="status">必修课程</el-checkbox>
                        <el-checkbox label="2" name="status">选修课程</el-checkbox>
                        <el-checkbox label="3" name="status">公选课程</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item class="form-item" style="text-align: center">
                    <el-button type="primary" icon="el-icon-search" @click="onSubmit">搜索</el-button>
                    <el-button @click="resetSearchForm('selectForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-row style="margin-left: 10%; margin-top: 20px" type="flex">
            <el-col :span="24">
                <el-table
                        :data="courses"
                        border
                        style="width: fit-content">
                    <el-table-column
                            type="index"
                            fixed
                            width="60">
                    </el-table-column>
                    <el-table-column
                            fixed
                            prop="name"
                            label="课程名称"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="status"
                            label="课程性质"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="academy.name"
                            label="学院"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="credit"
                            label="学分"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="total"
                            label="人数"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="period"
                            label="学时"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="createTime"
                            label="创建时间"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="updateTime"
                            label="修改时间"
                            width="120">
                    </el-table-column>
                    <el-table-column label="操作" width="230">
                        <template slot-scope="scope">
                            <el-button
                                    v-if="scope.row.status !== '公选课'"
                                    type="warning"
                                    size="mini"
                                    icon="el-icon-star-off"
                                    @click="schoolScheduleConfig(scope.row)">教学计划设定
                            </el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>

        <el-pagination
                style="margin-top: 20px"
                class="align-center"
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :page-size="selectForm.pageSize"
                :current-page="selectForm.currPage"
                :total="courseTotal">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "CourseManage",
        data() {
            return {
                courseTotal: 0,
                searchVisible: false,
                selectForm: {
                    name: '',
                    status: [],
                    academyId: '',
                    currPage: 1,
                    pageSize: 5,
                },
                courses: [],
                academies: [],
            }
        },
        mounted() {
            this.searchCourseData();
            this.initAcademies();
        },
        methods: {
            searchCourseData() {
                this.postJsonRequest('/web/init/courseInfo', this.selectForm).then(resp => {
                    for (let i = 0; i < resp.data.list.length; i++) {
                        this.dealData(resp.data.list[i]);
                    }
                    this.courses = resp.data.list;
                    this.courseTotal = resp.data.total;
                });
            },
            initAcademies() {
                this.getRequest('/web/academy/initAll').then(resp => {
                    this.academies = resp.data;
                });
            },
            dealData(obj) {
                if (obj.status === 1) {
                    obj.status = '必修课';
                } else if (obj.status === 2) {
                    obj.status = '选修课';
                } else if (obj.status === 3) {
                    obj.status = '公选课';
                }
            },
            handleDelete(obj) {
                this.$confirm('是否永久删除【' + obj.name + '】课程信息？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest("/web/course/" + obj.id).then(resp => {
                        if (resp) {
                            this.searchCourseData();
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            onSubmit() {
                this.searchCourseData();
                this.searchVisible = false;
            },
            showSearchDialog() {
                this.searchVisible = true;
            },
            addCourseShow() {
                this.$emit('changeName', 'AddCourse');
            },
            showSelectCourseConfig() {
                this.$emit('changeName', 'SelectCourseSystemConfig');
            },
            schoolScheduleConfig(obj) {
                this.$store.state.currentCourseId = obj.id;
                this.$store.state.currentCourseName = obj.name;
                this.$emit('changeName', 'SchoolScheduleConfig');
            },
            resetSearchForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleCurrentChange(val) {
                this.selectForm.currPage = val;
                this.searchCourseData();
            }
        },
    }
</script>

<style scoped>
    .align-center {
        text-align: center;
    }
</style>