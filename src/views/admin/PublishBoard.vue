<template>
    <div style="margin-top: 30px;margin-left: 30px;">
        <el-row :gutter="20">
            <el-col :span="6">
                <el-button type="danger" v-if="currentName !== ''" size="small" @click="changeName('')">返回管理页
                </el-button>
                <el-button type="primary" v-if="currentName === ''" size="small" @click="changeName('AddBoardContent')">
                    新增公告
                </el-button>
            </el-col>
            <el-col :span="12" v-if="currentName === ''">
                <el-input v-model="keywords" placeholder="请输入标题..." style="width: 300px" @keydown.enter.native="doSearch"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="doSearch" style="margin-left: 15px">搜索
                </el-button>
            </el-col>
        </el-row>
        <component v-bind:is="currentName" @changeName="changeName"></component>
        <div class="table" v-if="currentName === ''" style="margin-top: 20px; margin-left: 55px">
            <el-table
                    :data="tableData"
                    border
                    style="width: fit-content">
                <el-table-column
                        type="index"
                        width="60">
                </el-table-column>
                <el-table-column
                        prop="typeName"
                        label="公告类型"
                        :width="columnWidth">
                </el-table-column>
                <el-table-column
                        prop="title"
                        label="标题"
                        :width="columnWidth">
                </el-table-column>
                <el-table-column
                        label="发布状态"
                        :width="columnWidth">
                    <template slot-scope="scope">
                        <el-switch
                                v-model="scope.row.published"
                                active-text="发布"
                                inactive-text="草稿"
                                @change="publishedSwitch(scope.row)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        label="创建时间"
                        :width="columnWidth">
                </el-table-column>
                <el-table-column
                        prop="updateTime"
                        label="修改时间"
                        :width="columnWidth">
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="150">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.row)">编辑
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div v-if="currentName === ''" class="block" style="position: absolute; left: 38%;margin-top: 20px">
            <el-pagination
                    layout="prev, pager, next"
                    :total="boardsTotal"
                    :page-size="5"
                    :current-page="currPage"
                    @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import AddBoardContent from "../../components/AddBoardContent";

    export default {
        name: "PublishBoard",
        data() {
            return {
                boardsTotal: 1,
                currPage: 1,
                keywords: '',
                currentName: '',
                tableData: [],
                columnWidth: 180,
            }
        },
        components: {
            AddBoardContent
        },
        watch: {},
        mounted() {
            this.initTableData('');
        },
        methods: {
            handleCurrentChange(val) {
                this.currPage = val;
                this.initTableData(this.keywords);
            },
            initTableData(keyword) {
                this.getRequest('/web/init/board?keyword=' + keyword + '&currPage=' + this.currPage + '&pageSize=' + 5).then(resp => {
                    console.log(resp.data);
                    if (resp) {
                        this.boardsTotal = resp.data.total;
                        this.tableData = resp.data.list;
                    }
                });
            },
            doSearch() {
                //处理搜索逻辑
                this.initTableData(this.keywords);
            },
            changeName(name) {
                this.currentName = name;
                if (name === '') {
                    this.initTableData('');
                    this.$store.commit('REMOVE_CURRENT_BOARD_ID');
                }
            },
            handleEdit(obj) {
                this.currentName = 'AddBoardContent';
                this.$store.commit('ADD_CURRENT_BOARD_ID', obj.id);
            },
            handleDelete(obj) {
                this.$confirm('是否永久删除【' + obj.title + '】该条公告？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest("/web/board/" + obj.id).then(resp => {
                        this.initTableData('');
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            publishedSwitch(obj) {
                this.getRequest('/web/changeBoard/published?id=' + obj.id + '&published=' + obj.published).then(resp => {
                });
            },
        }
    }
</script>

<style>

</style>