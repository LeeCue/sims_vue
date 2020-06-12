<template>
    <div style="height: 100%;">
        <el-container>
            <el-header class="homeHeader">
                <div class="title" style="color: white;font-size: 18px;float: left;">学生信息管理系统
                    <div class="collapse-btn" @click="collapseChange">
                        <i v-if="!isCollapse" class="el-icon-s-fold"></i>
                        <i v-else class="el-icon-s-unfold"></i>
                    </div>
                </div>
                <div>
                    <el-button icon="el-icon-bell" type="text" style="margin-right: 8px;color: #00b5ad;" size="normal"></el-button>
                    <el-dropdown class="userInfo" @command="commandHandler">
                      <span class="el-dropdown-link" style="color: white">
                        欢迎回来，亲爱的<span v-text="this.user.name"></span><i><img :src=this.user.avatar alt=""></i>
                      </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="userInfo">个人中心</el-dropdown-item>
                            <el-dropdown-item command="setting">设置</el-dropdown-item>
                            <el-dropdown-item command="logout" divided>注销登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-header>
            <el-container>
                <el-aside :style="{width: widthVal}">
                    <el-row>
                        <el-col :span="24">
                            <div class="sidebar">
                                <el-menu
                                        :collapse="isCollapse"
                                        :collapse-transition="false"
                                        router
                                        class="el-menu-vertical-demo1"
                                        background-color="#333333"
                                        text-color="#fff"
                                        active-text-color="#edb102">
                                    <el-submenu :index="index + ''" v-for="(item, index) in routes" v-if="!item.hidden" :key="index">
                                        <template slot="title">
                                            <i style="color: #E4E7ED;margin-right: 5px" :class="item.iconCls"></i>
                                            <span v-text="item.name"></span>
                                        </template>
                                        <el-menu-item :index="child.path" v-for="(child,index1) in item.children" :key="index1">
                                            {{child.name}}
                                        </el-menu-item>
                                    </el-submenu>
                                </el-menu>
                            </div>
                        </el-col>
                    </el-row>
                </el-aside>
                <el-main>
                    <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path !== '/home'">
                        <el-breadcrumb-item :to ="{path : '/home'}">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <!-- 根据路由配置规则自动加载组件 -->
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isCollapse: false,
                //user: JSON.parse(window.sessionStorage.getItem("user")),
                user: JSON.parse(window.localStorage.getItem('user')),
                widthVal: '200px',
            };
        },
        computed: {
            routes() {
                return this.$store.state.routes;
            }
        },
        methods: {
            commandHandler(cmd) {
                if (cmd === 'userInfo') {
                    this.$router.replace('/center');
                }
                if (cmd === 'logout') {
                    this.$confirm('此操作将注销登录, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.getRequest("/logout");
                        this.$store.commit('REMOVE_USER');
                        this.$store.commit('REMOVE_ROUTES');
                        this.$router.replace("/login");
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消操作'
                        });
                    });
                }
            },
            collapseChange() {
                this.isCollapse = !this.isCollapse;
                if (this.isCollapse) {
                    this.widthVal = '80px';
                } else {
                    this.widthVal = '200px';
                }
            }
        }
    };
</script>

<style>
    .collapse-btn{
        float: left;
        padding: 0 10px;
        cursor: pointer;
        color: white;
        font-size: 20px;
    }

    .el-menu-vertical-demo1:not(.el-menu--collapse) {
        width: 200px;
        list-style-type: none;
        top: 60px;
        margin: 0;
        padding: 0;
        height: 100%;
        position: fixed;
        overflow: auto;
    }

    .homeHeader {
        display: flex;
        background-color: #262f3e;
        position: fixed;
        top: 0;
        z-index: 200;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        padding: 0 15px;
        box-sizing: border-box;
    }

    .el-dropdown-link img {
        display: inline-block;
        width: 32px;
        height: 32px;
        border-radius: 5px;
        vertical-align: middle;
        margin-left: 8px;
    }

    .el-dropdown-link {
        display: flex;
        align-items: center;
    }

    .el-main {
        margin-top: 60px;
    }

    .sidebar > ul {
        height: 100%;
        top: 60px;
        margin: 0;
        padding: 0;
        overflow: auto;
        position: fixed;
    }

    body{
        background: url("../assets/so-white.png");
    }
</style>