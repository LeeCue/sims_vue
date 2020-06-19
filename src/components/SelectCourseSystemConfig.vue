<template>
    <div style="margin-top: 20px">
        <el-page-header @back="goBack" content="选课系统开放">
        </el-page-header>
        <el-tag type="warning" style="margin-top: 20px; color: #00b5ad; font-size: 15px">
            <p>注意：①本选课系统只针对课程性质为 <span class="red_color">公选性质</span>。
                ②必须设定<span class="red_color">开放时间、关闭时间</span>。
                ③选课系统关闭后，所有学院的选课入口都将关闭。
                ④同一个时间段，只能<span class="red_color">开放一次</span>选课系统。
            </p>
        </el-tag>
        <el-form ref="configForm" :model="configForm" label-width="120px" style="margin-top: 30px">
            <el-form-item label="时间设定" label-width="120px">
                <el-date-picker
                        v-model="time"
                        type="datetimerange"
                        range-separator="-"
                        :picker-options="pickTimeOptions"
                        disabledDate="disabledDate"
                        start-placeholder="开放时间"
                        end-placeholder="关闭时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="选择学院" label-width="120px">
                <el-switch
                        v-model="configForm.selectAll"
                        active-text="全部"
                        inactive-text="部分">
                </el-switch>
            </el-form-item>
            <el-form-item v-if="configForm.selectAll === false" label="开设学院" label-width="120px">
                <el-checkbox-group v-model="configForm.selectAcademies">
                    <el-checkbox :label="item.id" v-for="item in academies" :key="item.id">{{item.name}}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" @click="onsubmit">立即开放</el-button>
                <el-button size="small" @click="goBack">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "SelectCourseSystemConfig",
        data() {
            return {
                time: '',
                academies: '',
                configForm: {
                    startTime: '',
                    endTime: '',
                    selectAll: true,
                    selectAcademies: [],
                },
                pickTimeOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                }
            }
        },
        watch: {
            time(v1, v2) {
                this.configForm.startTime = v1[0];
                this.configForm.endTime = v1[1];
            },
        },
        mounted() {
            this.getRequest('/web/academy/initAll').then(resp => {
                this.academies = resp.data;
            });
        },
        methods: {
            goBack() {
                this.$emit('changeName', 'CourseInfo');
            },
            onsubmit() {
                this.postKeyValueRequest('/web/openSystem/config', this.configForm).then(resp => {
                    console.log(resp);
                    if (resp.data.status === 406) {
                        if (resp.data.msg) {
                            this.$message.error(resp.data.object);
                        } else {
                            this.$message.error('选课系统不可开启!');
                        }
                    }
                });
            },
        }
    }
</script>

<style scoped>
    .red_color {
        color: red;
    }
</style>