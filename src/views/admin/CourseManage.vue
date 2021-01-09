<template>
    <component v-bind:is="currName" @changeName="changName"></component>
</template>

<script>
    import CourseInfo from "../../components/CourseInfo";
    import AddCourse from "../../components/AddCourse";
    import SelectCourseSystemConfig from "../../components/SelectCourseSystemConfig";
    import SchoolScheduleConfig from "../../components/SchoolScheduleConfig";
    export default {
        name: "CourseManage",
        data() {
            return {
                currName: 'CourseInfo'
            }
        },
        components: {
            CourseInfo,
            AddCourse,
            SelectCourseSystemConfig,
            SchoolScheduleConfig,
        },
        methods: {
            changName(name) {
                this.currName = name;
            }
        },
    }
</script>

<style scoped>

</style>