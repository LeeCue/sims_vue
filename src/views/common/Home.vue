<template>
    <div>
        <el-row :gutter="20" type="flex">
            <!-- 个人信息名片 -->
            <el-col :span="12">
                <el-card shadow="hover" style="height: 230px; width: 600px;">
                    <div class="user-info">
                        <div @click="avatarClick">
                            <img class="user-avatar" :src=this.avatarUrl alt=""/>
                        </div>
                        <div class="user-info-cont">
                            <div v-text="userInfo.name" style="color: #222;font-size: 25px;"></div>
                            <div v-text="role"></div>
                        </div>
                    </div>
                    <div style="display: flex; font-size: 15px; color: #999;">
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
                <el-tabs tab-position="left" v-model="activeTab" @tab-click="tabClick" type="border-card" style="height: 400px; overflow-x: auto;">
                    <el-tab-pane name="教务通知公告">
                        <span slot="label">
                            <i class="el-icon-s-claim"></i>
                            <span>教务通知公告</span>
                        </span>
                        <el-row :gutter="0" class="icon-more">
                            <span @click="changePage1(false)"><i class="el-icon-caret-left"></i></span>
                            <span @click="changePage1(true)"><i class="el-icon-caret-right"></i></span>
                        </el-row>
                        <br>
                        <div v-for="content in noticeContent_1" style="height: 30px;">
                            <div>
                                <div class="content-title" v-text="content.title" @click="contentClick(content.id)"></div>
                                <div class="content-date" v-text="content.createTime"></div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane name="教务系统公告"><span slot="label"><i class="el-icon-s-opportunity"></i>
                        <span>教务系统公告</span>
                    </span>
                        <el-row :gutter="0" class="icon-more">
                            <span @click="changePage2(false)"><i class="el-icon-caret-left"></i></span>
                            <span @click="changePage2(true)"><i class="el-icon-caret-right"></i></span>
                        </el-row>
                        <br>
                        <div v-for="content in noticeContent_2" style="height: 30px">
                            <div>
                                <div class="content-title" v-text="content.title" @click="contentClick(content.id)"></div>
                                <div class="content-date" v-text="content.createTime"></div>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>

        <div style="margin-top: 30px"></div>

        <!-- Echart报表 -->
        <keep-alive>
            <el-row :gutter="20" type="flex">
                <el-col :span="12">
                    <el-card class="chart-card" shadow="hover">
                        <!-- 访问人数报表 -->
                        <div id="visitedNum" style="width: 800px;height:400px;"></div>
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card class="chart-card" shadow="hover">
                        <!-- 学院人数报表 -->
                        <div id="academyNum" style="width: 800px;height:400px;"></div>
                    </el-card>
                </el-col>
            </el-row>
        </keep-alive>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                activeTab: '教务通知公告',
                userInfo: '',
                role: '',
                avatarUrl: '',
                city: '',
                position: {
                    city: '',
                    province: '',
                },
                orgOptions: {},
                noticeContent_1: [],
                noticeContent_2: [],
                currPage1: 1,
                currPage2: 1,
                hasNextPage1: false,
                hasPrePage1: false,
                hasNextPage2: false,
                hasPrePage2: false,
            }
        },
        mounted() {
            //数据的初始化
            this.drawVisitedNum();
            this.drawAcademyNum();
            //document.querySelector('body').setAttribute('style', 'background: #f0f0f0');
            this.initBoardContent();
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
        methods: {
            initBoardContent() {
                let currPage = 0;
                if (this.activeTab === '教务通知公告') {
                    currPage = this.currPage1;
                } else {
                    currPage = this.currPage2;
                }
                this.getRequest('/web/board/type?currPage=' + currPage + '&pageSize=' + 10 + '&typeName=' + this.activeTab).then(resp => {
                    if (this.activeTab === '教务通知公告') {
                        this.noticeContent_1 = resp.data.list;
                        this.hasNextPage1 = resp.data.hasNextPage;
                        this.hasPrePage1 = resp.data.hasPreviousPage;
                    } else {
                        this.noticeContent_2 = resp.data.list;
                        this.hasNextPage2 = resp.data.hasNextPage;
                        this.hasPrePage2 = resp.data.hasPreviousPage;
                    }
                });
            },
            avatarClick() {
                this.$router.replace('/center');
            },
            drawVisitedNum() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById("visitedNum"));
                // 指定图表的配置项和数据
                let option = {
                    title: {
                        text: "近七日访问人数"
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
                    name: '计算机科学与技术学院',
                    value: 672
                }, {
                    name: '机械与制造学院',
                    value: 238
                }, {
                    name: '人文学院',
                    value: 572
                }, {
                    name: '土木工程学院',
                    value: 231
                }, {
                    name: '电气工程学院',
                    value: 215
                }, {
                    name: '力学与工程学院',
                    value: 452
                }, {
                    name: '经济管理学院',
                    value: 312
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
            contentClick(val) {
                this.$store.state.boardId = val;
                this.$router.replace('/boardDetails');
            },
            tabClick(tab) {
                this.activeTab = tab.name;
                this.initBoardContent();
            },
            changePage1(val) {
                if (val && this.hasNextPage1) {
                    this.currPage1 = this.currPage1 + 1;
                    this.initBoardContent();
                }
                if (!val && this.hasPrePage1) {
                    this.currPage1 = this.currPage1 - 1;
                    this.initBoardContent();
                }
            },
            changePage2(val) {
                if (val && this.hasNextPage1) {
                    this.currPage2 = this.currPage2 + 1;
                    this.initBoardContent();
                }
                if (!val && this.hasPrePage1) {
                    this.currPage2 = this.currPage2 - 1;
                    this.initBoardContent();
                }
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
        display: inline-block;
    }

    .content-title:hover {
        color: #1890ff;
        cursor: pointer;
    }

    .content-date {
        color: #777676;
        font-size: 14px;
        float: right;
    }

    .icon-more {
        margin-top: -10px;
        float: right;
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