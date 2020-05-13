import React from 'react';
import Redirect from 'umi/redirect';

export default function Login({ children, location }: any) {
	const page = location.pathname;

	return (
		<div style={{ height: '100%' }}>
			{ 
			  // 判断当前url地址为什么
				page === '/login' ?
					children : <Redirect to={'/login'} />
			}
		</div>
	);
}