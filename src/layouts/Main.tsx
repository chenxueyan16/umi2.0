import React, { Component, Fragment } from 'react';
import { Layout, Menu, Modal, Breadcrumb } from 'antd';
import Redirect from 'umi/redirect';
import { Link } from 'umi';
import router from 'umi/router';
import styles from './index.css';

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;
const { confirm } = Modal;
const selectedKeysItem = sessionStorage.getItem('selectedKeys');
const openKeysItem = sessionStorage.getItem('openKeys');

class Main extends Component {
	rootSubmenuKeys = ['1', '2'];

	state = {
		selectedKeys: selectedKeysItem ? JSON.parse(selectedKeysItem) : ['0'],
		openKeys: openKeysItem ? JSON.parse(openKeysItem) : [],
		menuList: [{
			id: '1',
			name: 'Component',
			children: [{
				id: '1-1',
				name: 'Search',
				path: '/search'
			}, {
				id: '1-2',
				name: 'Tabel',
				path: '/table'
			}]
		}, {
			id: '2',
			name: 'Else',
		}]
	}

	selectChange = ({ item, key, keyPath, selectedKeys, domEvent }: any) => {
		if (selectedKeys[0] === "0") {
			sessionStorage.setItem('openKeys', '[]');
			this.setState({
				openKeys: []
			})

		}
		sessionStorage.setItem('selectedKeys', JSON.stringify(selectedKeys));
		this.setState({
			selectedKeys: selectedKeys
		})
	}
	openChange = (openKeys: string[]) => {
		const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
		if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
			this.setState({ openKeys });
		} else {
			sessionStorage.setItem('openKeys', JSON.stringify([latestOpenKey]));
			this.setState({
				openKeys: latestOpenKey ? [latestOpenKey] : [],
			});
		}
	}
	SignOut = () => {
		confirm({
			title: 'Do you Want to log out?',
			content: 'Need to log in again after exiting',
			onOk() {
				sessionStorage.removeItem('openKeys');
				sessionStorage.removeItem('selectedKeys');
				sessionStorage.removeItem('isLogin');
				router.push('/login');
			},
			onCancel() { },
		});
	}
	render() {
		var url = window.location.href;
		const pathname = window.location.pathname;
		const pathArr = pathname.split("\/");
		const { menuList, selectedKeys, openKeys } = this.state;
		return (
			<Fragment>
				{
					pathname === '/login' ? (
						<Redirect to={'/home'} />
					) : (
							<Layout style={{ height: '100%' }}>
								<Header style={{ background: '#275bf5', height: '55px' }}>
									<img className={styles.projectLogo} src={require('@/assets/rice.png')} height={20} />
									<span className={styles.projectTitle}>Umi Project Test</span>
									<span className={styles.loginOut} onClick={this.SignOut}>Sign out</span>
								</Header>
								<Layout>
									<Sider width={200} className={styles.projectSider}>
										<Menu style={{ width: 200, backgroundColor: 'transparent' }} theme="dark" selectedKeys={selectedKeys} openKeys={openKeys} mode="inline" onSelect={this.selectChange} onOpenChange={this.openChange}>
											<Menu.Item key="0"><Link to="/home">Home</Link></Menu.Item>
											{
												menuList && menuList.map((item: any) => {
													return (
														<SubMenu key={item.id} title={<span>{item.name}</span>}>
															{
																item.children && item.children.map((sitem: any) => {
																	return (
																		<Menu.Item key={sitem.id}><Link to={sitem.path}>{sitem.name}</Link></Menu.Item>
																	)
																})
															}
														</SubMenu>
													)
												})
											}
										</Menu>
									</Sider>
									<Content style={{ margin: '20px' }}>
										<Breadcrumb>
											<Breadcrumb.Item>Home</Breadcrumb.Item>
											{
												pathArr[1] !== 'home' && pathArr.map((item, index) => {
													return (
														<Breadcrumb.Item key={index}>{item.charAt(0).toUpperCase() + item.slice(1)}</Breadcrumb.Item>
													)
												})
											}
										</Breadcrumb>
										{this.props.children}
									</Content>
								</Layout>
							</Layout>
						)
				}
			</Fragment>
		);
	}
}

export default Main;  