import axios from 'axios';
import { message } from 'antd';
import { API_ROOT } from './config';

const service = axios.create({
    timeout: 6000,
    baseURL: API_ROOT,
    headers: {
        'Content-Type': 'application/json'
    }
})

service.interceptors.request.use(
    config => {
        config.headers = config.headers || {}
        const loginInfo = JSON.parse(sessionStorage.getItem('GET_LOGININFO'))
        const token = loginInfo ? loginInfo.auth_token : '111'
        if (token) config.headers.Authorization = `Bearer ${token}`
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
service.interceptors.response.use(
    response => {
        let messageInfo = response.data.msg
        let statusCode = response.data.code
        if (statusCode) {
          if (statusCode === 401) {
            message.info(messageInfo || '请重新登陆！')
            if (!Object.is(window.location.pathname, '/')) {
              window.location.pathname = '/'
            }
          }else{
            message.error(messageInfo)
          }
        }
        return response
    },
    error => {
        let response = error.response || ''
        let status = response.status || ''
        switch (status) {
            case 401:
            case 403:
                message.info('权限不足，请重新登录！')
                if (!Object.is(window.location.pathname, '/')) {
                    window.location.pathname = '/'
                }
                break
            case 408:
                message.error('网络链接超时！')
                break
            case 404:
                message.info('未找到对应数据！')
                break
            case 500:
                message.error('服务器错误，请稍后再试！')
                break
            case 504:
                message.error('系统繁忙，请重新刷新页面！')
                break
            default:
                message.error('未知错误！')
        }
        return Promise.reject(error)
    }
)
export default service;