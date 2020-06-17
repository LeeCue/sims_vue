<template>
    <div class="panel">
        <div class="panel-heading"></div>
        <div class="note">
            <i class="el-icon-warning-outline" style="font-size: 50px; color: #2ea9cd"></i>
            <span style="font-size: 18px; font-family: 'Microsoft YaHei',serif">对不起，当前不属于选课阶段，如有需要，请与管理员联系！</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DisabledPage"
    }
</script>

<style scoped>
    .panel {
        margin-bottom: 20px;
        background-color: #ffffff;
        border-radius: 4px;
        border: 1px solid #bce8f1;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
    }

    .panel-heading {
        position: relative;
        padding: 7px 15px !important;
        color: #31708f;
        background-color: #d9edf7;
        border-color: #bce8f1;
        height: 30px;
        border-bottom: 1px solid transparent;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
    }

    .note {
        text-align: center;
        width: auto;
        margin: 30px auto;
    }
</style>