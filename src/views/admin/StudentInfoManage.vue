<template>
    <component v-bind:is="currentName" @changeName="changeName"></component>
</template>

<script>
    import updateInfo from '../../components/UpdateStudentInfo'
    import studentInfo from '../../components/StudentInfoComponent'

    export default {
        name: "StudentInfoManage",
        data() {
            return {
                currentName: 'studentInfo',
                updateStudentInfo: '',
            }
        },
        components: {
            updateInfo,
            studentInfo,
        },
        methods: {
            changeName(name) {
                this.currentName = name;
            }
        },
    }
</script>

<style scoped>

</style>