import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: JSON.parse(window.sessionStorage.getItem('user')),
        routes: [],
        updateStudent: [],
        currentBoardId: -1,
        boardId: -1,
    },
    mutations: {
        //写法与getters相类似
        //组件想要对于 vuex 中的数据进行的处理
        //组件中采用 this.$store.commit('方法名') 的方式调用，实现充分解耦
        //内部操作必须在此刻完成(同步)
        INIT_USER(state, user) {
            //防止浏览器刷新之后，将信息丢失
            sessionStorage.setItem('user', user);
            localStorage.setItem('user', user);
        },
        REMOVE_USER(state) {
            sessionStorage.removeItem('user');
            localStorage.removeItem('user');
            state.user = '';
        },
        INIT_ROUTES(state, data) {
            state.routes = data;
        },
        REMOVE_ROUTES(state) {
            state.routes = [];
        },
        INIT_UPDATE_STUDENT(state, data) {
            state.updateStudent = data;
        },
        REMOVE_STUDENT(state) {
            state.updateStudent = '';
        },
        ADD_CURRENT_BOARD_ID(state, data) {
            state.currentBoardId = data;
        },
        REMOVE_CURRENT_BOARD_ID(state) {
            state.currentBoardId = -1;
        },
    },
    actions: {},
    modules: {}
})
