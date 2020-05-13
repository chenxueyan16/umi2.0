import React from 'react';
import { Card, message } from 'antd';
import MySearch from '@/components/MySearch';

class Search extends React.Component {
	state = {
		loading: false,
		info: {
			name:null,
			age:null,
			sex:null,
			birthday:null
		},
		isShow: false
	}

	searchHandle = (values: any) => {
		this.setState({
			info: { ...values },
			isShow: true,
			loading:false
		})
	}

	render() {
		const options = [{
			type: 'input',
			placeHolder: 'Name',
			label: 'Name',
			keyName: 'name',
		}, {
			type: 'number',
			label: 'Age',
			min: 0,
			keyName: 'age',
			formatter: (value: any) => `${value}years old`,
			parser: (value: any) => value.replace('years old', '')
		}, {
			type: 'select',
			placeHolder: 'Sex',
			label: 'Sex',
			keyName: 'sex',
			list: [{
				value: 'Male',
				name: 'Male',
			}, {
				value: 'Female',
				name: 'Female',
			}]
		}, {
			type: 'date',
			placeHolder: 'Birthday',
			label: 'Birthday',
			keyName: 'birthday',
			format: 'YYYY/MM/DD'
		}]
		let { isShow, info, loading } = this.state;

		return (
			<div >
				<Card style={{ marginTop: '15px', backgroundColor: '#fff' }}>
					<MySearch options={options} submit="Search" searchHandle={this.searchHandle} loading={loading}/>
				</Card>
				{
					isShow && (
						<Card title={info.name} style={{ width: 300, marginTop: '15px', }}>
							<p>{info.age}years old</p>
							<p>{info.sex}</p>
						</Card>
					)
				}
			</div >
		)
	}
}
export default Search;