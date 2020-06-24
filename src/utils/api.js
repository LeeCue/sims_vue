import axios from 'axios';
import {Message} from 'element-ui';
import router from "../router";
import store from "element-ui/packages/cascader-panel/src/store";

// axios.interceptors.request.use(config => {
//     if (window.localStorage.getItem('accessToken')) {
//         config.headers.access_token = localStorage.getItem('accessToken');  //将token设置成请求头
//     }
//     return config;
// }, error => {
//     return Promise.reject(error);
// });

axios.interceptors.response.use(success => {
    if (success.data.status === 200) {
        if (success.data.msg !== null) {
            Message.success({message: success.data.msg});
        }
    }
    return success;
}, error => {
    console.log('error is', error);
    console.log('error response is', error.response);
    console.log('error message is', error.message);
    console.log('error status is', error.status);
    if (error.response.status === 504 || error.response.status === 404) {
        Message.error({message: '服务器正在忙...'});
    } else if (error.response.status === 401) {
        Message.error(error.response.data.msg);
        window.sessionStorage.removeItem('user');
        window.localStorage.removeItem('user');
        router.replace('/login');
    } else if (error.response.status === 403) {
        Message.error({message: '权限不足，请联系管理员'});
    } else if (error.response.status === 406) {
        Message.error({message: error.response.data.msg});
    } else {
        if (error.response.data.msg) {
            Message.error({message: error.response.data.msg});
        } else {
            Message.error({message: '未知错误'});
        }
    }
    return error;
});

axios.defaults.baseURL = 'http://175.24.53.252:9000/';
axios.defaults.withCredentials = true;

export const postKeyValueRequest = (url, params) => {
    return axios({
        method: 'post',
        url: url,
        data: params,
        transformRequest: [function (data) {
            let ret = '';
            for (let i in data) {
                ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
            }
            return ret;
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
};

export const excelFilePostUpload = (url, fileObj) => {
    let params = new FormData();
    for (let i = 0; i < fileObj.length; i++) {
        params.append('files', fileObj[i]);
    }
    return axios({
        method: 'post',
        url: url,
        headers: {'Content-Type': 'multipart/form-data'},
        data: params
    });
};

export const postJsonRequest = (url, params) => {
    return axios({
        method: 'post',
        url: url,
        data: params,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const postFileRequest = (url, params) => {
    return axios({
        method: 'post',
        url: url,
        data: params,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
};
export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: url,
        data: params,
    })
};
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: url,
        data: params,
    })
};
export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: url,
        data: params,
    })
};
export const deleteRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: url,
        data: params,
    })
};