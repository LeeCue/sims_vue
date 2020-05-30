<template>
    <el-container>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="always" style="height: 230px; width: 530px">
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
                            <el-divider direction="vertical"></el-divider>
                            <span v-text="position.district"></span>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </el-container>
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
                    district: '',
                },
            }
        },
        watch: {
        },
        mounted() {
            this.userInfo = JSON.parse(sessionStorage.getItem('user'));
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
            var geolocation = new AMap.Geolocation({
                // 是否使用高精度定位，默认：true
                enableHighAccuracy: true,
                // 设置定位超时时间，默认：无穷大
                timeout: 10000,
                // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
                buttonOffset: new AMap.Pixel(10, 20),
                //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                zoomToAccuracy: true,
                //  定位按钮的排放位置,  RB表示右下
                buttonPosition: 'RB'
            });

            // test commit
            const _this = this;
            geolocation.getCurrentPosition(function (status, result) {
                if (status === 'complete') {
                    onComplete(result);
                    _this.position.city = result.addressComponent.city;
                    _this.position.province = result.addressComponent.province;
                    _this.position.district = result.addressComponent.district;
                    console.log(_this.position);
                } else {
                    onError(result)
                }
            });

            function onComplete(data) {
                // data是具体的定位信息
                console.log(data);
            }

            function onError(data) {
                // 定位出错
            }
        }
    }
</script>

<style scoped>
    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        margin-bottom: 20px;
        border-bottom: 2px solid #ccc;
    }

    .user-info-cont {
        padding-left: 50px;
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
        margin-left: 30px;
    }
</style>