import React, { Fragment } from 'react';
import { Table, Row, Select, Icon } from 'antd';
import PropTypes from 'prop-types';

const { Option } = Select;
class MyTable extends React.Component<any> {
	static propTypes = {
		data: PropTypes.array.isRequired,
		columns: PropTypes.array.isRequired,
		pagination: PropTypes.object.isRequired,
		loading: PropTypes.bool.isRequired
	}
	handleChange = (value: any) => {
		this.props.changePageSize && this.props.changePageSize(parseInt(value));
	}

	render() {
		const { columns, data, pagination, loading } = this.props;

		return (
			<Fragment>
				<Table columns={columns} loading={loading} dataSource={data} pagination={pagination ? pagination : {}} />
				<Row style={{ position: 'absolute', left: 24, bottom: 42 }} type="flex" align="middle">
					<span>每页</span>
					<div style={{ margin: '0 10px' }}>
						<Select
							suffixIcon={<Icon type="caret-down" style={{ color: '#275BF5' }} />}
							value={pagination ? pagination.pageSize : '5'}
							style={{ width: 61, height: 30 }}
							onChange={this.handleChange}
						>
							<Option value="5">5</Option>
							<Option value="10">10</Option>
						</Select>
					</div>
					<span>条，共计 {pagination.total} 条</span>
				</Row>
			</Fragment>
		);
	}
}
export default MyTable;