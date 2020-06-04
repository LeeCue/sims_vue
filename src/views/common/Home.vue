<template>
    <div>
        <el-row :gutter="20" type="flex">
            <!-- 个人信息名片 -->
            <el-col :span="12">
                <el-card shadow="hover" style="height: 230px; width: 530px">
                    <div class="user-info">
                        <img class="user-avatar" :src=this.avatarUrl alt=""/>
                        <div class="user-info-cont">
                            <div v-text="userInfo.name" style="color: #222;font-size: 25px;"></div>
                            <div v-text="role"></div>
                        </div>
                    </div>
                    <div style="display: flex; font-size: 15px; color: #999">
                        本次登陆地点：
                        <div class="user-info-list">
                            <span v-text="position.province"></span>
                            <el-divider direction="vertical"></el-divider>
                            <span v-text="position.city"></span>
                        </div>
                    </div>
                </el-card>
            </el-col>

            <el-col :span="12">
                <el-tabs tab-position="left" type="border-card" style="height: 400px; overflow-x: auto;">
                    <el-tab-pane>
                        <span slot="label">
                            <i class="el-icon-s-claim"></i>
                            <span>教务通知公告</span>
                        </span>
                        <div>
                            <div @click="moreClick(1)"><i class="el-icon-more icon-more"></i></div>
                            <br>
                            <div v-for="content in noticeContent" style="height: 30px">
                                <div>
                                    <div class="content-title" v-text="content.title" @click="contentClick(content.id)"></div>
                                    <div class="content-date" v-text="content.createTime"></div>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane><span slot="label"><i class="el-icon-s-opportunity"></i>
                        <span>系统公告</span>
                    </span>test111
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>

        <div style="margin-top: 30px"></div>

        <!-- Echart报表 -->
        <el-row :gutter="20" type="flex">
            <el-col :span="12">
                <el-card class="chart-card" shadow="hover">
                    <div id="visitedNum" style="width: 800px;height:400px;"></div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="chart-card" shadow="hover">
                    <div id="academyNum" style="width: 800px;height:400px;"></div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                value: new Date(),
                userInfo: '',
                role: '',
                avatarUrl: '',
                city: '',
                position: {
                    city: '',
                    province: '',
                },
                orgOptions: {},
                noticeContent: [
                    {
                        id: 1,
                        title: 'test1这是一段很长的文字文字文字',
                        createTime: '2020-5-2',
                    },
                    {
                        id: 2,
                        title: 'test2',
                        createTime: '2020-4-2',
                    },
                    {
                        id: 3,
                        title: 'test3',
                        createTime: '2020-3-2',
                    },
                ],
            }
        },
        watch: {},
        mounted() {
            this.drawVisitedNum();
            this.drawAcademyNum();
            //document.querySelector('body').setAttribute('style', 'background: #f0f0f0');
            this.userInfo = JSON.parse(localStorage.getItem('user'));
            if (this.userInfo.status === 1) {
                this.role = '超级管理员';
            } else if (this.userInfo.status === 2) {
                this.role = '学生';
            } else if (this.userInfo.status === 3) {
                this.role = '教师';
            }
            if (this.userInfo.avatar === '') {
                this.avatarUrl = require('../../assets/user_pic_middle.gif');
            } else {
                this.avatarUrl = this.userInfo.avatar;
            }

            const _this = this;
            AMap.plugin('AMap.CitySearch', function () {
                var citySearch = new AMap.CitySearch();
                citySearch.getLocalCity(function (status, result) {
                    if (status === 'complete' && result.info === 'OK') {
                        // 查询成功，result即为当前所在城市信息
                        _this.position.city = result.city;
                        _this.position.province = result.province;
                    }
                })
            });
        },
        beforeDestroy() {
            //document.querySelector('body').removeAttribute('style');
        },
        methods: {
            drawVisitedNum() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById("visitedNum"));
                // 指定图表的配置项和数据
                let option = {
                    title: {
                        text: "ECharts"
                    },
                    tooltip: {},
                    legend: {
                        data: ["访问人数"]
                    },
                    xAxis: {
                        type: 'category',
                        data: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"]
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: "访问人数",
                            type: "line",
                            data: [5, 20, 36, 10, 10, 20, 56]
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            },
            drawAcademyNum() {
                let myChart = this.$echarts.init(document.getElementById("academyNum"));
                var data = [{
                    name: 'Apples',
                    value: 70
                }, {
                    name: 'Strawberries',
                    value: 68
                }, {
                    name: 'Bananas',
                    value: 48
                }, {
                    name: 'Oranges',
                    value: 40
                }, {
                    name: 'Pears',
                    value: 32
                }, {
                    name: 'Pineapples',
                    value: 27
                }, {
                    name: 'Grapes',
                    value: 18
                }];
                let option = {
                    title: {
                        text: '学院人数信息',
                        textStyle: {
                            fontFamily: 'monospace',
                        },
                        left: '43%',
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b}: {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 10,
                    },
                    series: [
                        {
                            name: '学院人数',
                            type: 'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            animation: false,
                            label: {
                                position: 'outer',
                                alignTo: 'labelLine',
                                bleedMargin: 5
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    fontSize: '20',
                                    fontWeight: 'bold'
                                }
                            },
                            labelLine: {
                                show: true
                            },
                            data: data,
                        }
                    ]
                };
                myChart.setOption(option);
            },
            moreClick(val) {
                if (val === 1) {
                    alert('教务通知公告，更多页面');
                }
            },
            contentClick(val) {
                alert(val);
            }
        }
    }
</script>

<style>
    .el-tabs__item {
        font-size: 16px !important;
        font-family: 'monospace';
        font-weight: normal;
        text-align: left !important;
    }

    .el-tabs__nav-scroll {
        background-color: #f5f7fa;
    }

    .content-title {
        color: #777676;
        font-size: 16px;
        font-family: 'sans-serif';
        margin-left: 3px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        display: inline;
    }

    .content-title:hover {
        color: #1890ff;
        cursor: pointer;
    }

    .content-date {
        color: #777676;
        font-size: 14px;
        float: right;
        position: relative;
    }

    .icon-more {
        float: right;
        padding: 0 10px;
        color: #1890ff;
        cursor: pointer;
        font-size: 20px;
    }

    .chart-card {
        overflow: auto;
    }

    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        margin-bottom: 20px;
        border-bottom: 2px solid #ccc;
    }

    .user-info-cont {
        padding-left: 60px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }

    .user-avatar {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }

    .user-info-list {
        margin-left: 50px;
    }

</style>