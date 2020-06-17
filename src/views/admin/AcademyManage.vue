<template>
    <el-div>
        <el-row>
            <el-col :span="24">
                <div class="grid-content" style="margin-top:20px;">
                    <el-button type="primary" @click="dialogCreate = true">新建</el-button>
                    <el-button type="success" @click="dialogDelete = true ">删除</el-button>
                    <el-button type="info" @click="dialogSelect = true">查找</el-button>
                </div>
                <el-dialog
                        title="新建学院、专业、班级"
                        :visible.sync="dialogCreate"
                        width="30%"
                        :before-close="handleClose">
                    <el-button type="primary" @click="addAcademy = true">新增学院</el-button>
                    <el-button type="primary" @click="addMajor = true">新增专业</el-button>
                    <el-button type="primary" @click="addClass = true">新增班级</el-button>
                    <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogCreate = false">取 消</el-button>
                    <el-button type="primary" @click="dialogCreate = false">确 定</el-button>
                    </span>
                </el-dialog>
                <el-dialog
                        :visible.sync="addAcademy"
                        width="30%"
                        :before-close="handleClose">
                    <el-form id="mySearchForm" :model="searchForm" ref="searchForm">
                        <el-form-item label="学院名称" >
                            <el-input>
                                class="formItem"
                                clearable
                                v-model="searchForm.id"
                                placeholder="请输入学工号..."
                                auto-complete="off"
                                style="width: 300px">
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                    <el-button @click="addAcademy = false">取 消</el-button>
                    <el-button type="primary" @click="addAcademy = false">确 定</el-button>
                    </span>
                </el-dialog>
                <el-dialog
                        :visible.sync="addMajor"
                        width="30%"
                        :before-close="handleClose">
                    <el-form >
                        <el-form-item label="选择学院">
                            <el-cascader :props="props"></el-cascader>
                        </el-form-item>
                    </el-form>
                    <el-row>
                        <el-form >
                            <el-form-item label="专业名称">
                                <el-input>
                                    placeholder="请输入专业名称"
                                </el-input>
                            </el-form-item>
                        </el-form>
                    </el-row>
                    <span slot="footer" class="dialog-footer">
                    <el-button @click="addMajor = false">取 消</el-button>
                    <el-button type="primary" @click="addMajor = false">确 定</el-button>
                    </span>
                </el-dialog>
                <el-dialog
                        :visible.sync="addClass"
                        width="30%"
                        :before-close="handleClose">
                    <el-form >
                        <el-form-item label="选择学院">
                            <el-cascader :props="props"></el-cascader>
                        </el-form-item>
                    </el-form>
                    <el-row>
                        <el-form >
                            <el-form-item label="选择专业">
                                <el-cascader :props="props"></el-cascader>
                            </el-form-item>
                        </el-form>
                    </el-row>
                    <el-row>
                        <el-form >
                            <el-form-item label="班级名称">
                                <el-input>
                                    placeholder="请输入班级名称"
                                </el-input>
                            </el-form-item>
                        </el-form>
                    </el-row>
                    <span slot="footer" class="dialog-footer">
                    <el-button @click="addClass = false">取 消</el-button>
                    <el-button type="primary" @click="addClass = false">确 定</el-button>
                    </span>

                </el-dialog>
                <el-dialog
                        title="删除学院、专业、班级"
                        :visible.sync="dialogDelete"
                        width="30%"
                        :before-close="handleClose">

                    <el-button type="primary" @click="deleteAcademy = true">删除学院</el-button>
                    <el-button type="primary" @click="deleteMajor = true">删除专业</el-button>
                    <el-button type="primary" @click="deleteClass = true">删除班级</el-button>
                    <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogDelete = false">取 消</el-button>
                    <el-button type="primary" @click="dialogDelete = false">确 定</el-button>
                    </span>
                </el-dialog>
                <el-dialog
                        :visible.sync="deleteAcademy"
                        width="30%"
                        :before-close="handleClose">
                    <el-form >
                        <el-form-item label="学院名称">
                            <el-input>
                                placeholder="请输入学院名称"
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                    <el-button @click="deleteAcademy = false">取 消</el-button>
                    <el-button type="primary" @click="deleteAcademy = false">确 定</el-button>
                    </span>
                </el-dialog>
                <el-dialog
                        :visible.sync="deleteMajor"
                        width="30%"
                        :before-close="handleClose">
                    <el-form >
                        <el-form-item label="选择学院">
                            <el-cascader :props="props"></el-cascader>
                        </el-form-item>
                    </el-form>
                    <el-row>
                        <el-form >
                            <el-form-item label="专业名称">
                                <el-input>
                                    placeholder="请输入专业名称"
                                </el-input>
                            </el-form-item>
                        </el-form>
                    </el-row>
                    <span slot="footer" class="dialog-footer">
                    <el-button @click="deleteMajor = false">取 消</el-button>
                    <el-button type="primary" @click="deleteMajor = false">确 定</el-button>
                    </span>
                </el-dialog>
                <el-dialog
                        :visible.sync="deleteClass"
                        width="30%"
                        :before-close="handleClose">
                    <el-form >
                        <el-form-item label="选择学院">
                            <el-cascader :props="props"></el-cascader>
                        </el-form-item>
                    </el-form>
                    <el-row>
                        <el-form >
                            <el-form-item label="选择专业">
                                <el-cascader :props="props1"></el-cascader>
                            </el-form-item>
                        </el-form>
                    </el-row>
                    <el-row>
                        <el-form >
                            <el-form-item label="班级名称">
                                <el-input>
                                    placeholder="请输入班级名称"
                                </el-input>
                            </el-form-item>
                        </el-form>
                    </el-row>
                    <span slot="footer" class="dialog-footer">
                    <el-button @click="deleteClass = false">取 消</el-button>
                    <el-button type="primary" @click="deleteClass = false">确 定</el-button>
                    </span>
                </el-dialog>
                <el-dialog

                        title="查找信息"
                        :visible.sync="dialogSelect"
                        width="30%"
                        :before-close="handleClose">

                    <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogSelect = false">取 消</el-button>
                    <el-button type="primary" @click="dialogSelect = false">确 定</el-button>
                    </span>
                </el-dialog>
            </el-col>
        </el-row>
        <el-table
                ref="multipleTable"
                :data="tableData"
                style="width: 100%"
                @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    label=""
                    width="50"
                    :render-header="renderHeader">
                <el-checkbox></el-checkbox>
                <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column
                    prop="academy"
                    label="学院"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="major"
                    label="专业"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="class"
                    label="班级"
                    width="220"
                    show-overflow-tooltip>
            </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
            <el-button @click="toggleSelection()">取消选择</el-button>
        </div>
    </el-div>

</template>

<script>
    let id = 0;
    export default {
        data() {
            return {
                dialogCreate: false,
                dialogDelete:false,
                dialogSelect:false,
                addAcademy:false,
                addMajor:false,
                addClass:false,
                deleteAcademy:false,
                deleteMajor:false,
                deleteClass:false,
                SearchForm:{
                id:'',
                },
                props: {
                    lazy: true,
                    lazyLoad (node, resolve) {
                        const { level } = node;
                        setTimeout(() => {
                            const nodes = Array.from({ length: level + 1 })
                                .map(item => ({
                                    value: ++id,
                                    label: `计算机科学与技术`,

                                    leaf: level >= 0
                                }));
                            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                            resolve(nodes);
                        }, 1000);
                    }
                },
                props1: {
                    lazy: true,
                    lazyLoad (node, resolve) {
                        const { level } = node;
                        setTimeout(() => {
                            const nodes = Array.from({ length: level + 1 })
                                .map(item => ({
                                    value: ++id,
                                    label: `软件工程`,

                                    leaf: level >= 0
                                }));
                            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                            resolve(nodes);
                        }, 1000);
                    }
                },
                tableData: [{
                    academy: '计算机科学与技术',
                    major: '计算机科学与技术',
                    class: '计科1701班'
                }, {
                    academy: '计算机科学与技术',
                    major: '计算机科学与技术',
                    class: '计科1702班'
                }, {
                    academy: '计算机科学与技术',
                    major: '计算机科学与技术',
                    class: '计科1703班'
                }, {
                    academy: '计算机科学与技术',
                    major: '软件工程',
                    class: '软工1701班'
                }],
                multipleSelection: []
            }
        },
        methods: {
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
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
            }
        }

    }
</script>