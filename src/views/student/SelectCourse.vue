<template>
    <div style="margin-top: 30px;">
        <component v-bind:is="currName"></component>
    </div>
</template>

<script>
    import DisabledPage from "../../components/DisabledPage";
    import SelectCourseDetails from "../../components/SelectCourseDetails";
    export default {
        name: "SelectCourse",
        components: {
            DisabledPage,
            SelectCourseDetails,
        },
        data() {
            return {
                currName: ''
            }
        },
        mounted() {
            this.getRequest('/web/query/selectCourseFlag').then(resp => {
                if (resp.data) {
                    this.currName = 'SelectCourseDetails';
                } else {
                    this.currName = 'DisabledPage';
                }
            });

        },
    }
</script>

<style scoped>

</style>