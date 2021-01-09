<template>
    <div :style="note">
        <el-form
                :rules="rules"
                ref="loginForm"
                v-loading="loading"
                element-loading-text="正在登录..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :model="loginForm"
                class="loginContainer">
            <h3 class="loginTitle">学生信息维护系统</h3>
            <el-divider><span style="font-size: 14px;color: #8c8c8c">统一认证中心</span></el-divider>
            <h5 style="text-align: center">登录到 <span style="color: #1890ff">【信息维护综合平台】</span></h5>
            <el-form-item prop="username">
                <el-input size="normal" type="text" v-model="loginForm.username" auto-complete="off"
                          placeholder="职工号/学号" clearable prefix-icon="el-icon-user" @keydown.enter.native="submitLogin"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input size="normal" type="password" v-model="loginForm.password" auto-complete="off"
                          placeholder="密码" clearable prefix-icon="el-icon-lock" @keydown.enter.native="submitLogin"></el-input>
            </el-form-item>
            <el-form-item>
                <el-col :span="12">
                    <el-form-item prop="imageCode">
                        <el-input size="normal" type="text" v-model="loginForm.imageCode" auto-complete="off" class="el-col-width"
                                  placeholder="验证码" clearable style="width: 80%" @keydown.enter.native="submitLogin"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item required>
                        <img id="img" alt="显示失败" :src="codeURL" @click="refreshCaptcha"/>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item style="margin: 0">
                <el-checkbox size="normal" class="loginRemember" v-model="loginForm.rememberMe">一周内免登录</el-checkbox>
            </el-form-item>
            <el-button size="normal" type="primary" style="width: 100%;" @click="submitLogin" :disabled=forbidLogin>登录
            </el-button>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                codeURL: 'http://localhost:9000/web/createImageCode',
                loginUrl: 'login',
                loading: false,
                forbidLogin: true,
                loginForm: {
                    username: '',
                    password: '',
                    imageCode: '',
                    rememberMe: true
                },
                rules: {
                    username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    password: [{required: true, message: '请输入密码', trigger: 'blur'}],
                    imageCode: [{required: true, message: '请输入验证码', trigger: 'blur'}],
                },
                note: {
                    backgroundImage: "url(" + require("../assets/graphic3.svg") + ")",
                    backgroundColor: "#f9f9f9",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    position: "absolute",
                    backgroundSize: "100% 100%",
                }
            }
        },
        watch: {
            'loginForm.username': function (val, oldValue) {
                this.forbidLogin = !this.checkData();
            },
            'loginForm.password': function (val, oldValue) {
                this.forbidLogin = !this.checkData();
            },
            'loginForm.imageCode': function (val, oldValue) {
                this.forbidLogin = !this.checkData();
            }
        },
        methods: {
            checkData() {
                return this.loginForm.username !== '' && this.loginForm.password !== '' && this.loginForm.imageCode !== '';
            },
            refreshCaptcha() {
                this.codeURL += '?t=' + new Date().getTime();
            },
            submitLogin() {
                this.$refs.loginForm.validate((valid) => {
                    if (valid && !this.forbidLogin) {
                        this.loading = true;
                        this.postKeyValueRequest('/web/doLogin', this.loginForm).then(resp => {
                                this.loading = false;
                                if (resp) {
                                    var user = resp.data.user;
                                    if (user.avatar === '') {
                                        user.avatar = require('../assets/user_pic_middle.gif');
                                    }
                                    console.log(user);
                                    this.$store.commit('INIT_USER', JSON.stringify(user));
                                    this.$router.push('/');
                                }
                            }
                        );
                    } else {
                        this.$message.error("请输入所有的字段!");
                        return false;
                    }
                });
            }
        }
    }
</script>

<style>
    .loginContainer {
        border-radius: 15px;
        background-clip: padding-box;
        width: 350px;
        margin: 30px auto;
        padding: 15px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .loginTitle {
        margin: 15px auto 20px auto;
        text-align: center;
        color: #505458;
    }

    .loginRemember {
        text-align: left;
        margin: 0 0 15px 0;
    }
</style>