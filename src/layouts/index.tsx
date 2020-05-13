import React from 'react';
import Main from './Main';
import Login from './Login';

// sessionStorage.setItem('isLogin','1');
export default function Layout({ children, location, route, history, match }: any) {
	const isLogin = sessionStorage.getItem('isLogin');

	return (
		<div style={{ height: '100%' }}>
			{
				isLogin ?
					<Main children={children} /> :
					<Login children={children} location={location}/>
			}
		</div>
	);
}