import React from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';

class MyTable extends React.Component<any> {
	static propTypes = {
		data: PropTypes.array.isRequired,
		columns: PropTypes.array.isRequired,
	}


	render() {
		const { columns, data } = this.props;

		return (
			<Table columns={columns} dataSource={data} />
		);
	}
}
export default MyTable;