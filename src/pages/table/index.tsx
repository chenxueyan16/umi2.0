import React from 'react';
import { Card, Modal } from 'antd';
import MyTable from '@/components/MyTable';

const { confirm } = Modal;

class Table extends React.Component {

	deleteHandle = (text:any) => {
		confirm({
			title: `Do you Want to delete ${text.name}?`,
			onOk() {
			},
			onCancel() {},
		});
	}
	
	render() {
		const column = [
			{
				title: 'Name',
				dataIndex: 'name',
				key: 'name',
			},
			{
				title: 'Age',
				dataIndex: 'age',
				key: 'age',
			},
			{
				title: 'Sex',
				dataIndex: 'sex',
				key: 'sex',
			},
			{
				title: 'Address',
				key: 'address',
				dataIndex: 'address',
			},
			{
				title: 'Action',
				key: 'action',
				render: (record: any, text: any) => (
					<span>
						<a style={{ marginRight: '20px'}}>View</a>
						<a style={{ color: '#F54B27' }} onClick={()=>this.deleteHandle(text)}>Delete</a>
					</span>
				),
			},
		]
		const data = [
			{
				key: '1',
				name: 'John Brown',
				age: 32,
				sex: 'Male',
				address: 'New York No. 1 Lake Park',
			},
			{
				key: '2',
				name: 'Jim Green',
				age: 42,
				sex: 'Female',
				address: 'London No. 1 Lake Park',
			},
			{
				key: '3',
				name: 'Joe Black',
				age: 32,
				sex: 'Male',
				address: 'Sidney No. 1 Lake Park',
			},
		];
		return (
			<Card style={{ marginTop: '15px', backgroundColor: '#fff' }}>
				<MyTable columns={column} data={data} />
			</Card>
		);
	}

}
export default Table;