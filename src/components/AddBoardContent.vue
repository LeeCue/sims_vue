<template>
    <div style="margin-top: 10px">
        <el-form class="board-form" ref="boardForm" :model="boardForm" label-width="100px">
            <el-form-item label="公告类型">
                <el-select class="form-item" v-model.number="boardForm.typeName" clearable  placeholder="请选择">
                    <el-option
                            v-for="item in allTypes"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标题">
                <el-input class="form-item" v-model="boardForm.title" placeholder="请输入标题内容..." clearable></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-switch
                        v-model="boardForm.published"
                        active-text="发布"
                        inactive-text="草稿">
                </el-switch>
            </el-form-item>
        </el-form>
        <div ref="editorElem" class="editor"></div>
        <div style="text-align: center; margin-top: 20px">
            <el-button type="primary" @click="submitBoard" v-text="buttonName"></el-button>
            <el-button @click="resetForm">重置</el-button>
        </div>
        <div v-html="htmlCode"></div>
    </div>
</template>

<script>
    import E from 'wangeditor'
    export default {
        name: "AddBoardContent",
        data() {
            return {
                boardForm: {
                    id: '',
                    typeName: '',
                    title: '',
                    published: true,
                    content: '',
                },
                editor: null,
                htmlCode: '',
                allTypes: [{
                    value: '教务通知公告',
                    name: '教务通知公告'
                }, {
                    value: '教务系统公告',
                    name: '教务系统公告'
                }],
                updateInfo: false,
                buttonName: '',
            }
        },
        watch: {

        },
        mounted () {
            let boardId = this.$store.state.currentBoardId;
            if (boardId !== -1) {
                this.updateInfo = true;
                this.buttonName = '更新';
                this.getRequest('/web/getBoard?id=' + boardId).then(resp => {
                    this.boardForm.typeName = resp.data.typeName;
                    this.boardForm.id = resp.data.id;
                    this.boardForm.title = resp.data.title;
                    this.boardForm.content = resp.data.content;
                    this.boardForm.published = resp.data.published;
                    this.initEditor(this.boardForm.content);
                });
            } else {
                this.initEditor('');
                this.buttonName = '创建';
            }

        },
        methods: {
            resetForm() {
                this.boardForm = {};
                this.editor.txt.clear();
            },
            initEditor(content) {
                this.editor = new E(this.$refs.editorElem);
                this.editor.customConfig.zIndex = 100;
                this.editor.customConfig.onchange = (html) => {
                    this.boardForm.content = html;
                };
                this.editor.customConfig.menus = [          // 菜单配置
                    'head',  // 标题
                    'bold',  // 粗体
                    'fontSize',  // 字号
                    'fontName',  // 字体
                    'italic',  // 斜体
                    'underline',  // 下划线
                    'strikeThrough',  // 删除线
                    'foreColor',  // 文字颜色
                    'backColor',  // 背景颜色
                    'link',  // 插入链接
                    'list',  // 列表
                    'justify',  // 对齐方式
                    'quote',  // 引用
                    'emoticon',  // 表情
                    'table',  // 表格
                    'code',  // 插入代码
                    'undo',  // 撤销
                    'redo'  // 重复
                ];
                this.editor.create();     // 创建富文本实例
                if (this.boardForm.content) {
                    this.editor.txt.html(content);
                }
            },
            submitBoard() {
                if (this.updateInfo) {
                    this.postJsonRequest('/web/update/board', this.boardForm).then(resp => {

                    });
                } else {
                    this.postJsonRequest('/web/add/board', this.boardForm).then(resp => {
                        //console.log(resp);
                    });
                }
            },
        }
    }
</script>

<style>
    .w-e-text-container {
        background-color: white;
        height: 450px !important;
    }

    .editor {
        margin-top: 40px;
        /*position: relative;
        margin-top: 200px;*/
    }

    .form-item {
        width: 400px;
    }

    .board-form {
        margin-top: 20px;
    }

</style>