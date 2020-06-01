import React from 'react';
import { connect } from 'dva';
import { Card, Modal, Tag } from 'antd';
import MyTable from '@/components/MyTable';

const { confirm } = Modal;

class Table extends React.Component<any> {

    deleteHandle = (text: any) => {
        let that = this;
        confirm({
            title: `Do you Want to delete ${text.name}?`,
            onOk(){},
            onCancel() { },
        });
    }
    changePage = (page: any) => {
        const { limit } = this.props;
        this.props.dispatch({
            type: 'table/save',
            payload: {
                loading: true,
            },
        });

        this.props.dispatch({
            type: 'table/changePaginationProps',
            payload: {
                page,
                limit,
            },
        });
    }
    changePageSize = (limit: any) => {
        this.props.dispatch({
            type: 'table/save',
            payload: {
                loading: true,
            },
        });

        this.props.dispatch({
            type: 'table/changePaginationProps',
            payload: {
                page: 1,
                limit,
            },
        });
    }
    render() {
        let { list, loading, total, page, limit } = this.props;
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
                width:'30%'
            },
            {
                title: 'Action',
                key: 'action',
                render: (record: any, text: any) => (
                    <span>
                        <a style={{ color: '#F54B27' }} onClick={() => this.deleteHandle(text)}>Delete</a>
                    </span>
                ),
            },
        ]
        const pagination = {
            pageSize: limit,
            current: page,
            total: total,
            onChange: (page: any) => this.changePage(parseInt(page)),//页码改变回掉
        }
        return (
            <Card style={{ marginTop: '15px', backgroundColor: '#fff' }}>
                <MyTable columns={column} data={list} pagination={pagination} loading={loading} changePageSize={this.changePageSize} />
            </Card>
        );
    }

}

function mapStateToProps(state: any) {
    return {
        ...state.table
    };
}

export default connect(mapStateToProps)(Table);