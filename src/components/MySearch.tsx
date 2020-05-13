import React from 'react';
import { Form, Input, Button, InputNumber, Select, DatePicker } from 'antd';
import PropTypes from 'prop-types';

const { Option } = Select;

class MySearch extends React.Component<any> {
	static propTypes = {
		options: PropTypes.array.isRequired,
		submit:PropTypes.string.isRequired,
		loading:PropTypes.bool.isRequired
	}

	handleSubmit = (e: any) => {
		e.preventDefault();
		this.props.form.validateFields((err: any, values: any) => {
			if (!err) {
				this.props.searchHandle(values)
			}
		});
	}
	render() {
		const { options, submit } = this.props;
		const { getFieldDecorator } = this.props.form;

		return (
			<Form layout="inline" onSubmit={this.handleSubmit}>
				{
					options.map((item: any, index: any) => {
						let el = null;
						switch (item.type) {
							case 'input': el = <Input style={{ width: '180px' }} placeholder={item.placeHolder} allowClear={true} />
								break;
							case 'number': el = <InputNumber style={{ width: '180px' }} min={item.min} formatter={item.formatter} parser={item.parser}/>
								break;
							case 'select': el = <Select style={{ width: '180px' }} placeholder={item.placeHolder} allowClear={true} >
								{
									item.list.map((sitem: any, sindex: any) => {
										return (
											<Option value={sitem.value} key={`list${sindex}`}>{sitem.name}</Option>
										)
									})
								}
							</Select>
								break;
							case 'date': el = <DatePicker style={{ width: '180px' }} placeholder={item.placeHolder} format={item.format} allowClear={true}/>
							 break;
							default: el = null
								break;
						}
						return (
							<Form.Item label={item.label} key={index}>
								{getFieldDecorator(item.keyName, {
									rules: [],
								})(
									el
								)}
							</Form.Item>
						)
					})
				}
				<Form.Item>
					<Button type="primary" htmlType="submit">{submit}</Button>
				</Form.Item>
			</Form>
		);
	}
}
const WrappedSearch = Form.create()(MySearch);
export default WrappedSearch