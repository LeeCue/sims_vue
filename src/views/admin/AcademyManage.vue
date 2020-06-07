<template>
    <div>
        <div style="margin-top: 20px; text-align: center;">
            <el-row>
                <el-button type="primary" @click="showInputAcademy">新增学院</el-button>
                <el-button type="success" @click="showInputMajor">新增专业</el-button>
                <el-button type="info" @click="showInputClass">新增班级</el-button>
            </el-row>
            <div style="margin-top: 20px" v-if="showAcademy">
                <label class="label-name">学院</label>
                <el-input v-model="academyName" placeholder="请输入学院名称..." style="width: 200px"></el-input>
            </div>
            <div style="margin-top: 20px; display: flex" v-if="showMajor">
                <el-row>
                    <label class="label-name">选择学院信息</label>
                    <el-select v-model="selectedAcademy" clearable placeholder="请选择学院信息...">
                        <el-option
                                v-for="item in allAcademy"
                                :key="item.academyId"
                                :label="item.academyName"
                                :value="item.academyId">
                        </el-option>
                    </el-select>
                </el-row>
                <el-row>
                    <label class="label-name">专业</label>
                    <el-input v-model="majorName" placeholder="请输入专业名称..." style="width: 200px"></el-input>
                </el-row>
            </div>
            <div style="margin-top: 20px; display: flex" v-if="showClass">
                <el-row>
                    <label class="label-name">选择学院信息</label>
                    <el-select v-model="selectedAcademy" clearable placeholder="请选择学院信息...">
                        <el-option
                                v-for="item in allAcademy"
                                :key="item.academyId"
                                :label="item.academyName"
                                :value="item.academyId">
                        </el-option>
                    </el-select>
                </el-row>
                <el-row>
                    <label class="label-name">选择专业信息</label>
                    <el-select v-model="selectedMajor" clearable placeholder="请选择专业信息...">
                        <el-option
                                v-for="item in allMajor"
                                :key="item.majorId"
                                :label="item.majorName"
                                :value="item.majorId">
                        </el-option>
                    </el-select>
                </el-row>
                <el-row>
                    <label class="label-name">班级</label>
                    <el-input v-model="majorName" placeholder="请输入班级名称..." style="width: 200px"></el-input>
                </el-row>
            </div>
            <div style="margin-top: 30px">
                <el-row>
                    <el-button type="primary" @click="submit" round>提交</el-button>
                    <el-button type="success" @click="" plain round>重置</el-button>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AcademyManage",
        data() {
            return {
                academyName: '',
                showAcademy: false,
                showMajor: false,
                showClass: false,
                //所有学院信息
                allAcademy: [{
                    academyId: '1',
                    academyName: '计算机学院'
                }, {
                    academyId: '2',
                    academyName: '机械学院'
                }],
                //所有专业信息
                allMajor: [{
                    majorId: '1',
                    majorName: '软件工程'
                }, {
                    majorId: '2',
                    majorName: '计科专业'
                }],
                selectedAcademy: '',
                selectedMajor: '',
                majorName: '',
            }
        },
        watch: {
            showMajor() {
                this.selectedAcademy = '';
            },
            showClass() {
                this.selectedAcademy = '';
                this.selectedMajor = '';
            }
        },
        mounted() {
            //数据初始化
        },
        methods: {
            showInputAcademy() {
                this.showAcademy = true;
                this.showMajor = false;
                this.showClass = false;
            },
            showInputMajor() {
                //初始化所有学院信息 allAcademy
                this.showMajor = true;
                this.showAcademy = false;
                this.showClass = false;
            },
            showInputClass() {
                this.showMajor = false;
                this.showAcademy = false;
                this.showClass = true;
            },
            submit() {
                if (this.showAcademy) {

                } else if (this.showMajor) {
                    //数据校验
                    this.getRequest('/web/school/addMajor?academyId=' + this.selectedAcademy + '&majorName=' + this.majorName)
                        .then(resp => {

                        }).catch(error => {

                    });
                } else {

                }
            }
        },
    }
</script>

<style scoped>
    .label-name {
        font-size: 15px;
        padding-right: 20px;
    }
</style>