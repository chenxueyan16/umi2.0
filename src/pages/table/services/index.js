import service from '@/utils/service';
import request from '@/utils/fetch';

// export function getList(obj = {}) {
// 	const { limit, page } = obj;
// 	return service('/version/info', {
// 		method: 'POST',
// 		data: JSON.stringify({ limit, page }),
// 	});
// }
export function getList(obj = {}) {
	const { limit, page } = obj;
	return request('/version/info', {
		method: 'POST',
		data: JSON.stringify({ limit, page }),
	});
}