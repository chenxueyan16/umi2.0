import service from '../utils/fetch';

export function test(data) {
    return service({
        url: '/version/info',
        method: 'post',
        data
    });
}

