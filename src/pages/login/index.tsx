import React, { Component } from 'react';
import { Form, Input, Button, Icon, message } from 'antd';
import styles from './index.css';
import router from 'umi/router';

class Login extends Component<any> {
	constructor(props: any) {
		super(props)
		this.state = {}
	}

	handleSubmit = (e: any) => {
		e.preventDefault();
		// 必须保证async所在函数直接包裹await
		this.props.form.validateFields(async (err: any, values: any) => {
			if (!err) {
				// const data = await api.test();
				// if (data.data.code === 0) {
					message.success('登录成功！');
					sessionStorage.setItem('isLogin', '1');
					setTimeout(() => {
						router.push('/home');
					}, 1000)
				// }
			}
		});
	};
	// 或者
	_test = async () => {
		const data = await api.test();
		console.log(data)
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
			labelCol: {
				xs: { span: 4 },
				sm: { span: 5 },
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 24 },
			},
		};
		const tailFormItemLayout = {
			wrapperCol: {
				// xs: {
				//   span: 24,
				//   offset: 0,
				// },
				sm: {
					span: 24,
					offset: 0,
				},
			},
		};

		return (
			<div className={styles.loginPage} >
				<div className={styles.loginBlock}>
					<Form  {...formItemLayout} onSubmit={this.handleSubmit}>
						<Form.Item >
							{getFieldDecorator('username', {
								rules: [{ required: true, message: 'Please input your username!' }],
							})(
								<Input
									size="large"
									prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
									placeholder="Username"
								/>,
							)}
						</Form.Item>
						<Form.Item >
							{getFieldDecorator('password', {
								rules: [{ required: true, message: 'Please input your Password!' }],
							})(
								<Input
									size="large"
									prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
									type="password"
									placeholder="Password"
								/>,
							)}
						</Form.Item>
						<Form.Item {...tailFormItemLayout} style={{ marginBottom: '0' }}>
							<Button type="primary" htmlType="submit" style={{ width: '100%', height: '40px' }}>
								Log in
              </Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		);
	}
}

const WrappedNormalLoginForm = Form.create()(Login);
export default WrappedNormalLoginForm;