<template>
    <div>
        <el-divider><span class="table-title">课程列表</span></el-divider>
        <el-table
                :data="coursesList"
                border
                style="width: 1082px;margin-left: 180px">
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
                    prop="academy.name"
                    label="学院"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="teacher.name"
                    label="教师"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="credit"
                    label="学分"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="leftNum"
                    label="剩余名额"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="total"
                    label="总容量"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="period"
                    label="学时"
                    width="120">
            </el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary"
                            @click="handleSelect(scope.row)">选择
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                background
                layout="prev, pager, next"
                :page-size="pageSize"
                @current-change="changePage"
                style="text-align: center; margin-top: 30px"
                :total="total">
        </el-pagination>
        <div style="margin-top: 50px"></div>
        <el-divider><span class="table-title">已选列表</span></el-divider>
        <el-table
                :data="selectCourseList"
                border
                style="width: 962px;margin-left: 180px">
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
                    prop="academy.name"
                    label="学院"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="teacher.name"
                    label="教师"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="credit"
                    label="学分"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="total"
                    label="总容量"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="period"
                    label="学时"
                    width="120">
            </el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row)">退选
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "SelectCourse",
        data() {
            return {
                selectFlag: false,
                coursesList: [],
                selectCourseList: [],
                sign: '',
                total: 0,
                pageSize: 5,
                currPage: 1,
            }
        },
        mounted() {
            this.initCourseInfo();
            this.initSelectedCourseInfo();
        },
        methods: {
            handleSelect(obj) {
                if (this.sign) {
                    this.selectCourse(obj);
                } else {
                    this.getRequest('/web/beforeSelect').then(resp => {
                        if (resp.data.status === 408) {
                            this.$message.warning(resp.data.msg);
                        } else if (resp.data.status === 210) {
                            this.sign = resp.data.sign;
                        }
                        if (this.sign) {
                            this.selectCourse(obj);
                        }
                    });
                }
            },
            selectCourse(obj) {
                this.getRequest('/web/select/course?sign=' + this.sign + '&cid=' + obj.id + '').then(resp => {
                    if (resp.data.status === 409) {
                        this.sign = '';
                        this.handleSelect(obj);
                    } else if (resp.data.status === 211) {
                        this.$message.success(resp.data.msg);
                    } else if (resp.data.status === 410) {
                        this.$message.warning(resp.data.msg);
                    } else if (resp.data.status === 411) {
                        this.$message.error(resp.data.msg);
                    }
                    this.initSelectedCourseInfo();
                });
            },
            handleDelete(obj) {
                this.getRequest('/web/cancel/selectedCourse?cid=' + obj.id).then(resp => {
                    this.initCourseInfo();
                    this.initSelectedCourseInfo();
                });
            },
            initCourseInfo() {
                this.getRequest('/web/getCacheCourse?pageSize=' + this.pageSize + '&currPage=' + this.currPage).then(resp => {
                    this.coursesList = resp.data.courseList;
                    this.total = resp.data.total;
                });
            },
            initSelectedCourseInfo() {
                this.getRequest('/web/get/selectedCourse').then(resp => {
                    this.selectCourseList = resp.data;
                });
            },
            changePage(val) {
                this.currPage = val;
                this.initCourseInfo();
            }
        }
    }
</script>

<style scoped>
    .table-title {
        font-size: 18px;
        color: #00b1af;
        font-family: "Microsoft YaHei",serif;
    }
</style>