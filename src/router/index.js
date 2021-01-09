import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login";
import Index from "../views/Index";
import store from "../store";
import BoardDetails from "../components/BoardDetails";
import {initMenu} from "@/utils/menu";

Vue.use(VueRouter);

const routes = [
    {
        //登录页面组件
        path: '/login',
        name: Login,
        component: Login
    },
    {
        //新的首页
        path: '/',
        name: Index,
        redirect: '/home',
        component: Index,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/',
        name: Index,
        redirect: '/home',
        component: Index,
        children: [
            {
                path: 'boardDetails',
                name: '公告详情',
                component: BoardDetails,
            },
        ],
        meta: {
            requireAuth: true
        }
    },
];

const router = new VueRouter({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    //守卫
    //添加loading效果
    store.state.user = sessionStorage.getItem("user");

    if (to.path === '/login') {
        //钩子函数
        next();
    } else {
        if (window.localStorage.getItem('user') || window.sessionStorage.getItem('user')) {
            initMenu(router, store);
            next();
        } else {
            location.replace('/login');
        }
    }
});

router.afterEach(router => {
    //添加一个loading加载完成的效果
});

export default router
