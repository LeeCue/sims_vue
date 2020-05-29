import {getRequest} from "./api";

export const initMenu = (router, store) => {
    if (store.state.routes.length > 0) {
        return;
    }
    getRequest("/web/system/config/menu/").then(response => {
        if (response.data) {
            let routes = JSON.parse(JSON.stringify(response.data));
            let fmtRoutes = formatRoutes(routes.menus);
            router.addRoutes(fmtRoutes);
            store.commit('INIT_ROUTES', fmtRoutes);
        }
    })
};

export const formatRoutes = (routes) => {
    let fmRoutes = [];
    routes.forEach(router => {
        let {
            path,
            component,
            redirect,
            name,
            meta,
            iconCls,
            children
        } = router;
        if (children && children instanceof Array) {
            children = formatRoutes(children);
        }
        let fmRouter = {
            path: path,
            name: name,
            iconCls: iconCls,
            meta: meta,
            redirect: redirect,
            children: children,
            component(resolve) {
                if (component.startsWith('Index')) {
                    require(['../views/' + component + '.vue'], resolve);
                } else if (component.startsWith('Center')) {
                    require(['../views/common/' + component + '.vue'], resolve);
                } else if (component.startsWith('CourseManage')) {
                    require(['../views/admin/' + component + '.vue'], resolve);
                } else if (component.startsWith('PersonalInfoManage')) {
                    require(['../views/admin/' + component + '.vue'], resolve);
                } else if (component.startsWith('PublishBoard')) {
                    require(['../views/admin/' + component + '.vue'], resolve);
                } else if (component.startsWith('ScoreArchive')) {
                    require(['../views/admin/' + component + '.vue'], resolve);
                } else if (component.startsWith('ScoreInfo')) {
                    require(['../views/admin/' + component + '.vue'], resolve);
                } else if (component.startsWith('ScoreUpload')) {
                    require(['../views/admin/' + component + '.vue'], resolve);
                } else if (component.startsWith('StudentInfoManage')) {
                    require(['../views/admin/' + component + '.vue'], resolve);
                } else if (component.startsWith('TeacherInfoManage')) {
                    require(['../views/admin/' + component + '.vue'], resolve);
                } else if (component.startsWith('Home')) {
                    require(['../views/common/' + component + '.vue'], resolve);
                }
            }
        };
        fmRoutes.push(fmRouter);
    });
    return fmRoutes;
};