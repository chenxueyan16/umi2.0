import { fetch } from 'dva';
import { message } from 'antd';
import { API_ROOT } from './config';

export default async function request(url, options) {
    let token = sessionStorage.getItem('isLogin');
    const headers = {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'SPR-ZHSQ-Token': token
        }
    }
    const response = await fetch(API_ROOT + url, { ...headers, ...options }).catch(err => console.log(err))
    const data = await response.json();
    switch (data.code) {
        case 401:
            sessionStorage.removeItem('isLogin')
            message.error(data.msg);
            setTimeout(() =>
                window.location.href = "/login",
                500);
            break;
        case 0: return { data };
        default: message.error(data.msg);
            break;
    }
}
