<template>
    <div style="text-align: center">
        <h1>学生信息管理</h1>

        <el-row class="studentTable" type="flex">
            <el-col :span="24">
                <div style="margin-top: 20px;display: flex;margin-left: 10px;">
                    <el-button type="primary" size="small" @click="selectConditionFormVisible = true">条件查询或导出
                    </el-button>
                    <el-button type="warning" size="small" @click="insertStudentInfoVisible = true">录入信息</el-button>
                    <el-tooltip effect="dark" content="将选中的学生数据导出" placement="top-start">
                        <el-button type="info" @click="exportSelectedData" size="small" style="margin-left: 10px">选择导出
                        </el-button>
                    </el-tooltip>
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
                                prop="classes.name"
                                label="班级"
                                sortable
                                width="150">
                        </el-table-column>
                        <el-table-column
                                prop="major.name"
                                label="专业"
                                width="200">
                        </el-table-column>
                        <el-table-column
                                prop="academy.name"
                                label="学院"
                                width="200">
                        </el-table-column>
                        <el-table-column
                                prop="createTime"
                                label="入学时间"
                                sortable
                                width="200">
                        </el-table-column>
                        <el-table-column label="操作" width="150">
                            <template slot-scope="scope">
                                <el-button @click="handleClick(scope.row)" size="mini">编辑</el-button>
                                <el-button @click="handleDeleteUser(scope.row)" type="danger" size="mini">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div style="display: flex;margin-top: 20px">
                    <el-button @click="toggleSelection(students)" size="small">全选</el-button>
                    <el-button @click="toggleSelection()" size="small">取消选择</el-button>
                </div>
            </el-col>
        </el-row>

        <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="searchForm.pageNum"
                :page-sizes="[3, 5, 8, 10]"
                :page-size="searchForm.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                style="margin-top: 20px;">
        </el-pagination>

        <!-- 查询Form或者导出Form -->
        <el-dialog title="学生信息查询或导出" :visible.sync="selectConditionFormVisible" width="30%" :before-close="searchFormClosed">
            <el-form id="mySearchForm" :model="searchForm" ref="searchForm">
                <el-form-item label="学工号" :label-width="labelWidth" prop="id">
                    <el-input
                            class="formItem"
                            clearable
                            v-model="searchForm.id"
                            placeholder="请输入学工号..."
                            auto-complete="off"
                            style="width: 300px">
                    </el-input>
                </el-form-item>
                <el-form-item label="姓名" :label-width="labelWidth" prop="name">
                    <el-input
                            class="formItem"
                            clearable
                            v-model="searchForm.name"
                            placeholder="请输入姓名..."
                            auto-complete="off"
                            style="width: 300px">
                    </el-input>
                </el-form-item>
                <el-form-item label="学院" :label-width="labelWidth">
                    <el-select class="formItem" v-model="searchForm.selectedAcademy" clearable
                               @visible-change="academySelectChange" placeholder="请选择学院...">
                        <el-option
                                v-for="item in allAcademies"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="专业" :label-width="labelWidth">
                    <el-select class="formItem" v-model="searchForm.selectedMajor" clearable
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
                <el-form-item label="班级" :label-width="labelWidth">
                    <el-select class="formItem" v-model="searchForm.selectedClass" clearable
                               @visible-change="classSelectChange" placeholder="请选择班级...">
                        <el-option
                                v-for="item in allClasses"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="入学时间" :label-width="labelWidth">
                    <el-date-picker
                            class="formItem"
                            v-model="searchForm.pickTime"
                            :picker-options="pickerOptions"
                            type="daterange"
                            range-separator="至"
                            value-format="yyyy-MM-dd"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: center">
                <el-button @click="resetForm('searchForm')">重 置</el-button>
                <el-button type="info" @click="exportData">导 出</el-button>
                <el-button type="primary" @click="initStudents">查 询</el-button>
                <el-button @click="selectConditionFormVisible = false">取 消</el-button>
            </div>
        </el-dialog>

        <!-- 学生信息录入过程 -->
        <el-dialog title="学生信息录入" :visible.sync="insertStudentInfoVisible" width="30%" :before-close="insertDialogClosed">
            <div style="text-align: left;">
                <el-steps :space="200" :active="active" finish-status="success" align-center>
                    <el-step title="步骤一" description="选择录入方式（单条\批量）"></el-step>
                    <el-step title="步骤二" description="录入数据"></el-step>
                    <el-step title="步骤三" description="最终提交"></el-step>
                </el-steps>
            </div>
            <div v-if="active === 0">
                <el-button type="primary" plain size="mini" @click="changeInsertStatus(1)">单条信息</el-button>
                <el-button type="success" plain size="mini" @click="changeInsertStatus(2)">批量信息</el-button>
            </div>
            <!-- 单条学生数据插入 -->
            <div v-if="insertOneInfo && active === 1">
                <el-form :model="insertOneForm" ref="insertOneForm" :rules="insertOneInfoRules">
                    <el-form-item label="姓名" :label-width="labelWidth" prop="name">
                        <el-input
                                class="formItem"
                                clearable
                                v-model="insertOneForm.name"
                                placeholder="请输入姓名..."
                                auto-complete="off"
                                style="width: 300px">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="年龄" :label-width="labelWidth" prop="age">
                        <el-input
                                class="formItem"
                                clearable
                                v-model.number="insertOneForm.age"
                                placeholder="请输入年龄..."
                                auto-complete="off"
                                style="width: 300px">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="性别" :label-width="labelWidth" prop="sex">
                        <el-radio-group class="formItem" v-model="insertOneForm.sex" style="margin-top: 13px">
                            <el-radio :label="'男'">男</el-radio>
                            <el-radio :label="'女'">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="邮箱" :label-width="labelWidth" prop="email">
                        <el-input
                                class="formItem"
                                clearable
                                v-model="insertOneForm.email"
                                placeholder="请输入邮箱..."
                                auto-complete="off"
                                style="width: 300px">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="身份证号" :label-width="labelWidth" prop="idCard">
                        <el-input
                                class="formItem"
                                clearable
                                v-model="insertOneForm.idCard"
                                placeholder="请输入身份证号..."
                                auto-complete="off"
                                style="width: 300px">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="学院" :label-width="labelWidth" prop="academyId">
                        <el-select class="formItem" v-model.number="insertOneForm.academyId" clearable
                                   @visible-change="academySelectChange" placeholder="请选择学院...">
                            <el-option
                                    v-for="item in allAcademies"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="专业" :label-width="labelWidth" prop="majorId">
                        <el-select class="formItem" v-model.number="insertOneForm.majorId" clearable
                                   @visible-change="majorSelectChange" placeholder="请选择专业...">
                            <el-option
                                    v-for="item in allMajors"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="班级" :label-width="labelWidth" prop="classId">
                        <el-select class="formItem" v-model.number="insertOneForm.classId" clearable
                                   @visible-change="classSelectChange" placeholder="请选择班级...">
                            <el-option
                                    v-for="item in allClasses"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="入学时间" :label-width="labelWidth" prop="createTime">
                        <el-date-picker
                                class="formItem"
                                v-model="insertOneForm.createTime"
                                :picker-options="pickerOptions"
                                type="date"
                                placeholder="选择入学时间..."
                                value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
            </div>
            <!-- 批量学生数据插入 -->
            <div v-if="insertMultipleInfo && active === 1">
                <el-upload class="upload-demo"
                           drag
                           ref="upload"
                           action="#"
                           accept=".xlsx"
                           :auto-upload="false"
                           :limit="fileLimit"
                           :before-upload="beforeUploadFile"
                           :on-change="fileChange"
                           :on-exceed="exceedFile"
                           :on-success="handleSuccess"
                           :on-remove="removeFile"
                           :on-error="handleError"
                           :http-request="uploadStudentInfoFile"
                           :show-file-list="true"
                           :with-credentials="true"
                           multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传要求的xlsx文件（模板文件后缀应为.xlsx）</div>
                </el-upload>
            </div>
            <div v-if="active === 3 && this.errorNums > 0">
                <p>共有 <span v-text="errorNums" style="color: red"></span> 条数据上传失败
                    <a href="javascript:void(0);" @click="downloadErrorFile">点击下载</a></p>
            </div>
            <div slot="footer" class="dialog-footer" style="text-align: center">
                <el-button type="primary" @click="insertForwardStep" v-if="active !== 0 && active <= 2">上一步
                </el-button>
                <el-button type="primary" @click="insertNextStep('insertOneForm')" v-text="buttonInfo" v-if="active >= 1"></el-button>
                <el-button @click="insertDialogClosed">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'studentInfo',
        data() {
            return {
                errorNums: '',
                fileLimit: 2,
                fileList: [],
                loadingFlag: false,
                total: 0,
                insertOneInfo: false,
                insertMultipleInfo: false,
                buttonInfo: '下一步',
                active: 0,
                labelWidth: '80px',
                selectConditionFormVisible: false,
                insertStudentInfoVisible: false,
                insertOneForm: {
                    name: '',
                    sex: '男',
                    age: '',
                    email: '',
                    createTime: '',
                    academyId: '',
                    majorId: '',
                    classId: '',
                    idCard: ''
                },
                insertOneInfoRules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'},
                    ],
                    sex: [
                        {required: true, message: '请选择性别', trigger: 'blur'},
                    ],
                    age: [
                        {required: true, message: '请输入年龄', type: 'number'},
                    ],
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                    ],
                    idCard: [
                        {required: true, message: '请输入身份证号', trigger: 'blur'},
                    ],
                    academyId: [
                        {required: true, message: '请选择学院信息', type: 'number', trigger: 'change'},
                    ],
                    majorId: [
                        {required: true, message: '请选择专业信息', type: 'number', trigger: 'change'},
                    ],
                    classId: [
                        {required: true, message: '请选择班级信息', type: 'number', trigger: 'change'},
                    ],
                    createTime: [
                        {required: true, message: '请选择入学日期', trigger: 'blur'},
                    ]
                },
                searchForm: {
                    id: '',
                    name: '',
                    pickTime: '',
                    startTime: '',
                    endTime: '',
                    selectedAcademy: '',
                    selectedMajor: '',
                    selectedClass: '',
                    pageNum: 1,
                    pageSize: 3,
                },
                multipleSelection: [],
                allAcademies: [],
                allMajors: [],
                allClasses: [],
                students: [],
                allPoliticsStatus: [
                    {
                        value: '群众',
                        label: '群众',
                    },
                    {
                        value: '共青团员',
                        label: '共青团员',
                    },
                    {
                        value: '中共党员',
                        label: '中共党员',
                    }
                ],
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },
            }
        },
        mounted() {
            this.initStudents();
        },
        watch: {
            'searchForm.pickTime'(newValue, oldValue) {
                if (newValue) {
                    this.searchForm.startTime = newValue[0];
                    this.searchForm.endTime = newValue[1];
                    console.log(this.searchForm.startTime);
                    console.log(this.searchForm.endTime);
                }
            },
            active(newValue, oldValue) {
                if (newValue === 2) {
                    this.buttonInfo = '提交';
                } else if (newValue < 2) {
                    this.buttonInfo = '下一步';
                } else {
                    this.buttonInfo = '完成';
                }
            },
            'searchForm.selectedMajor'(newValue, oldValue) {
                if (newValue && this.searchForm.selectedClass !== '') {
                    this.searchForm.selectedClass = '';
                }
            }
        },
        methods: {
            initStudents() {
                this.loadingFlag = true;
                this.postJsonRequest("/web/student/info", this.searchForm).then(resp => {
                    this.loadingFlag = false;
                    if (resp) {
                        this.students = resp.data.list;
                        this.total = resp.data.total;
                    }
                });
                this.selectConditionFormVisible = false;
            },
            exportSelectedData() {
                if (this.multipleSelection.length > 0) {
                    console.log(this.multipleSelection);
                    const fromData = new FormData();
                    const ids = [];
                    for (let i = 0; i < this.multipleSelection.length; i++) {
                        ids.push(this.multipleSelection[i].id);
                    }
                    console.log(ids);
                    fromData.append('ids', ids);
                    this.axios({
                        method: 'post',
                        url: '/web/studentInfo/exportData/accordingId',
                        responseType: 'blob',
                        data: fromData,
                    }).then(resp => {
                        const content = resp.data;
                        this.download(content, '部分学生信息文件.xlsx');
                    });
                }
            },
            exportData() {
                if (this.checkSelectInfoIsNotEmpty()) {
                    this.axios({
                        method: 'post',
                        url: '/web/studentInfo/exportData',
                        responseType: 'blob',
                        data: this.searchForm,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(resp => {
                        const content = resp.data;
                        this.download(content, '学生信息导出文件.xlsx');
                    });
                }
            },
            checkSelectInfoIsNotEmpty() {
                var flag = false;
                if (this.searchForm.id !== '' || this.searchForm.name !== '' || this.searchForm.selectedAcademy !== ''
                    || this.searchForm.selectedMajor !== '' || this.searchForm.selectedClass !== ''
                    || (this.searchForm.startTime !== '' && this.searchForm.endTime !== '')) {
                    flag = true;
                }
                return flag;
            },
            handleClick(row) {
                //处理编辑动作
                this.$store.commit('INIT_UPDATE_STUDENT', JSON.stringify(row));
                this.$emit('changeName', 'updateInfo');
            },
            handleDeleteUser(user) {
                this.$confirm('是否永久删除【' + user.id + '】的信息？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest("/web/system/user/" + user.id).then(resp => {
                        if (resp) {
                            this.initStudents();
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        console.log(row);
                        this.$refs.multipleTable.toggleRowSelection(row);
                    })
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            changeInsertStatus(val) {
                if (val === 1) {
                    //学生信息单条的录入
                    this.insertOneInfo = true;
                    this.insertMultipleInfo = false;
                } else if (val === 2) {
                    //学生信息批量录入
                    this.$confirm('是否已有学生信息Excel模板?', '提示', {
                        confirmButtonText: '没有',
                        cancelButtonText: '已有',
                        type: 'info'
                    }).then(() => {
                        axios({
                            method: 'post',
                            url: '/web/student/templateFile/download',
                            responseType: 'blob'
                        }).then(resp => {
                            const content = resp.data;
                            this.download(content, '学生信息模板.xlsx');
                        });
                    }).catch(() => {

                    });
                    this.insertOneInfo = false;
                    this.insertMultipleInfo = true;
                }
                this.active = this.active + 1;
            },
            download(content, filename) {
                const blob = new Blob([content]); //创建一个类文件对象：Blob对象表示一个不可变的、原始数据的类文件对象
                const url = window.URL.createObjectURL(blob); //URL.createObjectURL(object)表示生成一个File对象或Blob对象
                let dom = document.createElement('a'); //设置一个隐藏的a标签，href为输出流，设置download
                dom.style.display = 'none';
                dom.href = url;
                dom.setAttribute('download', filename); //指示浏览器下载url,而不是导航到它；因此将提示用户将其保存为本地文件
                document.body.appendChild(dom);
                dom.click();
            },
            insertDialogClosed() {
                this.active = 0;
                this.insertOneInfo = false;
                this.insertMultipleInfo = false;
                this.fileList = [];
                this.insertOneForm = '';
                this.insertStudentInfoVisible = false;
            },
            insertForwardStep() {
                this.active = this.active - 1;
            },
            insertNextStep(formName) {
                if (this.active < 2) {
                    this.active = this.active + 1;
                } else if (this.active === 2) {
                    this.active = this.active + 1;
                    if (this.fileList.length !== 0) {
                        if (this.beforeUploadFile(this.fileList)) {
                            this.excelFilePostUpload("/web/studentInfo/fileUpload", this.fileList).then(resp => {
                                if (resp) {
                                    this.errorNums = resp.data.object;
                                    if (resp.data.object > 0) {
                                        this.$message.error("部分数据录入失败！");
                                    }
                                }
                            });
                        }
                    } else {
                        if (this.insertOneForm.academyId !== '' && this.insertOneForm.majorId !== '' && this.insertOneForm.classId !== '') {
                            this.postRequest('/web/studentInfo/upload', this.insertOneForm).then(resp => {
                                if (resp) {
                                    if (resp.data.status === 406) {
                                        this.$message.error('信息录入有误，请检查相关数据输入!');
                                        this.active = this.active - 1;
                                    }
                                }
                            });
                        } else {
                            this.$message.warning('选择学院、专业、班级信息有误');
                            this.active = this.active - 1;
                        }
                    }
                } else {
                    this.insertDialogClosed();
                }
            },
            downloadErrorFile() {
                this.axios({
                    method: 'post',
                    url: '/web/studentInfo/errorFile',
                    responseType: 'blob'
                }).then(resp => {
                    const content = resp.data;
                    if (content !== '') {
                        this.download(content, '错误录入信息文件.xlsx');
                    }
                    this.errorNums = 0;
                });
            },
            handleSizeChange(val) {
                this.searchForm.pageSize = val;
                this.initStudents();
            },
            handleCurrentChange(val) {
                this.searchForm.pageNum = val;
                this.initStudents();
            },
            resetForm(formName) {
                this.searchForm.selectedAcademy = '';
                this.searchForm.selectedMajor = '';
                this.searchForm.selectedClass = '';
                this.searchForm.pickTime = '';
                this.clearAllInfo();
            },
            clearAllInfo() {
                this.allAcademies = [];
                this.allMajors = [];
                this.allClasses = [];
            },
            academySelectChange(val) {
                if (val && this.allAcademies.length === 0) {
                    this.getRequest('/web/academy/initAll').then(resp => {
                        this.allAcademies = resp.data;
                    });
                }
            },
            majorSelectChange(val) {
                if (val) {
                    if (this.searchForm.selectedAcademy === '' && this.insertOneForm.academyId === '') {
                        this.getRequest('/web/major/initAll').then(resp => {
                            this.allMajors = resp.data;
                        });
                    } else {
                        var academyId = this.searchForm.selectedAcademy !== '' ? this.searchForm.selectedAcademy : this.insertOneForm.academyId;
                        this.getRequest('/web/major/getByAcademyId?academyId=' + academyId).then(resp => {
                            this.allMajors = resp.data;
                        });
                    }
                } else {
                    if ((this.searchForm.selectedAcademy === '' && this.searchForm.selectedMajor !== '')
                        || (this.insertOneForm.academyId === '' && this.insertOneForm.majorId !== '')) {
                        var majorId = this.searchForm.selectedMajor !== '' ? this.searchForm.selectedMajor : this.insertOneForm.majorId;
                        this.getRequest('/web/academy/getByMajorId?majorId=' + majorId).then(resp => {
                            this.academySelectChange(true);
                            if (this.searchForm.selectedMajor === '') {
                                this.insertOneForm.academyId = resp.data.id;
                            } else {
                                this.searchForm.selectedAcademy = resp.data.id;
                            }
                        });
                    }
                }
            },
            classSelectChange(val) {
                if (val) {
                    if (this.searchForm.selectedMajor === '' && this.insertOneForm.majorId === '') {
                        this.$message.warning('请先选择专业和学、院信息');
                    } else {
                        var majorId = this.searchForm.selectedMajor !== '' ? this.searchForm.selectedMajor : this.insertOneForm.majorId;
                        this.getRequest('/web/class/getByMajorId?majorId=' + majorId).then(resp => {
                            this.allClasses = resp.data;
                        });
                    }
                }
            },
            // 文件超出个数限制时的钩子
            exceedFile(files, fileList) {
                this.$message.warning(`只能选择 ${this.fileLimit} 个文件，当前共选择了 ${files.length + fileList.length} 个`);
            },
            removeFile(file, fileList) {
                let newFileList = [];
                for (let i = 0; i < fileList.length; i++) {
                    if (fileList[i] !== file) {
                        newFileList.push(fileList[i]);
                    }
                }
                this.fileList = newFileList;
            },
            // 文件状态改变时的钩子
            fileChange(file, fileList) {
                this.fileList.push(file.raw);
            },
            // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
            beforeUploadFile(fileList) {
                let isSize = true, isExcel = true;
                for (let i = 0; i < fileList.length; i++) {
                    let extension = fileList[i].name.substring(fileList[i].name.lastIndexOf('.') + 1);
                    let size = fileList[i].size / 1024 / 1024;
                    isSize = size < 10;
                    isExcel = extension === 'xlsx';
                    if (!isSize || !isExcel) {
                        break;
                    }
                }
                if (!isExcel) {
                    this.$message.warning('只能上传后缀是.xlsx的文件');
                }
                if (!isSize) {
                    this.$message.warning('文件大小不得超过10M');
                }
                return isSize && isExcel;
            },
            // 文件上传成功时的钩子
            handleSuccess(res, file, fileList) {
                this.$message.success('文件上传成功');
            },
            // 文件上传失败时的钩子
            handleError(err, file, fileList) {
                this.$message.error('文件上传失败');
            },
            uploadStudentInfoFile(params) {
                if (this.fileList.length === 0) {
                    this.$message.warning('请上传文件');
                } else {
                    this.excelFilePostUpload('/web/studentInfo/fileUpload', params)
                        .then(resp => {
                            //console.log(resp);
                        });
                }
            },
            searchFormClosed() {
                this.searchForm.selectedMajor = '';
                this.searchForm.selectedAcademy = '';
                this.searchForm.selectedClass = '';
                this.selectConditionFormVisible = false;
            }
        }
    }
</script>

<style scoped>
    .formItem {
        float: left;
    }

    .studentTable {
        margin-left: 1.78cm
    }
</style>