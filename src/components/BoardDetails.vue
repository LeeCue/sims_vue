<template>
    <div class="board" v-html="content" style="padding-right: 10px"></div>
</template>

<script>
    export default {
        name: "BoardDetails",
        mounted() {
            this.boardId = this.$store.state.boardId;
            if (this.boardId !== -1) {
                this.getRequest('/web/getBoard?id=' + this.boardId).then(resp => {
                    this.content = resp.data.content;
                });
            }
        },
        destroyed() {
            this.$store.state.boardId = -1;
            this.content = '无';
        },
        data() {
            return {
                content: '',
                boardId: -1,
            }
        },
    }
</script>

<style scoped>
    .board >>> p {
        font-size: 20px;
        margin-top: 4px;
        color: #000000;
    }

    .board >>> h1,h2,h3,h4,h5 {
        font-size: 20px;
        margin-top: 6px;
        color: #000000;
    }
</style>